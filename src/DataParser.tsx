// tslint:disable:no-console
import * as React from 'react';
import WordObject from './WordObject';

export interface Props {}

export interface States {
    wordObjectArray: WordObject[];
}

class DataParser extends React.Component<{}, States> {
    constructor(props: Props) {
        super(props);

        this.state = {wordObjectArray: []};
    }

    public parseStringData(data: string) {
        let wordArray = data.split('\n');

        for (let element of wordArray) {
            if (element === '') {
                break;
            }
            const parts: string[] = element.split(' ');
            let doesExist: boolean = false;

            this.state.wordObjectArray.forEach((word, index) => {
                if (word.getWord() === parts[0]) {
                    doesExist = true;
                    word.increaseOccurence();
                }
            });

            if (!doesExist) {
                this.state.wordObjectArray.push(new WordObject(parts[0], parts[1], parts[2]));
            }
        }
        return this.state.wordObjectArray;
    }

    public parseArrayData(data: {occurence: number, 
                                word: string, 
                                tooltip: string, 
                                translation: string[], 
                                mistakes: number}[]) {
        console.log('thistate:', this.state.wordObjectArray);
        
        for (let element of data) {
            let doesExist: boolean = false;

            this.state.wordObjectArray.forEach((word, index) => {
                if (word.getWord() === element.word) {
                    doesExist = true;
                }
            });

            if (!doesExist) {
                this.state.wordObjectArray.push(new WordObject(
                    element.word, element.tooltip, element.translation, element.occurence, element.mistakes
                ));
            }
        }
        return this.state.wordObjectArray;
    }

    public getObjectArray(): WordObject[] {
        return this.state.wordObjectArray;
    }
}
export default DataParser;