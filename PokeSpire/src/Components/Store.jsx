import { useState } from "react";
import { getRandomNumber, Player, Deck } from "../../models";
import { storeInventory } from "../../data"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Store.css";
import CadeuxReward from "./CadeuxReward";
import Decklist from "./Decklist";
import { useEffect } from "react";

function Store({ changeStateFunc, player, deck }) {
    const [purchased, isPurchased] = useState([])

    function generateInventory() {
        let cards = []
        let relics = []

        for (let i = 0; i < 3; i++) {
            let rewardCard = storeInventory.card[i]
            let rewardRelic = storeInventory.relics[i]
            cards.push(
                <CadeuxReward isItem={rewardCard.constructor.name == "Relic"} card={rewardCard} deck={deck} player={player} isBuy={true} />
            )
            relics.push(
                <CadeuxReward isItem={rewardRelic.constructor.name == "Relic"} card={rewardRelic} player={player} isBuy={true} />
            )
        }

        return [cards, relics]
    }
    let inv = generateInventory()

    return (
        <>
            <div className="container-fluid p-2">

                <div className="card-box-reward row">
                    <div className="store-cards row">{inv[0]}</div>
                    <div className="store-cards row">{inv[1]}</div>
                    <button className="exit" onClick={() => { changeStateFunc(1) }}>EXIT</button>
                </div>
            </div>
        </>
    );
}

export default Store;