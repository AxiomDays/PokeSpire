import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { GameController, Player, Deck, Enem, getRandomNumber } from "../models.js";
import { EventObject, Map_Class, Scenario } from "../map.js";
import { segmentA, segmentB, segmentC } from "../data.js";
import { constructPlayer, constructDeck } from "../api.js";
import "./Landing.css";
import App from "./Components/App";
import Map from "./Components/Map";
import Home from "./Components/Home.jsx";
import Index from "./Components/Index.jsx";
import Store from "./Components/Store.jsx";
import GameEvent from "./Components/GameEvent.jsx";

function Landing() {
	const [comb, setComb] = useState(3);
	const [phase, setPhase] = useState(null);
	const [pokemonGenerated, setPokemonGenerated] = useState(false);
	const [currMap] = useState(() => new Map_Class([segmentA, segmentB, segmentC]));
	const [pokemon, setPokemon] = useState(() => new Player())
	const [deck, setDeck] = useState(() => new Deck([]))
	const [enem, setEnem] = useState(() => new Enem())
	const [event, setEvent] = useState(() => new EventObject())
	const [apiLoading, setApiLoading] = useState(true)

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

	let game = new GameController(pokemon, enem, deck);

	async function GameStart(player, enem, deck) {
		console.log("Deck object:", deck);
		console.log("Type of createHand:", typeof deck?.createHand);
		console.log("Enemy object:", enem);
		console.log("player: ", player)
		setPokemon(player);
		setEnem(enem);
		setDeck(deck);
		game.gameState = "INTRODUCTION"
		deck.createHand()
		console.log("game start function entered?")
	}

	useEffect(() => {
		switch (comb) {
			case 0:
				setPhase(<App changeStateFunc={changeState} map={currMap} pokemon={pokemon} deck={deck} game={game} />)
				break;
			case 1:
				setPhase(<Map changeStateFunc={changeState} map={currMap} player={pokemon} deck={deck} game={game} gamestart={GameStart} changeEvent={changeEvent} />)
				break;
			case 2:
				setPhase(<Home changeStateFunc={changeState} player={pokemon} deck={deck} game={game} />)
				break;
			case 3:
				setPhase(<Index changeStateFunc={changeState} generate={generate} />)
				break;
			case 4:
				setPhase(<Store changeStateFunc={changeState} player={pokemon} deck={deck} />)
				break;
			case 5:
				setPhase(<GameEvent changeStateFunc={changeState} player={pokemon} deck={deck} game={game} event={event} gamestart={GameStart} />)
				break;
			case 6:
				setPhase(<GameEvent changeStateFunc={changeState} player={pokemon} deck={deck} game={game} event={event} isPokeCenter={true} gamestart={GameStart} />)
				break;
			case 7:
				setPhase(<GameEvent changeStateFunc={changeState} player={pokemon} deck={deck} game={game} event={event} isChest={true} gamestart={GameStart} />)
				break;
			default:
				console.log("default? as how now?")
				break;
		}
	}, [comb, apiLoading])

	return (
		<>
			{<div className="container-fluid p-0">{phase}</div>}
		</>
	);
}

export default Landing;
