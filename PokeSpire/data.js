import { Card, getRandomNumber } from "./models";
import { Map_Class, Scenario, EventObject } from "/map.js";
import { Enem, EnemySkill, player, GameStart, Relic, randomProperty, takeRandomFromArray, cardGenerator } from "/models";


export const rewards = [

    cardGenerator("superpotion"),
    cardGenerator("fullrestore"),
    cardGenerator("elixir"),
    cardGenerator("expcandy"),
    cardGenerator("energyroot"),
    cardGenerator("pokeball"),
    cardGenerator("ultraball"),
    relicGenerator("Sitrus Berry"),
    relicGenerator("Cheri Berry"),
    relicGenerator("Custap Berry"),
]

export const cursedRewards = [
    relicGenerator("Leftovers"),
    relicGenerator("Quick Claw"),
    relicGenerator("Focus Band"),
    relicGenerator("Berserk Gene"),
    relicGenerator("Sitrus Berry"),
    relicGenerator("Cheri Berry"),
    relicGenerator("Custap Berry"),
    relicGenerator("Eviolite"),
    relicGenerator("Rocky Helmet"),
    relicGenerator("Shell Bell")
]

export const cardRewards = [
    cardGenerator("normal"),
    cardGenerator("normal2"),
    cardGenerator("normal3"),
    cardGenerator("normal4"),
    cardGenerator("normal5"),
    cardGenerator("normal6"),
    cardGenerator("normal7"),
    cardGenerator("normal8"),
    cardGenerator("fire"),
    cardGenerator("water"),
    cardGenerator("electric"),
    cardGenerator("grass"),
    cardGenerator("ice"),
    cardGenerator("fighting"),
    cardGenerator("poison"),
    cardGenerator("ground"),
    cardGenerator("flying"),
    cardGenerator("psychic"),
    cardGenerator("bug"),
    cardGenerator("rock"),
    cardGenerator("ghost"),
    cardGenerator("dragon"),
    cardGenerator("dark"),
    cardGenerator("steel"),
    cardGenerator("fairy"),
    cardGenerator("fire2"),
    cardGenerator("water2"),
    cardGenerator("electric2"),
    cardGenerator("grass2"),
    cardGenerator("grass3"),
    cardGenerator("grass4"),
    cardGenerator("ice2"),
    cardGenerator("fighting2"),
    cardGenerator("poison2"),
    cardGenerator("ground2"),
    cardGenerator("flying2"),
    cardGenerator("psychic2"),
    cardGenerator("bug2"),
    cardGenerator("rock2"),
    cardGenerator("ghost2"),
    cardGenerator("dragon2"),
    cardGenerator("dark2"),
    cardGenerator("steel2"),
    cardGenerator("fairy2")
]

export const cursedCardRewards = [
    cardGenerator("normal"),
    cardGenerator("normal2"),
    cardGenerator("normal3"),
    cardGenerator("fire3"),
    cardGenerator("water3"),
    cardGenerator("electric3"),
    cardGenerator("grass3"),
    cardGenerator("ice3"),
    cardGenerator("fighting3"),
    cardGenerator("poison3"),
    cardGenerator("ground3"),
    cardGenerator("flying3"),
    cardGenerator("psychic3"),
    cardGenerator("bug3"),
    cardGenerator("rock3"),
    cardGenerator("ghost3"),
    cardGenerator("dragon3"),
    cardGenerator("dark3"),
    cardGenerator("steel3"),
    cardGenerator("fairy3")
]

const legendarySkills = {
    "Mewtwo": [new EnemySkill("Psystrike", ["strike"], 100, 1), "Single strike attack."],
    "Kyogre": [new EnemySkill("Origin Pulse", ["strike"], 80, 1), "Single strike attack."],
    "Rayquaza": [new EnemySkill("Dragon Ascent", ["strike"], 100, 1, [["weakness", 2]], ["self"]), "Single strike attack. Applies 2 Vulnerable to self."],
    "Regirock": [new EnemySkill("Stone Axe", ["strike"], 70, 1), "Single strike attack."],
    "Giratina": [new EnemySkill("Shadow Force", ["strike"], 80, 1, [["barrier", 2]], ["self"]), "Single strike attack."],
}

