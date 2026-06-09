import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Map.css";
import { Map_Class, Scenario } from "../../map.js";
import { Enem, GameStart, takeRandomFromArray } from "../../models";
import { rewards } from "../../data"
import CadeuxReward from "./CadeuxReward.jsx";


function Map({ changeStateFunc, map, player, deck, game, gamestart }) {
	const [stage, setStage] = useState(map.currentStage);

	const swapToFight = (enemy) => {
		console.log("enemy: ", enemy)
		changeStateFunc(0)
		enemy.reset()
		gamestart(player, enemy, deck)
		setStage(map.advance())
	}

	const rewardGet = (reward) => {
		if (reward.constructor.name == "Card") {
			console.log(deck.cards)
			deck.addCard(reward)
			console.log("reward get obtained")
			console.log(deck.cards)
		} else {
			reward.addRelic(player)
		}
		changeStateFunc(2);
	}

	function createMap() {
		let seg = []
		map.segments[stage].forEach((scene) => {
			seg.push(
				<button className="scene-btn col-12" onClick={() => swapToFight(scene.enemy)}>{scene.type}</button>
			)
		})
		return seg
	}

	function victoryScreen() {
		let seg = []
		for (let i = 0; i < 3; i++) {
			let reward = takeRandomFromArray(rewards)
			seg.push(
				<button className="scene-btn col-12" onClick={() => rewardGet(reward)}><CadeuxReward isItem={reward.constructor.name == "Relic"} card={reward} player={player} /></button>
			)
		}
		return seg
	}



	return (
		<>
			<div className="container-fluid p-0">
				<h2 className="choice-group-title">{stage == map.len ? "Victory" : "Choose Your Path"}</h2>
				<div className="choice-group row">
					{stage == map.len ? victoryScreen() : createMap()}
				</div>
			</div>
		</>
	);
}

export default Map;
