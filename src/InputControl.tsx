import * as React from 'react';
import DataParser from './DataParser';

export interface States {
    data: string;
}

export interface Props {
    dataParser: DataParser;
    handler: Function;
}

class InputControl extends React.Component<Props, States> {
    dataParser: DataParser;

    constructor(props: Props) {
        super(props);
        this.state = {data: ''};

        this.handleChange = this.handleChange.bind(this);

        this.dataParser = props.dataParser;
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({data: event.currentTarget.value});
        this.readInput(event);
    }

    readInput(event: React.FormEvent<HTMLInputElement>) {
        const input = event.currentTarget.files;
        
        const reader = new FileReader();
        const fileList = new Blob([]);

        reader.onload = () => {
            const text = reader.result;
            this.setState({data: text});
            const objectArray = this.dataParser.parseStringData(this.state.data);
            this.props.handler(objectArray);
        };
        reader.readAsText((input === null) ? fileList : input[0]);
    }

    getDataParser(): DataParser {
        return this.dataParser;
    }

    render() {
        return (
            <form>
                <input type="file" onChange={this.handleChange} className="inputElement"/>
            </form>
        );
    }
}
export default InputControl;