const enemySkillList = {
    "strike": [new EnemySkill("Basic Strike", ["strike"], 30, 1), "Single strike attack."],
    "strike2": [new EnemySkill("Double Strike", ["strike"], 15, 2), "Strikes twice"],
    "strike3": [new EnemySkill("Quick Attack", ["strike"], 15, 2), "A quick strike."],
    "strike4": [new EnemySkill("Mach Punch", ["strike"], 20, 2), "A strong attack."],
    "strike5": [new EnemySkill("Body Slam", ["strike"], 40, 1), "A strong attack."],
    "strikedie": [new EnemySkill("Hyper Fang", ["strike"], 50, 1), "Die."],

    "buff": [new EnemySkill("Helping Hand", ["buffstr"], 8, 1,), "Increases STRENGTH"],
    "buff2": [new EnemySkill("Defense Curl", ["shield", "buffstr"], 15, 1,), "Increases STRENGTH and Gain Shield"],

    "status_buff": [new EnemySkill("Calm Mind", ["heal"], 10, 1, [["fortress", 3]], ["self"]), "Generate 3 Fortress."],

    "skysp": [new EnemySkill("Aerial Ace", ["strike"], 60, 1), "A strong attack."],
    "seasp": [new EnemySkill("Hydro Pump", ["strike"], 60, 1), "A strong attack."],
    "standardsp": [new EnemySkill("Hyper Beam", ["strike"], 70, 1), "A strong attack."],
    "mountainsp": [new EnemySkill("Earthquake", ["strike"], 60, 1), "A strong attack."],
    "ennuisp": [new EnemySkill("Shadow Ball", ["strike"], 60, 1), "A strong attack."],

    "strikeheal": [new EnemySkill("Absorb", ["strike", "heal"], 20, 1), "Drain HP from target."],
    "strikeheal2": [new EnemySkill("Leech Seed", ["strike", "heal"], 20, 3), "Drain HP from target."],
    "heal": [new EnemySkill("Recover", ["heal"], 40, 1), "Recover HP to target."],
    "guard": [new EnemySkill("Barrier", ["shield"], 20, 1), "Generate Shield to Self."],
    "guard2": [new EnemySkill("Harden", ["shield"], 40, 1), "Generate Shield to Self."],
    "guard3": [new EnemySkill("Protect", ["heal"], 1, 1, [["barrier", 1]], ["self"]), "Generate 1 Barrier."],


    "status_para": [new EnemySkill("Lightning Sting", ["strike"], 10, 1, [["paralyze", 3]], ["target"]), "Deals damage and applies 2 Paralyze"],
    "status_vul": [new EnemySkill("Acid Spray", ["strike"], 25, 1, [["vulnerable", 3]], ["target"]), "Deals damage and applies 2 Vulnerable"],
    "status_weak": [new EnemySkill("Iron Tail", ["strike"], 25, 1, [["weakness", 3]], ["target"]), "Deals damage and applies 2 Paralyze"],
    "status_pois": [new EnemySkill("Poison Sting", ["strike"], 25, 1, [["poison", 6]], ["target"]), "Deals damage and applies 6 Poison"],
    "status_burn": [new EnemySkill("Will O Wisp", ["strike"], 25, 1, [["burn", 3]], ["target"]), "Deals damage and applies 2 Burn"],
}

