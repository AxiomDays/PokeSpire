import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import PlayField from "./PlayField";
import Hand from "./Hand";
import { Card, Relic, takeRandomFromArray, getRandomNumber, cardGenerator, statusEffectsPush } from "../../models";
import { rewards, cardRewards, } from "../../data"
import CadeuxReward from "./CadeuxReward";

function App({ changeStateFunc, pokemon, deck, weather, game, map, turncounter }) {
	const [pName, setpName] = useState(game.player.name);
	const [pHP, setpHP] = useState(game.player.HP);
	const [pOHP, setpOHP] = useState(game.player.OHP);
	const [pMaxHP, setpMaxHP] = useState(game.player.MaxHP);
	const [pMana, setpMana] = useState(game.player.mana);
	const [pEvo, setpEvo] = useState(game.player.evo);

	const [eName, seteName] = useState(game.enem.name);
	const [eHP, seteHP] = useState(game.enem.HP);
	const [eOHP, seteOHP] = useState(game.enem.OHP);
	const [eMaxHP, seteMaxHP] = useState(game.enem.MaxHP);
	const [enemMove, setEnemMove] = useState(game.enem.startingMove);

	const [cardsPlayed, setCardsPlayed] = useState(0)

	const [victoryModal, isVictoryModal] = useState(false)
	const [lossModal, isLossModal] = useState(false)
	const [overKill, setOverKill] = useState(false)
	const [posseModal, setPosseModal] = useState(false)
	const [fightReward, setFightReward] = useState(generateRewardCard())
	const [surpriseCardGenerated, setSuprise] = useState(false)
	const [posseUse, setPosseUse] = useState(0)
	const [goldReward, setGoldreward] = useState(100)
	let gReward = 100

	function updateVals() {
		setpName(game.player.name);
		setpHP(game.player.HP);
		setpOHP(game.player.OHP);
		setpMaxHP(game.player.MaxHP);

		seteName(game.enem.name);
		seteHP(game.enem.HP);
		seteOHP(game.enem.OHP);
		seteMaxHP(game.enem.MaxHP);
		setpMana(game.player.mana);
		setpEvo(game.player.evo);
		setEnemMove(game.enem.startingMove)

		setCardsPlayed(cardsPlayed + 1)

		console.log("update function entered and secured!");
	}

	const rewardGet = (reward) => {
		if (reward instanceof Card) {
			console.log(deck.cards)
			deck.addCard(reward)
			console.log("reward get obtained")
			console.log(deck.cards)
		} else {
			reward.addRelic(pokemon)
		}
	}

	function generateSurprise(player) {
		let randomReward = ""
		let rewardArr = []
		let returnArr = []
		for (let i = 0; i < 3; i++) {
			if (getRandomNumber(0, 1)) {
				randomReward = takeRandomFromArray(rewards)
			} else {
				randomReward = takeRandomFromArray(cardRewards)
			}
			if (pokemon.relicList.includes(randomReward)) {
				randomReward = new Relic("gold", 50)
			}
			rewardArr.push(randomReward)
		}

		rewardArr.forEach((card) => {
			returnArr.push(
				<div className="card-box col-3" onClick={() => { rewardGet(card); victorySelect() }}>
					<CadeuxReward isItem={card instanceof Relic} card={card} deck={deck} player={player} isGet={true} /></div >
			)
		})
		return returnArr
	}

	function generateRewardCard() {
		let randomReward = takeRandomFromArray(cardRewards)
		return randomReward
	}

	function progress() {
		changeStateFunc(1);
	}

	const openVictoryModal = (overK = false, loss = false) => {
		if (!loss) {
			isVictoryModal(true)
			gReward = 100
		} else {
			isLossModal(true)
		}
		if (overK) {
			gReward = 200
			setOverKill(true)
		}
	}

	const openPosse = () => {
		setPosseModal(!posseModal)
	}

	function victorySelect() {
		setTimeout(() => {
			isVictoryModal(false)
			setOverKill(false)
			setGoldreward(gReward * (Math.round(getRandomNumber(4, 10) / 5)))
			pokemon.gold += goldReward
			progress()
		}, 300);
	}

	function evoSpend(cost) {
		if (pokemon.evo >= cost) {
			pokemon.evo -= cost;
			return true
		} else {
			return false
		}
	}


	useEffect(() => {
		updateVals()
		setFightReward(generateRewardCard())
		setSuprise(generateSurprise())
	}, [posseUse])

	return (
		<>
			<div className="container-fluid p-0">
				<div className="victory-reward store-bg-div row d-flex justify-content-around align-items-center" id={posseModal && "visible"}>
					<div className="col-12 text-center d-flex justify-content-center align-items-center"><span className=" you-fainted text-center fw-bold ">EVO MOVE</span></div>
					<span id={pokemon.evo < 50 ? "locked-out" : ""} className="posse-btn col m-4" onClick={() => {
						if (evoSpend(50)) { pokemon.mana += 3; setPosseUse(posseUse + 1); setPosseModal(false) }
					}}>
						<CadeuxReward card={cardGenerator("posse")} player={pokemon} deck={deck} />
					</span>
					<span id={pokemon.evo < 50 ? "locked-out" : ""} className="posse-btn col m-4" onClick={() => { if (evoSpend(50)) { deck.createHand(game.enem, pokemon, deck, game.weather); setPosseUse(posseUse + 1); setPosseModal(false) } }}>
						<CadeuxReward card={cardGenerator("posse2")} player={pokemon} deck={deck} />
					</span>
					<span id={pokemon.evo < 100 ? "locked-out" : ""} className="posse-btn col m-4" onClick={() => { if (evoSpend(100)) { statusEffectsPush(game.enem.boosts, ["flinch", 1]); setPosseUse(posseUse + 1); setPosseModal(false) } }}>
						<CadeuxReward card={cardGenerator("posse3")} player={pokemon} deck={deck} />
					</span>
					<span className="start-button-index col-4" id="header-deck-btn" onClick={() => {
						setPosseModal(false)
					}}><span>CLOSE</span></span>
				</div>

				<div className="victory-reward store-bg-div row d-flex justify-content-center align-items-center" id={lossModal && "visible"}>
					<div className=" text-center d-flex justify-content-center align-items-center"><span className=" you-fainted text-center fw-bold ">YOU FAINTED...</span></div>
					<span className="start-button-index col-4 me-5" id="header-deck-btn" onClick={() => {
						setTimeout(() => {
							window.location.reload()
						}, 300);
					}}><span>RELOAD</span></span>
					<span className="start-button-index col-4 me-5" id="header-deck-btn" onClick={() => {
						setTimeout(() => {
							isLossModal(false)
							setOverKill(false)
							pokemon.hardReset()
							changeStateFunc(3)
						}, 300);
					}}><span>RETRY</span></span>
				</div>
				<div className="victory-reward store-bg-div row d-flex justify-content-center align-items-center" id={victoryModal && "visible"}>
					<h1 className="you-fainted text-center fw-bold">{overKill ? "OVERKILL" : "Victory"}</h1>
					<div className="reward-row row d-flex justify-content-evenly pt-4 m-5">
						{surpriseCardGenerated}
					</div>

					{/* {overKill ? <div className="event-option col-10 tooltiptest" onClick={() => { rewardGet(fightReward); victorySelect(); }}>Obtain this card.
						<div className="tooltiptext">
							<CadeuxReward isItem={fightReward instanceof Relic} card={fightReward} player={pokemon} />
						</div>
					</div> : <div className="event-option col-10 tooltiptest" onClick={() => { rewardGet(fightReward); victorySelect(); }}>Obtain this card.
						<div className="tooltiptext">
							<CadeuxReward isItem={fightReward instanceof Relic} card={fightReward} player={pokemon} />
						</div>
					</div>}

					<div className="event-option col-10" onClick={() => { rewardGet(new Relic("gold", (100 + (getRandomNumber(1, 15) * (overKill ? 25 : 10))))); victorySelect(); }}>Obtain money.</div>

					<div className="event-option col-10 tooltiptest" onClick={() => { setFightReward(generateSurprise(pokemon)); setSuprise(true); victorySelect(); }}>Surprise Me.
						{surpriseCardGenerated && <div className="tooltiptext">
							<CadeuxReward isItem={fightReward instanceof Relic} card={fightReward} player={pokemon} />
							<div className="rewardGet col-8">GET!</div>
						</div>}
					</div> */}
					<span className="start-button-index col-4" id="header-deck-btn" onClick={() => {
						setTimeout(() => {
							isVictoryModal(false)
							setOverKill(false)
							progress()
						}, 700);
					}}><span>SKIP</span></span>
				</div>
				<PlayField
					name={pName}
					HP={pHP}
					SHD={pOHP}
					MaxHP={pMaxHP}
					ename={eName}
					eHP={eHP}
					eSHD={eOHP}
					eMaxHP={eMaxHP}
					pMana={pMana}
					pEvo={pEvo}
					enemMove={enemMove}
					pokemon={pokemon}
					enem={game.enem}
					weather={weather}
					update={updateVals}
					cardsPlayed={cardsPlayed}
					setPosseModal={setPosseModal}
					posseUse={posseUse}
				/>
				<Hand update={updateVals} changeStateFunc={changeStateFunc} map={map} deck={deck} game={game} pokemon={pokemon} openVictoryModal={openVictoryModal} setTurnCounter={turncounter} />
			</div>
		</>
	);
}

export default App;
