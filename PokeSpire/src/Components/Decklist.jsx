import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Decklist.css";
import CadeuxReward from "./CadeuxReward";

function Decklist({ isModifying, deck, player }) {
    const [count, setCount] = useState(0);

    function deckList() {
        let list = []
        deck.cards.forEach((card) => {
            list.push(<CadeuxReward card={card} player={player} />)
        })
        return list;
    }

    return (
        <>
            <div className="container-fluid p-2">
                <div className="drop-deck">
                    <div className="dropdown-deck mt-5 row">{deckList()}</div>
                </div>
            </div>
        </>
    );
}

export default Decklist;