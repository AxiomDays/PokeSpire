import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Map.css";
import MetroCard from "./MetroCard.jsx"
import { Card, Enem, Relic, skillNametoMoveName } from "../../models.js";
import CadeuxReward from "./CadeuxReward.jsx";
import { useEffect } from "react";


function Map({ changeStateFunc, map, player, deck, game, png, typePNG, gamestart, changeEvent, turn }) {
	const [stage, setStage] = useState(map.currentStage);

	function dlImage() {
		let dbtn = document.getElementById("download-btn")
		let ddiv = document.getElementById("download-div")

		if (dbtn) {

			if (ddiv) {
				console.log("ddiv entered")
				html2canvas(ddiv, { useCORS: true }).then(canvas => {
					const imageData = canvas.toDataURL("image/jpeg");
					const link = document.createElement('a')
					link.href = imageData;
					link.download = 'victory-card.png'

					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				})
			}
		}
	}


	const swapToScene = (sceneType, content, isEventBattle = false, weather) => {
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
		if (content instanceof Enem) {
			content.reset()
			console.log("weather is, ", weather)
			gamestart(player, content, deck, weather)
		}
		if (!isEventBattle) {
			setTimeout(() => { setStage(map.advance()) }, 1000)

		}
	}

	const rewardGet = (reward) => {
		if (reward instanceof Card) {
			console.log(deck.cards)
			deck.addCard(reward)
			console.log("reward get obtained")
			console.log(deck.cards)
		} else if (reward instanceof Relic) {
			reward.addRelic(player)
		}
		changeStateFunc(2);
		map.currentStage = 0
	}

	function createMap() {
		let seg = []
		console.log(map)
		console.log(map.segments)
		console.log(map.segments[stage])
		map.segments[stage].forEach((scene) => {
			seg.push(
				<div className="scene-btn col-3" onClick={() => swapToScene(scene.type, scene.content, false, scene.weather)}>
					{scene.weather && scene.weather != "clear" ? <span className="weather-icon" id={scene.weather}> <img src={"/icons/weather/" + scene.weather + ".png"} alt="" srcset="" /></span> : <></>}
					<div className="redbox row">
						<span className="col-1" id="left-redbox">
						</span>
						<div className="redbox-middle-box col-10 row">
							<span className="redbox-middle-top col-12">
								<p>{scene.type}</p>
							</span>
							<span className="redbox-middle-bottom col-12">
								<img src="/stars_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="" srcset="" />
								ADMIT ONE
								<img src="/stars_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="" srcset="" /></span>
						</div>
						<span className="col-1" id="right-redbox">B009987</span>
					</div></div>
			)
		})
		return seg
	}

	function victoryScreen() {
		let relList = []
		let victoryDeck = {}
		let returnedDeckList = []
		player.relicList.forEach(relic => {
			relList.push(<span className="relicElement col-1 p-1 text-body">
				{relic} |
			</span>)
		});
		deck.cards.forEach(item => {
			let card = skillNametoMoveName(item.skill)
			console.log(card)
			if (Object.keys(victoryDeck).length != 0) {
				console.log(victoryDeck)
				if (Object.keys(victoryDeck).includes(card)) {
					victoryDeck[card] += 1
				} else {
					victoryDeck[card] = 1
				}
			} else {
				victoryDeck[card] = 1
			}
		});

		Object.keys(victoryDeck).map(element => (
			returnedDeckList.push(
				<span className="relicElement col-1 text-body p-1">
					{element} - {victoryDeck[element]} |
				</span>)
		));
		// let seg = []
		// for (let i = 0; i < 3; i++) {
		// 	let reward = takeRandomFromArray(cursedRewards)
		// 	if (player.relicList.includes(reward)) {
		// 		reward = new Relic("gold", 200)
		// 	}
		// 	seg.push(
		// 		<div className="scene-btn col-3" onClick={() => rewardGet(reward)}><CadeuxReward isItem={reward instanceof Relic} card={reward} player={player} /></div>
		// 	)
		// }
		//return seg
		return (
			<>
				<div className="victory-div row justify-content-end" id="download-div">
					<h1 className="victory-div-header col-12">CERTIFICATE OF COMPLETION</h1>
					<div className="metro-stamp col">
						<div className="card-div"> <MetroCard player={player} png={png} typePNG={typePNG} /></div>
					</div>
					<div className="lines-completed col-6 h-75">
						<span className="victory-div-header"></span>
						<table className="victory-table">
							<tbody>
								<tr className="victory-row">
									<td className="">Relics:</td><td className="">{relList}</td>
								</tr>
								<tr className="victory-row">
									<td className="">Cards:</td><td className="">{returnedDeckList}</td>
								</tr>
								<tr className="victory-row">
									<td className="">Turns taken:</td><td className="">{player.totalTurns}</td>
								</tr>
								<tr className="victory-row">
									<td className="">Damage Taken:</td><td className="">{player.damageTaken}</td>
								</tr>
								<tr className="victory-row">
									<td className="">Damage Healed:</td><td className="">{player.damageHealed}</td>
								</tr>
								<tr className="victory-row">
									<td className="">Cards Played:</td><td className="">{player.cardsPlayed}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="row justify-content-center pt-0 mt-0">
					<div className="start-button-index col-3" id="download-btn" onClick={() => { dlImage() }}><span>SAVE</span></div>
				</div>
			</>
		)
	}



	return (
		<>
			<div className="event-map p-0 row">
				<h2 className="choice-group-title col-12">{stage == map.len ? "Victory" : "Choose Your Path"}</h2>
				<div className="choice-group col-12 row">
					{stage == map.len ? victoryScreen() : createMap()}
				</div>


			</div>
		</>
	);
}

export default Map;
