// tslint:disable:no-console
import * as React from 'react';
import WordObject from './WordObject';
import SizeCalculator from './SizeCalculator';

export interface Props {
    wordObjectArray: Array<WordObject>;
}

class SVGComponent extends React.Component<Props, {}> {
    sizeCalculator: SizeCalculator;

    constructor(props: Props) {
        super(props);

        this.sizeCalculator = new SizeCalculator();
    }

    render() {        
        this.sizeCalculator.updateCount(this.props.wordObjectArray.length);
        this.sizeCalculator.calculateWordSizes();

        return (
            <div>
                {this.props.wordObjectArray.map((words: WordObject, index: number) => {
                    return (
                        <svg 
                            key={index} 
                            width={this.sizeCalculator.getWordWidth()} 
                            height={this.sizeCalculator.getWordHeight()} 
                            viewBox={'0,0,' 
                                + this.sizeCalculator.getWordWidth() + ',' 
                                + this.sizeCalculator.getWordHeight()}
                        >
                            <text 
                                fill="#ffffff" 
                                fontFamily="Verdana" 
                                textAnchor="middle"
                                fontSize={this.sizeCalculator.getWordHeight() * 0.5} 
                                x="50%" 
                                y="50%"
                            >
                                {words.getWord()}
                            </text>
                            Make sure that your browser supports inline SVG!
                        </svg>
                    );
                })}
            </div>
        );
    }
}
export default SVGComponent;