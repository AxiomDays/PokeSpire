import { Player, Deck, Card, cardGenerator } from "/models.js";

const URL = `https://pokeapi.co/api/v2/pokemon/`

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

async function constructEvoChain(data) {
    let response = data
    let arr = []
    if (response) {
        let speciesResponse = await getPokeData(response["species"]["url"])
        if (speciesResponse) {
            let chain = await getPokeData(speciesResponse["evolution_chain"]["url"])
            let evoChain = chain["chain"]
            console.log("chain", evoChain)
            console.log("specie: ", evoChain["species"])
            console.log("evo", evoChain["evolves_to"])
            while (evoChain) {
                let tempEvolve = evoChain["species"]
                arr.push(tempEvolve["name"])
                evoChain = evoChain["evolves_to"][0]
            }
            console.log("evolution nene", evoChain, "the list?", arr, "pos = ")
            return arr
        }
    }
}

export async function constructPlayer(pokeName, evolveCall = false, evoPosition = 0, currentPoke, data = null) {
    console.log(pokeName)
    let evoChain = []
    if (evolveCall) {
        name = currentPoke.evolutionChain[evoPosition]
        console.log(currentPoke)
        console.log("evoname", name)
        evoChain = currentPoke.evolutionChain
        data = await getPokeData(`https://pokeapi.co/api/v2/pokemon/${name}`);
    } else {
        data = await getPokeData(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
        evoChain = await constructEvoChain(data)
        pokeName = evoChain[0]
        data = await getPokeData(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    }
    if (data) {
        let typeList = []
        for (let x in data["types"]) {
            typeList.push(data["types"][x]["type"]["url"])
        }

        let imgArr = []

        for (let each in typeList) {
            let typeResponse = await fetch(typeList[each])
            let currentImg = await typeResponse.json();
            console.log(currentImg);
            imgArr.push(currentImg["sprites"]["generation-vi"]["x-y"]["name_icon"])
        }

        const apiPlayer = new Player(data["name"], data["types"],
            HPStatToMultiplier(data["stats"][0]["base_stat"]),
            SDefStatToOHP(data["stats"][2]["base_stat"]),
            HPStatToMultiplier(data["stats"][0]["base_stat"]),
            0,
            [data["sprites"]["front_default"], data["sprites"]["back_default"], data["sprites"]["other"]["official-artwork"]["front_default"]],
            imgArr,
            100,
            baseStatToMultiplier(data["stats"][1]["base_stat"]),
            baseStatToMultiplier(data["stats"][3]["base_stat"]),
            baseStatToMultiplier(data["stats"][4]["base_stat"]),
            evoChain, evoPosition
        )
        return apiPlayer;
    } else {
        return false
    }
}

export async function constructDeck(pokeName) {
    const data = await getPokeData(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    const typeList = data["types"];
    let cards = [];
    if (typeList.length == 1) {
        for (let i = 0; i < 2; i++) {
            cards.push(new Card("", "strike", 20, 1),)
            cards.push(new Card("", "shield", 20, 1),)
            cards.push(new Card(typeList[0]["type"]["name"], "flash", 30, 2),)
        }
    } else {
        for (let i = 0; i < 2; i++) {
            cards.push(new Card("", "strike", 20, 1),)
            cards.push(new Card("", "shield", 20, 1),)
        }
        cards.push(new Card(typeList[0]["type"]["name"], "flash", 25, 2),)
        cards.push(new Card(typeList[1]["type"]["name"], "flash", 25, 2),)
    }

    if (typeList.length > 1) {
        for (let i = 0; i < 2; i++) {
            cards.push(cardGenerator(typeList[0]["type"]["name"]),)
        };
        for (let i = 0; i < 2; i++) {
            cards.push(cardGenerator(typeList[1]["type"]["name"]),)
        };
    } else {
        for (let i = 0; i < 4; i++) {
            cards.push(cardGenerator(typeList[0]["type"]["name"]))
        };
    }

    for (let i = 0; i < 1; i++) {
        cards.push(cardGenerator("pokeball"));
    }
    console.log(cards)
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