import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Decklist.css";
import CadeuxReward from "./CadeuxReward";

function Decklist({ isDeleting = false, deck, player }) {
    const [count, setCount] = useState(0);

    function deckList() {
        let list = []
        deck.cards.forEach((card) => {
            list.push(<CadeuxReward key={card.id} card={card} player={player} deck={deck} isDel={isDeleting} />)
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