export const eventList = {
    ratattaEncounter: new EventObject("Ratatta Attack",
        "You encounter a wild ratatta on your route. On closer inspection it seems to be lost, missing its trainer.",
        [[0, "Fight the little bugger.", "The damn thing fights back.", ""], [1, "Guide them.", "You guide the little critter home.", "Gained Super Potion!"]],
        [[["fight", new Enem("Rattata", ["normal"], 150, 10, 45, [enemySkillList["strike"]])]], [["reward", cardGenerator("superpotion")]]]),

    raltsEncounter: new EventObject("Ralts Encounter",
        "You encounter a Ralts that seems a bit confused",
        [[0, "Run Away", "It curses you...", "Lost 10 Max HP..."], [1, "Help them.", "You guide the little critter home. It protects you.", "Gained 10 Max HP...!"]],
        [[["buff", [-10, "MaxHP"]]], [["buff", [10, "MaxHP"]]]]),

    mysteriousStone: new EventObject("Mysterious Stone", `You discover a damp, muggy cave hidden away in a forest. 
        Laying in the center is an altar, teeming with elemental energies, housing an unstable evolution stone.`,
        [[0, "Expose your Pokemon carelessly", "Your Pokemon is bathed in energy from an unknowable source, accelerating its growth considerably.", "Your Pokemon Evolved! Growing Pains added to deck!"],
        [1, "Channel Energies", "Alongside your Pokemon, you both focus the energy allowing it to flow through you without causing damage.", "You gained some Evo energy."],
        [2, "Poach", "You snatch the stone off the pedestal. This could go for a lot if you know how to turn it.", "You gained 250 Gold!"]],
        [[["evolve", ""], ["reward", cardGenerator("growing_pains")]], [["buff", [35, "evo"]]], [["reward", new Relic("gold", 250),]]]
    ),

    daycare: new EventObject("Daycare Abandonment", `You find an unattended egg sitting alone outside an abandoned creche, 
        you can't tell what exactly occurred here, but it seems to have happened in a hurry. Could this egg have been the cause?`,
        [[0, "Adopt it", "You take the egg along with you, knowing the dangers that may befall it if left alone.", "Mysterious Egg added to deck!"],
        [1, "Warm it", "You spend time and use your own body warmth to hatch it. After some time, it begins to shake.", "Protect added to deck! You lost 30 HP!"]],
        [
            [["reward", cardGenerator("mysterious_egg")], ["curse", ["egg", 3]]], [["reward", cardGenerator("normal3")], ["buff", [-30, "HP"]]]
        ]),

    shadowTechniques: new EventObject("Dark Shadow Trainer", `You discover a shady figure slunk in the corner of a room. 
        Draped in a raggedy coat, he opens his mouth and utters words imperceptible, and yet meaning forced itself into your brain.
        "Do you wish to learn...?"`,
        [
            [0, "Teach Pokemon", "You accept his offer and he teaches your pokemon techniques steeped in shadow.", "Your Pokemon becomes the dreaded Shadow type..."],
            [1, "Accept Darkness", "You accept his power into yourself, drowning in a despair deeper than shadow.", "Three cards must become Shadow type."],
            [2, "Leave", `This seems like more trouble than it's worth. You make to take your escape, but his pokemon lashes at you with dark energy!`, `Fight or be forgotten!`
            ]],
        [
            [["trans_poke", "shadow"]], [["trans_shd_card", 3]],
            [["reward", cardGenerator("normal3")], ["fight", new Enem("Rattata", ["normal"], 150, 10, 45, [enemySkillList["strike"]])]]
        ]
    ),

    experiment: new EventObject("Nurse Joy's Experimental Trial", `The PokeCenter company offers you a healthy sum to allow your pokemon undergo an experimental procedure.`,
        [[0, "Agree", "You let them put your Pokemon in the Trial Chamber. It flashes with light for a few seconds then explodes. Your partner seems unharmed... yet different.", "50 Max HP Gained...! 1 Max PokePoint Gained...!"],
        [1, "Leave", "You deny the offer, refusing to risk your partner's safety.", "20 Evo Points Gained"]],
        [
            [["buff", [50, "MaxHP"]], ["buff", [10000, "HP"]], ["buff", [1, "maxmana"]]], [["buff", [20, "evo"]]]
        ]
    ),

    technicalMachine: new EventObject("Damaged TM Machine", `You find a damaged TM drive loader in a garage sale. It seems like it could go for one more use, but you're not sure if it still works right...`,
        [[0, "Drive Piracy", "You use one of your legally acquired TM copies to load a powerful technique onto your partner.", "You gain a powerful card, but the PokePolice are on to you!"],
        [1, "Create Alias", "You copy one of your pokemon's moves onto a new TM drive.", "You duplicate two of your cards."],
        [2, "Trade In", "It's really not worth the effort. You trade it in for some items.", "You gain 250 Gold and 1 Energy Root"]],
        [
            [["reward", takeRandomFromArray(cursedCardRewards)], ["curse", ["tracked", 3]]],
            [["duplicate", ""]],
            [["reward", new Relic("gold", 250)], ["reward", cardGenerator("energyroot")]]
        ]
    ),

    teamRocketAmbush: new EventObject("Team Gasket Ambush", `You're ambushed by a gang of uniformed ne'er-do-wells! They hold you at pokemon-point for your partner!`,
        [[0, "Hand Over", "You hand over a member of your party, knowing that it's the safest option, but still feeling a pang of regret.", `Delete a card to progress. You've become distressed...!`],
        [1, "Fight Back", "You resist violently, they'll have to pry your Pokemon out of your cold dead hands.", `Fight or be forgotten!`],
        [2, "Join them. [400 Gold Req.]", "Money always solves everything, right? After a membership fee to smooth things over, they could be of assistance. ", `A powerful ally awaits you...`]],
        [
            [["remove", ""], ["curse", ["distress", 2]]],
            [["reward", cardGenerator("normal5")], ["fight", new Enem("Rattata", ["normal"], 150, 10, 45, [enemySkillList["strike"]])]],
            [["pricecheck", 400], ["curse", ["gasket", 3]]
            ]
        ]
    )

}

