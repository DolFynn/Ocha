class WordObject {
    private word: string;
    private tooltip: string;
    private translation: string[];
    private occurence: number = 0;
    private mistakes: number;

    constructor(val1: string, val2: string, val3: string | string[], occurence?: number, mistakes?: number) {
        this.word = val1;
        this.tooltip = val2;
        if (Array.isArray(val3)) {
            this.translation = val3;
        } else {
            this.translation = val3.split('/');
        }
        this.translation.forEach((element, index) => {
            if (element === '' || element === ' ' || element === undefined) {
                this.translation.splice(index, 1);
            }
        });
        
        if (occurence) {
            this.occurence = occurence;
        } else {
            this.occurence++;
        }
        
        if (mistakes) {
            this.mistakes = mistakes;
        } else {
            this.mistakes = 1;
        }
    }

    public increaseOccurence() {
        this.occurence++;
    }

    public getWord(): string {
        return this.word;
    }

    public getTooltip(): string {
        return this.tooltip;
    }

    public getTranslation(): string[] {
        return this.translation;
    }

    public getOccurence(): number {
        return this.occurence;
    }

    public getMistakes(): number {
        return this.mistakes;
    }
}
export default WordObject;