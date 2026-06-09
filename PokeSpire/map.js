// segments are arrays consistinng of multiple scenarios, maps are made of multiple segments
export class Map_Class {
    constructor(segments) {
        this.len = segments.length
        this.segments = segments
        this.currentStage = 0
    }

    advance() {
        if (this.currentStage < this.len) {
            this.currentStage += 1;
            console.log("currentStage ++")
        }
        console.log("advance map triggered, segment length is", this.len, "stage level is ", this.currentStage)
        return this.currentStage
    }
}

export class Scenario {
    constructor(type, enemy, weather) {
        this.type = type
        this.enemy = enemy
        this.weather = weather
    }
}