export const fixedEventList = {
    beginning: new EventObject("First Steps", "Meeting your Professor before departing on your journey, they ask you a question. `What does it mean to be a trainer?`",
        [[0, "To catch them all.", "Claim your reward.", "Obtained Master Ball"], [1, "To know your partner.", "Claim your reward.", "Obtained Elixir"], [2, "To become the strongest.", "Claim your reward.", "Obtained Secret Power"]],
        [[["reward", cardGenerator("masterball")]], [["reward", cardGenerator("elixir")]], [["reward", cardGenerator("normal8")]]]
    )
}

export function mapGenerator(length, line = "standard") {
    let map = []
    map.push([new Scenario("event", fixedEventList["beginning"])])
    for (let i = 0; i <= length; i++) {
        if (i % 3 == 0 && i != 0) {
            map.push(segmentGenerator(getRandomNumber(2, 4), 0, line, i, length))
            console.log("forced pokecenter push")
        } else {
            map.push(segmentGenerator(getRandomNumber(2, 4), 3, line, i, length))
        }
    }
    map.push([new Scenario("legendary", enemyEncounterLegendary[line])])
    return map
}

function segmentGenerator(width, dangerLevel, line, pos, len) {
    let seg = [];
    let combatOptions = ["fight", "legendary"]
    let freeOptions = ["chest", "event", "pokecenter", "store"]
    let options = [combatOptions, freeOptions]

    if (dangerLevel == 0) {
        for (let i = 0; i <= width; i++) {
            if (i == 0) {
                seg.push(scenarioGenerator("pokecenter", line, pos, len))
            }
            seg.push(scenarioGenerator(takeRandomFromArray(freeOptions), line, pos, len))
        }
    } else {
        let chance = 50 + ((dangerLevel / 5) * 50)
        for (let i = 0; i <= width; i++) {
            if (getRandomNumber(1, 100) < chance) {
                seg.push(scenarioGenerator(takeRandomFromArray(combatOptions), line, pos, len))
            } else {
                seg.push(scenarioGenerator(takeRandomFromArray(freeOptions), line, pos, len))
            }

        }
    }

    return seg
}

function scenarioGenerator(type, line, pos, len) {
    switch (type) {
        case "fight":
            return fightGenerator(type, line, pos, len)
            break;
        case "legendary":
            return fightGenerator(type, line, pos, len)
            break;
        case "chest":
            return new Scenario("chest", takeRandomFromArray(rewards))
            break;
        case "pokecenter":
            return new Scenario("pokecenter", "")
            break;
        case "event":
            return new Scenario("event", randomProperty(eventList))
            break;
        case "store":
            return new Scenario("store", "")
            break;

    }
}

