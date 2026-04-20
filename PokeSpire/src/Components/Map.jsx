import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Map.css";
import { Map, Scenario } from "/home/tobirama/PokeSpire/PokeSpire/map.js";

function Map({}) {
	const [count, setCount] = useState(0);
	const segment = [
		new Scenario("fight", Enem),
		new Scenario("fight", Enem),
		new Scenario("fight", Enem),
	];

	
	return (
		<>
			<div className="container-fluid p-0">

                
            </div>
		</>
	);
}

export default Map;
