export class Map{
    constructor(length, segments){
        this.length = length
        this.segments = segments
        currentStage = 0
        }
}

export class Scenario{
    constructor(type, enemy, weather){
        this.type = type
        this.enemy = enemy
        this.weather = weather
    }
}