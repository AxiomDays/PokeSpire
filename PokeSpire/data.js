import { Card } from "./models";
import { Map_Class, Scenario, EventObject } from "/map.js";
import { Enem, player, GameStart, Relic, randomProperty } from "/models";

export const eventList = {
    ratattaEncounter: new EventObject("Ratatta Attack",
        "You encounter a wild ratatta on your route. On closer inspection it seems to be lost, missing its trainer.",
        [[0, "Fight the little bugger.", "The damn thing fights back."], [1, "Guide them.", "You guide the little critter home."]],
        [["fight", new Enem("Ratatta", ["fighting"], 150, 10, 45, [["strike", 200],])], ["reward", new Card("", "potion", 20, 2, "item")]]),

    raltsEncounter: new EventObject("Ralts Encounter",
        "You encounter a Ralts that seems a bit confused",
        [[0, "Run Away", "It curses you..."], [1, "Help them.", "You guide the little critter home. It protects you."]],
        [["buff", [-10, "MaxHP"]], ["buff", [10, "MaxHP"]]])
}

function segmentGenerator(width, dangerLevel) {
    let seg = [];
    let combatOptions = ["fight", "legendary"]
    let freeOptions = ["chest", "event", "pokecenter"]

    if (dangerLevel == 5) {
        for (let i = 0; i <= width; i++) {
            new Scenario("fight", new Enem("Makoto", ["fighting"], 150, 10, 45, [
                ["strike", 20],
            ]))
        }
    } else if (dangerLevel == 0) {

    }
}

function enemyGenerator(level) {
    let modifier = 1
    switch (level) {
        case "easy":
            modifier = 0.8;
            break
        case "medium":
            modifier = 1.2;
            break
        case "advanced":
            modifier = 1.5;
            break
        case "legendary":
            modifier = 2;
            break
    }
}

export const enemyEncounterList = {
    easy: [new Enem("Makoto", ["fighting"], 150, 10, 45, [
        ["strike", 20],
    ]), new Enem("Dhalsim", ["fighting"], 150, 10, 45, [
        ["strike", 20],
    ]), new Enem("Elena", ["fighting"], 150, 10, 45, [
        ["strike", 20],
    ])],
    medium: "",
    advanced: "",
    legendary: "",
}

export const storeInventory = {
    card: [
        new Card("", "potion", 20, 2, "item"),
        new Card("", "pokeball", 20, 2, "item"),
        new Card("", "potion", 20, 2, "item"),
    ],
    relics: [
        new Relic("item", "Minor Healing per turn", "Leftovers", 200),
        new Relic("item", "First card plays twice", "Quick Claw", 100),
        new Relic("item", "Survive with 1 HP", "Focus Band", 200),
    ]
}


export const segmentA = [
    new Scenario("chest", new Relic("item", "Minor Healing per turn", "Leftovers", 200)),
    new Scenario("pokecenter", ""),
    new Scenario("event", randomProperty(eventList)),
];

export const segmentB = [
    new Scenario("fight", new Enem("Cammy", ["fighting"], 150, 10, 45, [
        ["strike", 200],
    ])),
    new Scenario("event", eventList["ratattaEncounter"]),
    new Scenario("fight", new Enem("Juri Han", ["dark"], 150, 10, 45, [
        ["strike", 20],
    ])),
];

export const segmentC = [
    new Scenario("fight", new Enem("Makoto", ["fighting"], 150, 10, 45, [
        ["strike", 200],
    ])),
    new Scenario("fight", new Enem("Alex", ["dark", "rock"], 150, 10, 45, [
        ["strike", 20], ["heal", 10]
    ])),
    new Scenario("fight", new Enem("Jamie", ["fairy", "fighting"], 150, 10, 45, [
        ["strike", 20],
    ])),
];

export const rewards = [
    new Card("", "potion", 20, 2, "item"),
    new Relic("gold", 56),
    new Relic("item", "Minor Healing per turn", "Leftovers", 200),
    new Relic("item", "First card plays twice", "Quick Claw", 100),
    new Relic("item", "Survive with 1 HP", "Focus Band", 200),
    new Relic("item", "May cause flinch on hit", "King's Rock", 100),
    new Relic("item", "Confused but boosted attack", "Berserk Gene", 200),
    new Relic("item", "First card plays twice", "Quick Claw", 100),
    new Card("", "potion", 20, 2, "item"),
    new Card("", "potion", 20, 2, "item"),
]


