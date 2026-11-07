import { useState } from "react";
import { skillNametoMoveName } from "../../models"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Cadeux.css";
import { useEffect } from "react";

function Cadeux({ card, update, game, player }) {
	const [hasPlayed, setHasPlayed] = useState(card.hasPlayed)

	useEffect(() => { setHasPlayed(card.hasPlayed) })

	return (
		<>
			<div className={hasPlayed ? "card-box-box faded-hide" : "card-box-box p-2 fade-in"}>
				<div className={hasPlayed ? "card-box row" : "card-box row"} onClick={() => {
					game.handlePlay(card);
					update();
					setTimeout(() => {
						update();
					}, 500);
				}}>
					<div className="card-details col-12 p-0 tooltiptest">
						<div className="top-row row">
							<div className="card-cost col-1">{(card.cost == undefined) ? "?" : card.cost}</div>
							<div className="card-title col-8"><span>{skillNametoMoveName(card.skill)}</span></div>
						</div>
						<div className="type-row">
							<span id={card.type}>{card.type ? card.type : "neutral"}</span>
						</div>
						<div className="card-img"></div>
						<div className="desc-cadeaux">{card.desc}</div>
						<span className="tooltiptext">{card.desc} <br /> <div className="addendum">{card.genre == "item" ? "Item Card: Can only be used once before being removed from the deck" : (card.limited == true ? "Limited Card: can only be used once per battle" : (card.unplayable == true ? "Unplayable: Cannot be played." : (card.fleeting == true ? "Fleeting: Can only be played once. Gone permanently." : "")))}</div></span>
					</div>

				</div>
			</div>
		</>
	);
}

export default Cadeux;
