import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import PlayField from "./PlayField";
import Hand from "./Hand";

function App({ changeStateFunc, pokemon, deck, game }) {
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
		console.log("update function entered and secured!");
	}

	return (
		<>
			<div className="container-fluid p-0">
				<div className="header"></div>
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
				/>
				<Hand update={updateVals} changeStateFunc={changeStateFunc} deck={deck} game={game} pokemon={pokemon} />
			</div>
		</>
	);
}

export default App;
