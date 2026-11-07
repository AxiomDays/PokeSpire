import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Decklist.css";
import CadeuxReward from "./CadeuxReward";
import MetroCard from "./MetroCard";
import { relicGenerator } from "../../data.js"
import { Relic } from "../../models.js";

function Decklist({ isDeleting = false, isChangeType = false, deck, player, png, typePNG, reliclist = false, changeStateFunc, shadowException, ccLimit }) {
    const [count, setCount] = useState(0);
    const [cardChange, setCC] = useState(1)

    function deckList() {
        let list = []
        deck.cards.forEach((card) => {
            list.push(<CadeuxReward key={card.id} card={card} player={player} deck={deck} isDel={isDeleting} isChangetype={isChangeType} changeStateFunc={changeStateFunc} shd={shadowException} currentCC={cardChange} setCC={setCC} ccLimit={ccLimit} />)
        })
        return list;
    }

    function relicList() {
        let relicList = []
        player.relicList.forEach((card) => {
            const relic = relicGenerator(card)
            relicList.push(<CadeuxReward isItem={relic instanceof Relic} card={relic} player={player} />)
        })
        return relicList;
    }

    return (
        <>
            <div className="container-fluid p-2">
                <div className="drop-deck">
                    <div className="card-div"> <MetroCard player={player} png={png} typePNG={typePNG} /></div>
                    {reliclist == true ? <div className="dropdown-deck mt-5 row">{relicList()}</div> : <div className="dropdown-deck mt-5 row">{deckList()}</div>}
                </div>
            </div>
        </>
    );
}

export default Decklist;