import { Card } from "./models";
import { Map_Class, Scenario } from "/map.js";
import { Enem, player, GameStart, Relic } from "/models";

export const segmentA = [
    new Scenario("fight", new Enem("Guile", ["fire", "water"], 150, 10, 45, [
        ["strike", 200],
    ])),
    new Scenario("fight", new Enem("Vega", ["flying", "rock"], 150, 10, 45, [
        ["strike", 20], ["heal", 10]
    ])),
    new Scenario("fight", new Enem("Bison", ["dragon"], 150, 10, 45, [
        ["strike", 20],
    ])),
];

export const segmentB = [
    new Scenario("battle", new Enem("Cammy", ["fighting"], 150, 10, 45, [
        ["strike", 200],
    ])),
    new Scenario("battle", new Enem("Chun", ["water", "rock"], 150, 10, 45, [
        ["strike", 200], ["heal", 10]
    ])),
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
    new Card("normal", "potion", 20, 2, "item"),
    new Relic("gold", 56),
    new Relic("item", "Minor Healing per turn", "Pecha Berry", 200),
    new Relic("item", "First card plays twice", "Quick Claw", 100),
    new Card("normal", "potion", 20, 2, "item"),
    new Card("normal", "potion", 20, 2, "item"),

]