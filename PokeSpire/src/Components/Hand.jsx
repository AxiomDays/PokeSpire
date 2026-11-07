import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Hand.css";
import Cadeux from "./Cadeux";

function Hand({ update, changeStateFunc, deck, game, pokemon, map, openVictoryModal, setTurnCounter }) {
	const [drawCount, setDrawCount] = useState(0);

	let counter = 0;
	let hand = []


	deck.hand.forEach((card) => {
		counter++;
		hand.push(
			<div key={counter} id="card-battle-div" className="col-2">
				<Cadeux card={card} update={update} game={game} player={pokemon} />
			</div>,
		);
	});

	useEffect(() => { }, [drawCount, hand])

	return (
		<>
			<div className="container-fluid p-0 hand">
				<div className="console-box row p-0">
					<div className="console col-10" id="console">
						<span id="output"></span>
					</div>
					<div className="endturn col-2"
						onClick={() => {
							game.endTurn(pokemon);
							setTurnCounter()
							setTimeout(() => {
								update();
								if (game.gameState == "WIN" && game.overKill == true) {
									openVictoryModal(true)
								} else if (game.gameState == "WIN") {
									openVictoryModal(false)
								} else if (game.gameState == "LOSS") {
									openVictoryModal(false, true)
									map.currentStage = 0
								}
							}, 2000);
						}}
					>
						<img src="/keyboard_double_arrow_right_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="" srcset="" />
					</div>
				</div>
				<div className="deck row">{hand}</div>


			</div>
		</>
	);
}

export default Hand;
