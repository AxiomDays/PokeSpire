import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { GameController, Player, Deck, Enem, getRandomNumber, cardGenerator } from "../models.js";
import { EventObject, Map_Class } from "../map.js";
import { mapGenerator } from "../data.js";
import { constructPlayer, constructDeck } from "../api.js";
import "./Landing.css";
import App from "./Components/App";
import Map from "./Components/Map";
import Home from "./Components/Home.jsx";
import Index from "./Components/Index.jsx";
import Store from "./Components/Store.jsx";
import GameEvent from "./Components/GameEvent.jsx";
import Header from "./Components/Header.jsx";

function Landing() {
	const [comb, setComb] = useState(3);
	const [phase, setPhase] = useState(null);
	const [pokemonGenerated, setPokemonGenerated] = useState(false);
	const [currMap, setCurrMap] = useState(() => new Map_Class(mapGenerator(2)));
	const [pokemon, setPokemon] = useState(() => new Player())
	const [deck, setDeck] = useState(() => new Deck([]))
	const [enem, setEnem] = useState(() => new Enem())
	const [weather, setWeather] = useState("")
	const [event, setEvent] = useState(() => new EventObject())
	const [playerPNG, setPPNG] = useState(() => pokemon.png)
	const [typePNG, settypePPNG] = useState(() => pokemon.typepng)
	const [apiLoading, setApiLoading] = useState(false)
	const [marq, setMarq] = useState("")
	const [turn, setTurn] = useState(0)

	function setTurnCounter() {
		setTurn(turn + 1)
	}

	const changeState = (val) => {
		if (apiLoading == false && pokemonGenerated == true) {
			setComb(val)
		}
		console.log(apiLoading, pokemonGenerated)
	}

	const changeEvent = (e) => {
		setEvent(e)
	}

	async function generate(isRandom, url) {
		setApiLoading(true)
		if (isRandom) { url = getRandomNumber(1, 151); console.log(url) }
		setPokemon(await constructPlayer(url))
		setDeck(await constructDeck(url))
		setApiLoading(false)
		setPokemonGenerated(true)
	}

	function changeMarq(val) {
		switch (val) {
			case 0:
				setMarq("Encounter...");
				break;
			case 1:
				setMarq("En Route...");
				break;
			case 2:
				setMarq("Head On a Swivel...");
				break;
			case 3:
				setMarq("Get Your Tickets Ready...");
				break;
			case 4:
				setMarq("Checking In. Please Wait...");
				break;
			case 5:
				setMarq("Oh My...");
				break;
		}
	}

	let game = new GameController(pokemon, enem, deck, weather);

	async function GameStart(player, enem, deck, weather) {
		console.log("Deck object:", deck);
		console.log("Type of createHand:", typeof deck?.createHand);
		console.log("Enemy object:", enem);
		console.log("player: ", player)
		setPokemon(player);
		setEnem(enem);
		setDeck(deck);
		setWeather(weather);
		game.gameState = "INTRODUCTION"
		game.weather = weather;
		deck.resetDeck()
		deck.createHand(enem, pokemon, deck)
		console.log("game start function entered?")
	}

	async function evolve(player) {
		console.log(`${player.type[0].type.name}2`)
		if (((player.evoPosition + 1) >= player.evolutionChain.length)) {
			alert("This Pokemon has grown as much as it can...")
		} else if (player.evo < player.maxevo) {
			alert("Your pokemon hasn't grown enough yet...")
		} else {
			console.log(`${player.type[0]}2`)
			setPokemon(await constructPlayer(player.name, true, player.evoPosition + 1, player))
			if (player.type.length == 1) {
				for (let i = 0; i < 2; i++) {
					game.deck.addCard(cardGenerator(`${player.type[0].type.name}2`))
					console.log(`${player.type[0].type.name}2`)
				}
			} else {
				game.deck.addCard(cardGenerator(`${player.type[0].type.name}2`))
				console.log(`${player.type[0].type.name}2`)
				console.log(`${player.type[0].type.name}2`)
				game.deck.addCard(cardGenerator(`${player.type[0].type.name}2`))
			}

		}
	}

	useEffect(() => {
		console.log("png useeffect test", pokemon.png)
		setPPNG(pokemon.png)
		settypePPNG(pokemon.typepng)
	}, [pokemon])

	useEffect(() => {
		switch (comb) {
			case 0:
				setPhase(<App changeStateFunc={changeState} map={currMap} pokemon={pokemon} deck={deck} weather={weather} game={game} turncounter={setTurnCounter} />)
				break;
			case 1:
				setPhase(<Map changeStateFunc={changeState} map={currMap} player={pokemon} png={playerPNG} typePNG={typePNG} deck={deck} game={game} gamestart={GameStart} changeEvent={changeEvent} turn={turn} />)
				break;
			case 2:
				setPhase(<Home changeStateFunc={changeState} player={pokemon} deck={deck} game={game} png={playerPNG} typePNG={typePNG} />)
				break;
			case 3:
				setPhase(<Index changeStateFunc={changeState} generate={generate} png={playerPNG} typePNG={typePNG} apiLoading={apiLoading} player={pokemon} currMap={currMap} setCurrMap={setCurrMap} />)
				break;
			case 4:
				setPhase(<Store changeStateFunc={changeState} player={pokemon} deck={deck} />)
				break;
			case 5:
				setPhase(<GameEvent changeStateFunc={changeState} player={pokemon} deck={deck} game={game} event={event} gamestart={GameStart} evolve={evolve} png={playerPNG} typePNG={typePNG} />)
				break;
			case 6:
				setPhase(<GameEvent changeStateFunc={changeState} player={pokemon} deck={deck} game={game} event={event} isPokeCenter={true} gamestart={GameStart} evolve={evolve} png={playerPNG} typePNG={typePNG} />)
				break;
			case 7:
				setPhase(<GameEvent changeStateFunc={changeState} player={pokemon} deck={deck} game={game} event={event} isChest={true} gamestart={GameStart} png={playerPNG} typePNG={typePNG} />)
				break;
			default:
				console.log("default? as how now?")
				break;
		}
		changeMarq(comb)
	}, [comb, apiLoading, pokemon])

	return (
		<>
			<div className="overall-body d-lg-block d-none">
				<Header text={marq} changeStateFunc={changeState} player={pokemon} deck={deck} png={playerPNG} typePNG={typePNG} phase={comb} />
				<div className="container-fluid p-0 m-0">{phase}</div>
			</div>
			<div className="d-lg-none d-block container d-flex align-items-center">
				<div className="col row  bg-dark border-danger-subtle border-3 text-danger mobile-alert">
					<div className="warning-title h2">ALERT</div>
					<span className=""> This web app isn't designed for screens of this size, please access on a wider screen. </span>
				</div>
			</div>
		</>
	);
}

export default Landing;
