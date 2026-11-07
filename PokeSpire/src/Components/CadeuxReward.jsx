import { useState, useEffect, useRef } from "react";
import { skillNametoMoveName } from "../../models"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./CadeuxReward.css";
import "./Cadeux.css"

function CadeuxReward({ card, isItem = false, player, deck, isDel = false, isBuy = false, faded = false, isChangetype = false, changeStateFunc, shd, setCC, currentCC, ccLimit, isGet = false }) {
	const [count, setCount] = useState(0);
	const cardId = useRef(null)
	const [hidden, setHidden] = useState(false)
	const [isFaded, setIsFaded] = useState(faded)
	const [typeDisplay, setTypeDisplay] = useState(false)
	let price = isBuy ? `$${card.price}` : ""

	if (card.constructor.name == "Relic") {
		isItem = true
	}

	function deleteMaybe(card) {
		if (isChangetype && !(cardId.current.classList.contains("faded"))) {
			setTypeDisplay(!typeDisplay)
		}

		if (isDel && !(cardId.current.classList.contains("faded"))) {
			deck.removeCard(card)
			setHidden(true)
		}

		if (isBuy && !(cardId.current.classList.contains("faded"))) {
			rewardBuy(card);
		}

		// if (isGet && !(cardId.current.classList.contains("faded"))) {
		// 	rewardGet(card);
		// }

		console.log(deck)
	}

	const rewardBuy = (reward) => {
		if (player.gold >= reward.price) {
			player.gold -= reward.price
			rewardGet(reward)
			setIsFaded(true)
		} else {
			alert("Not enough cash muchacho")
		}
		console.log(player.gold)
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
	}

	useEffect(() => { }, [isFaded])

	return (
		<>
			<div ref={cardId} id="cadeuxreward" className={hidden ? "card-box-reward col-3 hide" : (isFaded ? "card-box-reward col-3 faded" : "card-box-reward col")} onClick={() => { deleteMaybe(card) }}>
				{isItem ?
					<div className="card-box tooltiptest">
						<div className="card-details col-12 p-0 bg-info">
							<div className="top-row row">
								<div className="card-title col-12"><span>{card.name}</span></div>
							</div>
							<div className="card-img"></div>
							<div className="desc-cadeaux"><p>{card.value}</p></div>
						</div>
						<span className="tooltiptext">{card.value}{isBuy ? <><br />< br /><p>Cost: {price}</p></> : ""}</span>
					</div>
					:
					<div className="card-box tooltiptest">
						<div className="card-details col-12 p-0 bg-info">
							<div className="top-row row">
								<div className="card-cost col-1">{card.cost}</div>
								<div className="card-title col-8"><span>{skillNametoMoveName(card.skill)}</span></div>
							</div>
							<div className="type-row">
								<span id={card.type}>{card.type ? card.type : "neutral"}</span>
							</div>
							<div className="card-img"></div>
							<div className="desc-cadeaux">{card.desc}</div>
						</div>
						<span className="tooltiptext">{card.desc}{isBuy ? <><br />< br /><span>Cost: {price}</span></> : ""}</span>
					</div>
				}
			</div>
			{typeDisplay ? <>
				<div className="col">
					<select class="form-select" aria-label="type select" id="type-select">
						{shd ? <option value="shadow">shadow</option> :
							<>
								<option value="normal">normal</option>
								<option value="fire">fire</option>
								<option value="fighting">fighting</option>
								<option value="flying">flying</option>
								<option value="poison">poison</option>
								<option value="ground">ground</option>
								<option value="rock">rock</option>
								<option value="bug">bug</option>
								<option value="ghost">ghost</option>
								<option value="steel">steel</option>
								<option value="water">water</option>
								<option value="grass">grass</option>
								<option value="electric">electric</option>
								<option value="psychic">psychic</option>
								<option value="ice">ice</option>
								<option value="dragon">dragon</option>
								<option value="dark">dark</option>
								<option value="fairy">fairy</option>
							</>}
					</select>
					<button className="btn btn-primary col" type="button" onClick={() => {
						let temp = document.getElementById("type-select").value
						card.changeType(temp)
						setCC(currentCC + 1)
						setTypeDisplay(false)
						if (currentCC >= ccLimit) {
							changeStateFunc(1)
						}
					}}> SUBMIT </button>
					<button className="btn btn-danger col" type="button" onClick={() => {
						setTypeDisplay(false)
					}}> CLOSE </button>
				</div>
			</> : ""}
		</>
	);
}

export default CadeuxReward;
