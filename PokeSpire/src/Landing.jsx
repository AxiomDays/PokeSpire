import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { game } from "/home/tobirama/PokeSpire/PokeSpire/models.js";
import "./Landing.css";
import App from "./Components/App";

function Landing() {
	const [comb, setComb] = useState(0);

	const changeState = (val) => {
		setComb(val)
	}
	return (
		<>
			<div className="container-fluid p-0">{comb ? <App /> : <Map />}</div>
		</>
	);
}

export default Landing;
