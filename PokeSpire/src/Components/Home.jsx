import { useState } from "react";
import { game, player, deck } from "../../models";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Home.css";
import CadeuxReward from "./CadeuxReward";
import Decklist from "./Decklist";
import { useEffect } from "react";

function Home({ changeStateFunc, player, deck, game }) {
    const [count, setCount] = useState(0);
    useEffect(() => { player.reset() }, [])


    return (
        <>
            <div className="container-fluid p-2">
                <div className="card-box-reward row">
                    <div className="poke-img col-12"></div>
                    <div className="stats col-12">
                        {player.name} <br></br> {player.HP}/{player.MaxHP} `[{player.OHP}]` ({player.mana}) ({player.evo})
                    </div>
                    <button className="start-button-home col-12" onClick={() => { changeStateFunc(1) }}>START</button>
                    <Decklist deck={deck} player={player} />
                </div>
            </div>
        </>
    );
}

export default Home;