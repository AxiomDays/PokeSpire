import { useState } from "react";
import { game, player } from "../../models";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Cadeux.css";

function Cadeux({ card, update }) {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className="container-fluid p-2">
				<div className="card-box">
					<div className="card-details">
						{card.type}
						<br />
						{card.skill}
						<br />
						{card.value + player.signedSTR}
						<br />
						cost:{card.cost}
					</div>
					<button
						onClick={() => {
							game.handlePlay(card);
							update();
							setTimeout(() => {
								update();
							}, 2000);
						}}
					>
						PLAY
					</button>
				</div>
			</div>
		</>
	);
}

export default Cadeux;
