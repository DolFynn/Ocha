// tslint:disable:no-console
import * as React from 'react';
import InputControl from './InputControl';
import GetDataButton from './DataButton';
import DataParser from './DataParser';
import WordObject from './WordObject';
import LayoutPackComponent from './LayoutPackComponent';
import * as socketIo from 'socket.io-client';

interface States {
    wordObjectArray: Array<WordObject>;
}

interface Props {}

class ComponentConnector extends React.Component<{}, States> {
    dataParser: DataParser = new DataParser({});
    
    socket = socketIo('192.168.178.28:3000');
    
    constructor(props: Props) {
        super(props);

        this.state = {wordObjectArray: []};
        
        // Bind this handler to make it available in the child component
        this.handler = this.handler.bind(this);
        this.changeData = this.changeData.bind(this);
    }

    /**
     * Callback function for the child component to trigger rerender for everyone
     * @param array : Array<WordObject>
     */
    handler(array: WordObject[]) {
        console.log('test');
        
        this.setState({wordObjectArray: array});
        this.socket.emit('ocha', {wordObjectArray: array});
    }

    changeData(/* array: WordObject[] */) {
        
        this.socket.emit('ocha', 'getData');
        this.socket.on('dictexport', (data: {wordObjectArray: {occurence: number, 
            word: string, 
            tooltip: string, 
            translation: string[], 
            mistakes: number}[]}) => {
            console.log('jubfswfiuhjik:', data);
            
            this.setState({wordObjectArray: this.dataParser.parseArrayData(data.wordObjectArray)});
            this.forceUpdate();
        });
    }

    render() {
        return (
            <div className="ComponentConnector">
                < GetDataButton handler={this.changeData} hubert="something" />
                < InputControl dataParser={this.dataParser} handler={this.handler} />
                < LayoutPackComponent wordObjectArray={this.state.wordObjectArray} />
            </div>
        );
    }
}
export default ComponentConnector;