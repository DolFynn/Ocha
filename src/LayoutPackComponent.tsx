// tslint:disable:no-console
import * as React from 'react';
import * as d3 from 'd3';
import { HierarchyCircularNode } from 'd3';
import WordObject from './WordObject';

export interface States {
    wordObjectArray: Array<WordObject>;
}

export interface Props {
    wordObjectArray: Array<WordObject>;
}

class D3Renderer extends React.Component<Props, States> {
    width: number = window.innerWidth;
    height: number = window.innerHeight;
    bleed: number = 1;

    constructor(props: Props) {
        super(props);

        this.state = {wordObjectArray: props.wordObjectArray};
    }

    transform(array: WordObject[]) {
        
        return array.map(function(item: WordObject) {            
            return {
                value: item.getMistakes(),
                word: item.getWord(),
                tooltip: item.getTooltip(),
                translation: item.getTranslation(),
                mistakes: item.getMistakes(),
                occurence: item.getOccurence()
            };
        });
    }

    componentWillUpdate() {
        console.log('will');
        
        d3.select('#dots').selectAll('*').remove();
    }

    componentDidUpdate() {
        
        const domain = [1, 10];
        const range = [0, 10];
        const colorRange = ['green', 'white', 'red'];

        // const linearScale = d3.scaleLinear().domain(domain).range(range);
        const logScale = d3.scaleLog().domain(domain).range(range);

        const forInversion = d3.range(colorRange.length).map(function(d: number) {
            return range[0] + d * range[1] - range[0] / (colorRange.length - 1);
        });
        const logColorValues = forInversion.map(logScale.invert);
        
        const logColorScale = d3.scaleLog<string>().domain(logColorValues).range(colorRange);

        // var color = d3.scaleLinear<string>()
        //                 .domain([-1, 0, 1])
        //                 .range(['red', 'white', 'green']);

        console.log(logColorScale(0.5));
        // console.log(logColourScale(1), logColourScale(5), logColourScale(10), logColourValues);

        // EMDE
        let transform = this.transform(this.props.wordObjectArray);
        // let transform = this.props.wordObjectArray;
        
        let pack = d3.pack()
                    .size([this.width, this.height + this.bleed * 2])
                    .padding(2);

        let root = { 
                name: 'dict',
                value: 1,
                children: transform
            };

        let nodeHierarchy = d3.hierarchy(root);
        let nodes = pack(nodeHierarchy).leaves();

        // Define the div for the tooltip
        let div = d3.select('body').append('div')	
            .attr('class', 'tooltip')				
            .style('opacity', 0);

        let dots = d3.select('#dots').selectAll()
            .data(nodes)
            .enter()
            .append('g');

        dots.append('circle')
            .attr('class', function(d: HierarchyCircularNode<{}>) { 
                return d.children ? 'node' : 'leaf node'; 
            })
            .attr('r', function(d: HierarchyCircularNode<{}>) {
                return d.r;
            })
            .attr('cx', function(d: HierarchyCircularNode<{}>) {
                return d.x;
            })
            .attr('cy', function(d: HierarchyCircularNode<{}>) {
                return d.y;
            })
            .style('fill', (d: HierarchyCircularNode<{mistakes: number, occurence: number}>) => {
                return logColorScale(logScale.invert(d.data.mistakes));
            })
            .style('stroke', '#0f3a58;');

        dots.append('text')
            .attr('dx', function(d: HierarchyCircularNode<{}>) {
                return d.x;
            })
            .attr('text-anchor', 'middle')
            .text((d: HierarchyCircularNode<{word: string}>) => {                
                return d.data.word;
            })
            // ausmessen der Zirkel Größe und Anpassen der Schriftgröße
            .style('font-size', function(d: HierarchyCircularNode<{}>) {
                let context = this as SVGElement;
                const greaterValue = context.getBoundingClientRect().width > context.getBoundingClientRect().height ? 
                                        context.getBoundingClientRect().width : 
                                            (context.getBoundingClientRect().height * 1.4);
                return 16 * ((d.r * 2) / greaterValue) * 0.87;
            })
            .attr('dy', function(d: HierarchyCircularNode<{}>) {
                let context = this as SVGElement;
                
                return d.y + context.getBoundingClientRect().height * 0.3;
            })
            .on('mouseover', function(d: HierarchyCircularNode<{tooltip: string, translation: string}>) {		
                div.transition()		
                    .duration(200)		
                    .style('opacity', .9);		
                div.html(d.data.tooltip + '<br/>'  + d.data.translation)	
                    .style('left', d3.event.pageX + 'px')		
                    .style('top', d3.event.pageY - 28 + 'px');
                
                })					
            .on('mouseout', function(d: HierarchyCircularNode<{}>) {		
                div.transition()		
                    .duration(500)		
                    .style('opacity', 0);	
            });
        // let someAss = d3.select('text').node() as SVGElement;
        
    }

    render() {
        console.log('rendernern');
        
        return (
            <svg width={this.width} height={this.height}>
                <g transform={'translate(0,' + -this.bleed + ')'} id="dots" />
            </ svg>
        );
    }
}
export default D3Renderer;