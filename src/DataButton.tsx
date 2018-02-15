// tslint:disable:no-console
import * as React from 'react';

interface Props {
    handler: Function;
    hubert: string;
}

class DataButton extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        
        this.getData = this.getData.bind(this);
    }

    getData() {
        this.props.handler();
    }

    render() {
        return (
            <button 
                type="button"
                onClick={this.getData}
            >
                Get Data
            </button>
        );
    }
}
export default DataButton;