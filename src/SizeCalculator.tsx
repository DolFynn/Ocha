// tslint:disable:no-console

class SizeCalculator {
    elementCount: number;
    windowWidth: number = window.innerWidth;
    windowHeight: number = window.innerHeight;
    wordHeight: number = 1;
    wordWidth: number = 1;

    calculateWordSizes() {
        let roundedSqrt = (Math.floor(Math.sqrt(this.elementCount)));
        let rows = Math.ceil(this.elementCount / roundedSqrt);
        // let factor = ;

        this.wordWidth = (this.windowWidth / roundedSqrt) * 0.9;    

        this.wordHeight = (this.windowHeight / rows) * 0.9;

        console.log(Math.floor(Math.sqrt(this.elementCount)), this.windowHeight, this.wordHeight);
    }

    updateCount(count: number) {
        this.elementCount = count;
    }

    getWordWidth(): number {
        return this.wordWidth;
    }

    getWordHeight(): number {
        return this.wordHeight;
    }

}
export default SizeCalculator;