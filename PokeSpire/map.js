// segments are arrays consistinng of multiple scenarios, maps are made of multiple segments
// types of segments: fight, legendary, store, poke center, chest reward, events system with rewards
// enemy generation fxn
//evennt selector

import { Enem, Card } from "./models";

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
    constructor(type, content, weather) {
        this.type = type
        this.content = content
        this.weather = weather
    }
}

export class EventObject {
    constructor(title, desc, options, rewards) {
        this.title = title
        this.desc = desc
        this.options = options
        this.rewards = rewards
    }
}

export const e = new EventObject("Ratatta Attack",
    "You encounter a Rattata that seems to be lost",
    [[0, "Run Away", "You run like a coward."], [1, "Guide them.", "You guide the little critter home."]],
    [["fight", new Enem("Ratatta", ["fighting"], 150, 10, 45, [["strike", 200],])], ["reward", new Card("", "potion", 20, 2, "item")]])

export const f = new EventObject("Ralts Encounter",
    "You encounter a Ralts that seems a bit confused",
    [[0, "Run Away", "It curses you..."], [1, "Help them.", "You guide the little critter home. It protects you."]],
    [["buff", [-10, "MaxHP"]], ["buff", [10, "MaxHP"]]])