function fightGenerator(type, line, pos, len) {
    let diffRatio = (pos / len)
    let diffTxt = "easy"
    if (diffRatio < 0.3) {
        diffTxt = "easy"
    } else if (diffRatio < 0.7) {
        diffTxt = "med"
    } else {
        diffTxt = "hard"
    }

    console.log(type, line, pos, len, diffRatio, diffTxt)

    if (type == "fight") {
        return new Scenario("fight", enemyGenerator(line, diffTxt), takeRandomFromArray(weatherTypes))
    } else {
        return new Scenario("fight", enemyGenerator(line, diffTxt), takeRandomFromArray(weatherTypes))
    }
}

function enemyGenerator(line, level) {
    let enemyId = 0
    switch (level) {
        case "easy":
            enemyId = getRandomNumber(0, 2)
            break;
        case "med":
            enemyId = getRandomNumber(2, 4)
            break;
        case "hard":
            enemyId = getRandomNumber(4, 5)
            break;
        default:
            enemyId = getRandomNumber(0, 2)
            break;
    }
    console.log(line, level, enemyId)
    if (getRandomNumber(1, 10) > 8) {
        return enemyEncounterListByLine["standard"][enemyId]
    } else {
        return enemyEncounterListByLine[line][enemyId]
    }
}

export const enemyEncounterListByLine = {
    "standard": [
        new Enem("Rattata", ["normal"], 150, 10, 45, [
            enemySkillList["strike"],
            enemySkillList["guard"],
        ], enemySkillList["strike2"], cardGenerator("potion")),

        new Enem("Furret", ["normal"], 250, 10, 45, [
            enemySkillList["strike"],
            enemySkillList["guard"],
        ], enemySkillList["strike3"], cardGenerator("superpotion")),
        new Enem("Bidoof", ["normal"], 400, 10, 45, [
            enemySkillList["strike"],
            enemySkillList["guard"],
            enemySkillList["status_buff"]
        ], enemySkillList["strike4"], cardGenerator("fullrestore")),
        new Enem("Eevee", ["normal"], 550, 10, 45, [
            enemySkillList["strike"],
            enemySkillList["buff"],
            enemySkillList["guard"],
        ], enemySkillList["strike3"], cardGenerator("normal8")),
        new Enem("Snorlax", ["normal"], 800, 10, 45, [
            enemySkillList["strike"],
            enemySkillList["buff2"],
            enemySkillList["guard2"],
            enemySkillList["guard"],
        ], enemySkillList["strike5"], cardGenerator("normal3"))
    ],
    "sea": [
        new Enem("Starmie", ["water", "psychic"], 150, 10, 45, [
            enemySkillList["strike"],
            enemySkillList["strike3"],
            enemySkillList["buff"],
            enemySkillList["guard"],
            enemySkillList["seasp"],
        ], enemySkillList["status_pois"], cardGenerator("potion")),

        new Enem("Sharpedo", ["water", "dark"], 350, 10, 45, [
            enemySkillList["strike3"],
            enemySkillList["strike4"],
            enemySkillList["buff"],
            enemySkillList["guard"],
        ], enemySkillList["seasp"], cardGenerator("water")),
        new Enem("Kingdra", ["water", "dragon"], 300, 10, 45, [
            enemySkillList["strike3"],
            enemySkillList["strike4"],
            enemySkillList["buff"],
            enemySkillList["guard"],
            enemySkillList["seasp"],
        ], enemySkillList["status_vul"], cardGenerator("water2")),
        new Enem("Lanturn", ["water", "electric"], 550, 10, 45, [
            enemySkillList["strike"],
            enemySkillList["strike2"],
            enemySkillList["buff"],
            enemySkillList["guard"],
            enemySkillList["seasp"],
        ], enemySkillList["status_para"], cardGenerator("electric")),
        new Enem("Tentacool", ["water", "poison"], 650, 10, 45, [
            enemySkillList["strike3"],
            enemySkillList["guard"],
            enemySkillList["status_para"],
            enemySkillList["status_pois"]
        ], enemySkillList["seasp"], cardGenerator("water3"))
    ],
    "sky": [
        new Enem("Wingull", ["flying", "water"], 250, 10, 45, [
            enemySkillList["strike3"],
            enemySkillList["strike4"],
            enemySkillList["buff"],
            enemySkillList["guard"],
            enemySkillList["seasp"]
        ], enemySkillList["skysp"], cardGenerator("potion")),
        new Enem("Skarmory", ["steel", "flying"], 250, 10, 45, [
            enemySkillList["buff2"],
            enemySkillList["guard"],
            enemySkillList["skysp"],
            enemySkillList["heal"]
        ], enemySkillList["strike4"], cardGenerator("steel2")),
        new Enem("Xatu", ["flying", "psychic"], 450, 10, 45, [
            enemySkillList["strike3"],
            enemySkillList["strike4"],
            enemySkillList["buff"],
            enemySkillList["guard"],
            enemySkillList["skysp"],
        ], enemySkillList["status_weak"], cardGenerator("psychic2")),
        new Enem("Staraptor", ["flying", "normal"], 400, 10, 45, [
            enemySkillList["strike"],
            enemySkillList["strike2"],
            enemySkillList["buff"],
            enemySkillList["guard"],
        ], enemySkillList["skysp"], cardGenerator("normal5")),

        new Enem("Tornadus", ["flying"], 750, 10, 45, [
            enemySkillList["strike3"],
            enemySkillList["strike4"],
            enemySkillList["buff"],
            enemySkillList["guard"],

        ], enemySkillList["skysp"], cardGenerator("flying2")),
    ],
    "mountain": [
        new Enem("Crustle", ["bug", "rock"], 250, 10, 45, [
            enemySkillList["strike"],
            enemySkillList["buff"],
            enemySkillList["guard"],
            enemySkillList["mountainsp"],
        ], enemySkillList["strike2"], cardGenerator("iron")),
        new Enem("Gigalith", ["rock"], 350, 10, 45, [
            enemySkillList["strike4"],
            enemySkillList["guard2"],
            enemySkillList["mountainsp"],
        ], enemySkillList["strike5"], cardGenerator("rock")),
        new Enem("Rhyperior", ["ground", "rock"], 500, 10, 45, [
            enemySkillList["strike2"],
            enemySkillList["guard2"],
            enemySkillList["mountainsp"],
        ], enemySkillList["strike5"], cardGenerator("rock2")),
        new Enem("Aggron", ["steel", "rock"], 550, 10, 45, [
            enemySkillList["strike3"],
            enemySkillList["strike2"],
            enemySkillList["buff"],
            enemySkillList["guard3"],
            enemySkillList["mountainsp"],
        ], enemySkillList["buff2"], cardGenerator("steel3")),
        new Enem("Garchomp", ["dragon", "ground"], 750, 10, 45, [
            enemySkillList["strike3"],
            enemySkillList["strike4"],
            enemySkillList["buff2"],
            enemySkillList["guard2"],
            enemySkillList["mountainsp"],
        ], enemySkillList["status_weak"], cardGenerator("dragon2"))
    ],
    "ennui": [
        new Enem("Drifloon", ["ghost", "flying"], 100, 10, 45, [
            enemySkillList["strike3"],
            enemySkillList["strike2"],
            enemySkillList["buff"],
            enemySkillList["guard"],
            enemySkillList["ennuisp"],
            enemySkillList["status_pois"]
        ], enemySkillList["buff2"], cardGenerator("potion")),
        new Enem("Yamask", ["ground", "ghost"], 200, 10, 45, [
            enemySkillList["strike3"],
            enemySkillList["strike2"],
            enemySkillList["buff"],
            enemySkillList["mountainsp"],
            enemySkillList["guard3"],
            enemySkillList["status_vul"]
        ], enemySkillList["ennuisp"], cardGenerator("ghost")),
        new Enem("Slowpoke", ["water", "psychic"], 300, 10, 45, [
            enemySkillList["strike"],
            enemySkillList["strike2"],
            enemySkillList["buff"],
            enemySkillList["ennuisp"],
            enemySkillList["status_para"]
        ], enemySkillList["seasp"], cardGenerator("psychic2")),
        new Enem("Gothitelle", ["psychic"], 450, 10, 45, [
            enemySkillList["strike4"],
            enemySkillList["strike2"],
            enemySkillList["buff"],
            enemySkillList["buff2"],
            enemySkillList["guard"],
            enemySkillList["ennuisp"],
        ], enemySkillList["status_burn"], cardGenerator("psychic3")),
        new Enem("Slaking", ["normal"], 550, 10, 45, [
            enemySkillList["strike2"],
            enemySkillList["buff2"],
            enemySkillList["guard2"],
            enemySkillList["ennuisp"],
            enemySkillList["status_weak"]
        ], enemySkillList["strike5"], cardGenerator("normal5"))
    ]
}

