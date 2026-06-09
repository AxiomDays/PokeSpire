import { useState } from "react";
import { skillNametoMoveName } from "../../models"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./CadeuxReward.css";

function CadeuxReward({ card, isItem = false, player }) {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className="card-box-reward col-3">
				{isItem ?
					<div className="card-details-reward">
						{card.name}
						<br />
						{card.value}
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
					</div>
				}
			</div>
		</>
	);
}

export default CadeuxReward;
