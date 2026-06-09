import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Hand.css";
import Cadeux from "./Cadeux";
import { Card } from "/Users/tobirama/Documents/GitHub/PokeSpire/PokeSpire/models.js";

function Hand({ update, changeStateFunc, deck, game, pokemon }) {
	const [count, setCount] = useState(0);

	let hand = [];
	let counter = 0;
	deck.hand.forEach((card) => {
		counter++;
		hand.push(
			<div key={counter} className="col-2">
				<Cadeux card={card} update={update} game={game} player={pokemon} />
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
							game.endTurn(pokemon);
							setTimeout(() => {
								update();
								if (game.gameState == "WIN") {
									changeStateFunc(1);
								} else if (game.gameState == "LOSS") {
									changeStateFunc(2)
								}
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
