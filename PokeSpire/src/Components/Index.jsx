import { useState } from "react";
import { game, getRandomNumber, Player, Deck } from "../../models";
import { constructPlayer, constructDeck } from "../../api"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Index.css";
import CadeuxReward from "./CadeuxReward";
import Decklist from "./Decklist";
import { useEffect } from "react";

function Index({ changeStateFunc, generate }) {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="container-fluid p-2">
                <div className="card-box-reward row">
                    <div className="poke-img col-12"></div>
                    <div className="stats col-12">
                    </div>
                    <div className="btn-row-index row">
                        <button className="start-button-index col-6" onClick={() => { generate(true) }}>GENERATE</button>
                        <button className="start-button-index col-6" onClick={() => { changeStateFunc(1) }}>START</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;