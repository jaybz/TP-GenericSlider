class Slider {
    constructor(shortId, sliderId, min, max) {
        this.shortId = shortId;
        this.sliderId = sliderId;
        // min and max === undefined if no range
        this.min = min;
        this.max = max;
    }

    valueToSlider(value, min, max) {
        if (min === undefined)
            min = this.min;
        if (max === undefined)
            max = this.max;
        
        let range = max - min;
        value -= min;
        if (value >= range)
            return 100;
        if (value <= 0)
            return 0;
        
        let ratio = 100.0 / range;
        value *= ratio;
        return value.toFixed(0);
    }

    valueFromSlider(value, min, max) {
        if (min === undefined)
            min = this.min;
        if (max === undefined)
            max = this.max;

        this.min = min;
        this.max = max;

        switch(value) {
            case 0:
                return min;
            case 100:
                return max;
            default:
                let range = max - min;
                let ratio = range / 100.0;
                value *= ratio;
                value += min;
                return value.toFixed(0);
        }
    }
}

module.exports = Slider;