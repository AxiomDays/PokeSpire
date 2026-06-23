import { useState, useEffect, useRef } from "react";
import { skillNametoMoveName } from "../../models"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./CadeuxReward.css";

function CadeuxReward({ card, isItem = false, player, deck, isDel = false, isBuy = false, faded = false }) {
	const [count, setCount] = useState(0);
	const cardId = useRef(null)
	const [hidden, setHidden] = useState(false)
	const [isFaded, setIsFaded] = useState(faded)
	let price = isBuy ? `$${card.price}` : ""

	if (card.constructor.name == "Relic") {
		isItem = true
	}

	function deleteMaybe(card) {
		if (isDel && !(cardId.current.classList.contains("faded"))) {
			deck.removeCard(card)
			setHidden(true)
		}

		if (isBuy && !(cardId.current.classList.contains("faded"))) {
			rewardBuy(card);
		}

		console.log(deck)
		console.log(player.relicList)
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
			<div ref={cardId} id="cadeuxreward" className={hidden ? "card-box-reward col-3 hide" : (isFaded ? "card-box-reward col-3 faded" : "card-box-reward col-3")} onClick={() => { deleteMaybe(card) }}>
				{isItem ?
					<div className="card-details-reward">
						{card.name}
						<br />
						{card.value}
						<br />
						{price}
					</div>
					:
					<div className="card-details-reward">
						{card.type}
						<br />
						{skillNametoMoveName(card.skill)}
						<br />
						{card.value + player.signedSTR}
						<br />
						cost:{card.cost}
						<br />
						{price}
					</div>
				}
			</div>
		</>
	);
}

export default CadeuxReward;
