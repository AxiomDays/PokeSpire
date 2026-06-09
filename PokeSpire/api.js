import { Player, Deck, Card } from "/models.js";

async function getPokeData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Response Status: " + response.status)
        }

        const result = await response.json()
        console.log(result)
        return result

    } catch (error) {
        console.error(error.message)
        return false
    }

}

export async function constructPlayer(pokeName) {
    console.log(pokeName)
    const data = await getPokeData(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    if (data) {
        const apiPlayer = new Player(data["name"], data["types"],
            HPStatToMultiplier(data["stats"][0]["base_stat"]),
            SDefStatToOHP(data["stats"][2]["base_stat"]),
            HPStatToMultiplier(data["stats"][0]["base_stat"]),
            0,
            100,
            baseStatToMultiplier(data["stats"][1]["base_stat"]),
            baseStatToMultiplier(data["stats"][3]["base_stat"]),
            baseStatToMultiplier(data["stats"][4]["base_stat"])
        )
        return apiPlayer;
    } else {
        return false
    }
}

export async function constructDeck(pokeName) {
    const data = await getPokeData(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    const typeList = data["types"];
    let cards = []
    if (typeList.length == 1) {
        for (let i = 0; i < 4; i++) {
            cards.push(new Card("", "strike", 20, 1),)
            cards.push(new Card("", "shield", 20, 1),)
            cards.push(new Card(typeList[0]["type"]["name"], "flash", 30, 2),)
        }
    } else {
        for (let i = 0; i < 4; i++) {
            cards.push(new Card("", "strike", 20, 1),)
            cards.push(new Card("", "shield", 20, 1),)
        }
        cards.push(new Card(typeList[0]["type"]["name"], "flash", 20, 1),)
        cards.push(new Card(typeList[0]["type"]["name"], "flash", 20, 1),)
        cards.push(new Card(typeList[1]["type"]["name"], "flash", 30, 2),)
        cards.push(new Card(typeList[1]["type"]["name"], "flash", 30, 2),)
    }

    if (typeList.length > 1) {
        for (let i = 0; i < 4; i++) {
            cards.push(new Card(typeList[0]["type"]["name"],
                typeList[0]["type"]["name"], 25, 1),)
        };
        for (let i = 0; i < 4; i++) {
            cards.push(new Card(typeList[1]["type"]["name"],
                typeList[1]["type"]["name"], 25, 1),)
        };
    } else {
        for (let i = 0; i < 8; i++) {
            cards.push(new Card(typeList[0]["type"]["name"],
                typeList[0]["type"]["name"], 25, 1),)
        };
    }

    for (let i = 0; i < 4; i++) {
        cards.push(new Card("normal", "potion", 20, 2, "item"),)
    }
    let deck = new Deck(cards)
    return deck
}

function HPStatToMultiplier(value) {
    return 200 + value;
}

function SDefStatToOHP(value) {
    console.log("sdef check: ", value)
    switch (true) {
        case (value <= 50):
            return 10;
            break
        case (value > 50 && value <= 80):
            return 20;
            break;
        case (value > 80):
            return 30;
            break;
    }
}

function baseStatToMultiplier(value) {
    console.log("base Stat check: ", value)
    switch (true) {
        case (value <= 40):
            return ["F", 1.2]
            break;
        case (value > 40 && value <= 55):
            return ["E", 1.3]
            break;
        case (value > 55 && value <= 70):
            return ["D", 1.5]
            break;
        case (value > 70 && value <= 85):
            return ["C", 1.6]
            break;
        case (value > 85 && value <= 100):
            return ["B", 1.7]
            break;
        case (value > 100 && value <= 115):
            return ["A", 1.9]
            break;
        case (value > 115):
            return ["S", 2]
            break;
    }

}