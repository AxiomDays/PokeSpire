import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Map.css";
import { Map_Class, Scenario } from "../../map.js";
import { Enem, GameStart, takeRandomFromArray } from "../../models";
import { rewards } from "../../data"
import CadeuxReward from "./CadeuxReward.jsx";


function Map({ changeStateFunc, map, player, deck, game, gamestart, changeEvent }) {
	const [stage, setStage] = useState(map.currentStage);

	const swapToScene = (sceneType, content, isEventBattle = false) => {
		switch (sceneType) {
			case "fight":
				changeStateFunc(0)
				break
			case "legendary":
				changeStateFunc(0)
				break
			case "store":
				changeStateFunc(4)
				break
			case "event":
				changeEvent(content)
				changeStateFunc(5)
				break
			case "pokecenter":
				changeStateFunc(6)
				break
			case "chest":
				changeEvent(content)
				changeStateFunc(7)
				break
		}
		if (content.constructor.name == "Enem") {
			content.reset()
			gamestart(player, content, deck)
		}
		if (!isEventBattle) {
			setStage(map.advance())
		}
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
		map.currentStage = 0
	}

	function createMap() {
		let seg = []
		map.segments[stage].forEach((scene) => {
			seg.push(
				<button className="scene-btn col-12" onClick={() => swapToScene(scene.type, scene.content)}>{scene.type}</button>
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
