import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { GameController, Player, Deck, Enem, getRandomNumber } from "../models.js";
import { Map_Class, Scenario } from "../map.js";
import { segmentA, segmentB, segmentC } from "../data.js";
import { constructPlayer, constructDeck } from "../api.js";
import "./Landing.css";
import App from "./Components/App";
import Map from "./Components/Map";
import Home from "./Components/Home.jsx";
import Index from "./Components/Index.jsx";

function Landing() {
	const [comb, setComb] = useState(3);
	const [phase, setPhase] = useState(null)
	const [currMap] = useState(() => new Map_Class([segmentA, segmentB, segmentC]));
	const [pokemon, setPokemon] = useState(() => new Player())
	const [deck, setDeck] = useState(() => new Deck())
	const [enem, setEnem] = useState(() => new Enem())

	const changeState = (val) => {
		setComb(val)
	}

	async function generate(isRandom, url) {
		if (isRandom) { url = getRandomNumber(1, 151); console.log(url) }
		setPokemon(await constructPlayer(url))
		setDeck(await constructDeck(url))
	}

	let game = new GameController(pokemon, enem, deck);

	function GameStart(player, enem, deck) {
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
				setPhase(<App changeStateFunc={changeState} pokemon={pokemon} deck={deck} game={game} />)
				break;
			case 1:
				setPhase(<Map changeStateFunc={changeState} map={currMap} player={pokemon} deck={deck} game={game} gamestart={GameStart} />)
				break;
			case 2:
				setPhase(<Home changeStateFunc={changeState} player={pokemon} deck={deck} game={game} />)
				break;
			case 3:
				setPhase(<Index changeStateFunc={changeState} generate={generate} />)
				break;
			default:
				console.log("default? as how now?")
				break;
		}
	}, [comb])

	return (
		<>
			{<div className="container-fluid p-0">{phase}</div>}
		</>
	);
}

export default Landing;
