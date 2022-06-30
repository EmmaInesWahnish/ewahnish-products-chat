class RandomColor {
    constructor(red, blue, green) {
        this.red= red;
        this.blue= blue;
        this.green = green;
    }

    getRandomColor(red, blue, green) {
        this.red = red;
        this.blue = blue;
        this.green = green;
        return this;
    }
}

module.exports = RandomColor;
