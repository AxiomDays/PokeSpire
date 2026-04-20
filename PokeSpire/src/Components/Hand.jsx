import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Hand.css";
import Cadeux from "./Cadeux";
import { Card, game, deck } from "/home/tobirama/PokeSpire/PokeSpire/models.js";

function Hand({ update }) {
	const [count, setCount] = useState(0);

	let hand = [];
	let counter = 0;
	deck.hand.forEach((card) => {
		counter++;
		hand.push(
			<div key={counter} className="col-2">
				<Cadeux card={card} update={update} />
			</div>,
		);
	});

	return (
		<>
			<div className="container-fluid p-0">
				<div className="deck row">{hand}</div>
				<div className="end-turn">
					<button
						onClick={() => {
							game.endTurn();
							setTimeout(() => {
								update();
							}, 2000);
						}}
					>
						end-turn
					</button>
				</div>
				<div className="console-box row">
					<div className="console">
						<span id="output"></span>
					</div>
				</div>
			</div>
		</>
	);
}

export default Hand;
