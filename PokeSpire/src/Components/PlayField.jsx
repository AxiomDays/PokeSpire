import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./PlayField.css";
import Hand from "./Hand";

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
}) {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className="container-fluid p-0">
				<div className="play-pen">
					<div className="left-player">
						{name} {HP}/{MaxHP} `[{SHD}]` ({pMana}) ({pEvo})
					</div>
					<div className="right-enemy">
						{ename} {eHP}/{eMaxHP} `[{eSHD}]`
					</div>
				</div>
			</div>
		</>
	);
}

export default PlayField;
