import { useState } from "react";
import { skillNametoMoveName } from "../../models"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Cadeux.css";

function Cadeux({ card, update, game, player }) {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className="container-fluid p-2">
				<div className="card-box row">
					<div className="card-details">
						{card.type}
						<br />
						{skillNametoMoveName(card.skill)}
						<br />
						{card.value + player.signedSTR}
						<br />
						cost:{card.cost}
						<br />
						<div className="desc-cadeaux">{card.desc}</div>
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
