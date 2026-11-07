import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./PlayField.css";
import Hand from "./Hand";

// function dataVisibleChange(){
// 		let hpPercentage = (HP/MaxHP)*100
// 		if ( getElement) {}
// 	}

function PlayField({
	name,
	HP,
	MaxHP,
	SHD,
	ename,
	eHP,
	eMaxHP,
	eSHD,
	pMana,
	pEvo,
	enemMove,
	pokemon,
	enem,
	weather,
	update,
	cardsPlayed,
	setPosseModal,
	posseUse
}) {
	const [hpPercentage, sethpPercentage] = useState(100);
	const [ehpPercentage, setehpPercentage] = useState(100);
	const [pevoPercentage, setpevoPercentage] = useState(100)
	const [activeSHD, setActiveSHD] = useState(false)
	const [statusBar, setStatusBar] = useState(statusBarGenerator())
	const [str, setStr] = useState(pokemon.signedSTR)
	const [tstr, setTStr] = useState(pokemon.tempSTR)
	const [estr, setEstr] = useState(enem.signedSTR)
	const [glimmerVar, setGlimmer] = useState(false)

	useEffect(() => {
		if (HP <= 0) {
			sethpPercentage(0)
		} else if (eHP <= 0) {
			setehpPercentage(0)
		} else {
			sethpPercentage((HP / MaxHP) * 100)
			setehpPercentage((eHP / eMaxHP) * 100)
			setpevoPercentage((pEvo / 100) * 100)
		}
		if (SHD > 0) {
			setActiveSHD(true)
		} else {
			setActiveSHD(false)
		}

		if (pokemon.evo >= 50) {
			setGlimmer(true)
		} else {
			setGlimmer(false)
		}
		setStr(pokemon.signedSTR)
		setTStr(pokemon.tempSTR)
		setEstr(enem.signedSTR)
		setStatusBar(statusBarGenerator())
	}, [HP, eHP, SHD, pEvo, str, pMana, cardsPlayed, posseUse])

	function statusDescPlayer(status) {
		switch (status) {
			case "paralyze":
				return "Each stack negates the use of a card."
			case "barrier":
				return "Negate a single instance of damage per stack."
			case "fortress":
				return "Increased shield generation and mitigates damage."
			case "frozen":
				return "Chance to miss next turn. Potential to score critical damage."
			case "poison":
				return "Take damage every turn, scaling with each stack."
			case "burn":
				return "Take damage equal to a percentage of your max HP each turn."
			case "strength":
				return "Flat value added to card damage."
			case "temp_strength":
				return "Flat value added to card damage for only one turn."
			case "vulnerable":
				return "Take 25% extra damage from all sources."
			case "weakness":
				return "Deal 25% less damage."
			case "future_sight":
				return "An attack is predestined."
			case "fairy2buff":
				return "Protected from negative status effects."
			case "thorns":
				return `Attacker takes ${pokemon.thorns} damage after attacking.`
			case "tracked":
				return `You are being gangstalked by the PIA!`
			case "distress":
				return `Chance to lose points on turn start.`
			case "gasket":
				return `A mysterious group will come to your aid when you need it.`
			case "egg":
				return `You're harboring a mysterious egg. It will hatch soon.`
			default:
				return "It's a status effect, alright."
		}
	}

	function statusDescEnemy(status) {
		switch (status) {
			case "paralyze":
				return "Chance to miss next turn."
			case "barrier":
				return "Negate a single instance of damage per stack."
			case "fortress":
				return "Increased shield generation and mitigates damage.."
			case "frozen":
				return "Chance to miss next turn. Potential to score critical damage."
			case "burn":
				return "Take damage equal to a percentage of your max HP each turn."
			case "poison":
				return "Take damage every turn, scaling with each stack."
			case "strength":
				return "Flat value added to card damage."
			case "vulnerable":
				return "Take 25% extra damage from all sources."
			case "weakness":
				return "Deal 25% less damage."
			case "future_sight":
				return "An attack is predestined."
			case "flinch":
				return "Can't act this turn."
			case "thorns":
				return `Attacker takes ${pokemon.thorns} damage after attacking.`
			default:
				return "It's a status effect, alright."
		}
	}

	function statusBarGenerator() {
		let enemStatus = []
		let playerStatus = []
		for (let item of enem.boosts) {
			enemStatus.push([item[0], item[1]])
		}
		for (let item of pokemon.boosts) {
			playerStatus.push([item[0], item[1]])
		}
		for (let item of pokemon.gameStatusList) {
			playerStatus.push([item[0], item[1]])
		}

		let resultEnem = []
		let resultPlayer = []
		for (let status of enemStatus) {
			console.log(status[0])
			resultEnem.push(<span className="status-icon tooltipteststatus">
				<img src={`../src/assets/icons/${status[0]}.png`} alt="" srcset="" onError={(e) => { e.currentTarget.src = '../src/assets/icons/default.png'; }} />
				<span className="number">{status[1]}</span>
				<span className="tooltipstatus">{statusDescEnemy(status[0])}</span>
			</span>)
		}
		for (let status of playerStatus) {
			console.log(status[0])
			resultPlayer.push(<span className="status-icon tooltipteststatus">
				<img src={`../src/assets/icons/${status[0]}.png`} alt="" srcset="" onError={(e) => { e.currentTarget.src = '../src/assets/icons/default.png'; }} />
				<span className="number">{status[1]}</span>
				<span className="tooltipstatus">{statusDescPlayer(status[0])}</span>
			</span>)
		}
		return [resultEnem, resultPlayer]
	}



	function enemMoveTranslator(atk, value, hitcount) {
		let multiHitPrint = `${value} ${atk == "strike" ? `X ${hitcount}` : ""}`

		return (<>
			<div className="row col justify-content-center">
				<img src={'../src/assets/icons/' + atk + '.png'} alt="" className="enemy-move-icon" /><span className="enem-number">{multiHitPrint}</span>
			</div>
		</>)
	}


	return (
		<>
			<div className="container-fluid p-0">
				<div className="play-field row d-flex justify-content-center">
					<div className="match-condition col-2" ><span id="banner">WEATHER IS CURRENTLY {weather.toUpperCase()}</span></div>
					<div className="play-pen col-12 row">
						<div className="left-player col-4 row">
							<div className={glimmerVar ? "posse arithmetica col-2" : "arithmetica col-2"} title="Click for Evo Move window." onClick={() => { setPosseModal(true) }}>{pMana == NaN ? 0 : pMana}</div>
							<div className="player-body col-9">
								<div className="name-div row col">
									<span className="player-name col-12">{name.toUpperCase()}</span>
									<span className="">{HP}/{MaxHP}</span>
									<span className="hp-bar col-2"> {activeSHD ? <div className="hp-bar-value" style={{ width: `${hpPercentage}%`, 'background-color': 'lightblue' }}></div> : <div className="hp-bar-value" style={{ width: `${hpPercentage}%`, 'background-color': 'greenyellow' }}></div>}</span>
									<span className="xp-bar col-2"> <div className="xp-bar-value" style={{ width: `${pevoPercentage}%` }}></div></span>
									<span className="shield"><img src="../src/assets/icons/fortress.png" alt="" srcset="" className="shield-icon" />{SHD}</span>
								</div>
								<div className="status-row" id="status-row">{str != 0 ?
									<span className="status-icon tooltipteststatus">
										<img src={`../src/assets/icons/strength.png`} alt="" srcset="" />
										<span className="number">{str}</span>
										<span className="tooltipstatus">{statusDescPlayer("strength")}</span>
									</span>
									: ""}{tstr != 0 ?
										<span className="status-icon tooltipteststatus">
											<img src={`../src/assets/icons/strength.png`} alt="" srcset="" />
											<span className="number">{tstr}</span>
											<span className="tooltipstatus">{statusDescPlayer("temp_strength")}</span>
										</span>
										: ""}{statusBar[1]}
								</div>

							</div>
						</div>
						<div className="left-player col-4 row">
							<div className="player-body col-9">
								<div className="name-div row col">
									<span className="player-name col-12">{ename.toUpperCase()}</span>
									<span className="">{eHP}/{eMaxHP}</span>
									<span className="hp-bar col-2"> <div className="hp-bar-value" style={{ width: `${ehpPercentage}%`, 'background-color': 'green' }}></div></span>
									<span className="shield"><img src="../src/assets/icons/fortress.png" alt="" srcset="" className="shield-icon" />{eSHD}</span>
								</div>
								<div className="status-row" id="status-row">{estr != 0 ?
									<span className="status-icon tooltipteststatus">
										<img src={`../src/assets/icons/strength.png`} alt="" srcset="" />
										<span className="number">{estr}</span>
										<span className="tooltipstatus">{statusDescEnemy("strength")}</span>
									</span>
									: ""}{statusBar[0]}</div>
							</div>
						</div>
						<div className="enemy-move col-6"><span className="enemy-move-icon-div col-1">{enemMoveTranslator(enemMove[0].type[0], enemMove[0].value, enemMove[0].hitCount)}</span><span className="enemy-move-text tooltiptestenem col-2">{enemMove[0].name}<span className="tooltipenem">{enemMove[1]}</span></span></div>


					</div>

					<div className="portraits col-12 row">
						<div className="portrait player-portrait col-4">
							<img id="player-sprite" src={pokemon.png[1]} alt="" srcset="" />
						</div>
						<div className="portrait col-4">
							<img id="enemy-sprite" src={enem.png} alt="" srcset="" />
						</div>
					</div>
				</div >
			</div >
		</>
	);
}


export default PlayField;