export const enemyEncounterLegendary = {
    "standard": new Enem("Mewtwo", ["psychic"], 800, 10, 45, [
        enemySkillList["strike4"],
        enemySkillList["standardsp"],
        enemySkillList["buff2"],
        enemySkillList["guard3"],
        enemySkillList["status_para"],
    ], legendarySkills["Mewtwo"]),
    "sea": new Enem("Kyogre", ["water"], 1000, 10, 45, [
        enemySkillList["strike5"],
        enemySkillList["seasp"],
        enemySkillList["status_buff"],
        enemySkillList["guard2"],

    ], legendarySkills["Kyogre"]),
    "sky": new Enem("Rayquaza", ["flying"], 1100, 10, 45, [
        enemySkillList["strike3"],
        enemySkillList["skysp"],
        enemySkillList["buff2"],
        enemySkillList["guard3"],
        enemySkillList["status_vul"],

    ], legendarySkills["Rayquaza"]),
    "mountain": new Enem("Regirock", ["rock"], 1200, 10, 45, [
        enemySkillList["strike5"],
        enemySkillList["mountainsp"],
        enemySkillList["status_buff"],
        enemySkillList["buff2"],
        enemySkillList["guard3"],
        enemySkillList["status_weak"],

    ], legendarySkills["Regirock"]),
    "ennui": new Enem("Giratina", ["ghost", "dragon"], 700, 10, 45, [
        enemySkillList["strike4"],
        enemySkillList["ennuisp"],
        enemySkillList["buff2"],
        enemySkillList["guard3"],
        enemySkillList["status_para"],
        enemySkillList["status_weak"],
        enemySkillList["status_vul"],

    ], legendarySkills["Giratina"]),
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


export function relicGenerator(name) {
    switch (name) {
        case "Leftovers":
            return new Relic("item", "Minor Healing per turn", "Leftovers", 200)
        case "Quick Claw":
            return new Relic("item", "First Card each turn plays twice", "Quick Claw", 400)
        case "Focus Band":
            return new Relic("item", "Survive a single attack that would take you out with 1 HP", "Focus Band", 250)
        case "Berserk Gene":
            return new Relic("item", "All attacks are 40% stronger but come with a chance to gain 1 paralysis stack.", "Berserk Gene", 400)
        case "Sitrus Berry":
            return new Relic("item", "Minor Healing per turn.", "Sitrus Berry", 100, true)
        case "Cheri Berry":
            return new Relic("item", "Cures all paralyze stacks.", "Cheri Berry", 100, true)
        case "Custap Berry":
            return new Relic("item", "If your HP is below 33%, the first card played every turn is free.", "Custap Berry", 100, true)
        case "Eviolite":
            return new Relic("item", "If this pokemon hasn't reached their full potential, permanently gain 1 PokePoint.", "Eviolite", 600)
        case "Rocky Helmet":
            return new Relic("item", "All thorns damage is doubled.", "Rocky Helmet", 200)
        case "Shell Bell":
            return new Relic("item", "Gain 5 STR everytime you take recoil damage.", "Shell Bell", 450)
        default:
            break;
    }
    // type, value, name, price, isberry
}

const weatherTypes = ["clear", "rainy", "hail", "foggy", "sunny", "windy"]
const lines = ["standard", "sea", "sky", "mountain", "ennui"]


