import { useState } from "react";
import { getRandomNumber, Player, Deck, randomProperty, takeRandomFromArray } from "../../models";
import { rewards, cardRewards } from "../../data"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Store.css";
import CadeuxReward from "./CadeuxReward";

function Store({ changeStateFunc, player, deck }) {
    const [purchased, isPurchased] = useState([])
    const [balance, setBalance] = useState([player.gold])
    const [inventory] = useState(generateShopRewards())

    function generateShopRewards() {
        return ({
            card: [
                takeRandomFromArray(cardRewards),
                takeRandomFromArray(cardRewards),
                takeRandomFromArray(cardRewards)
            ],

            relics: [
                takeRandomFromArray(rewards),
                takeRandomFromArray(rewards),
                takeRandomFromArray(rewards),
            ]
        })
    }


    function generateInventory() {
        let cards = []
        let relics = []

        for (let i = 0; i < 3; i++) {
            let rewardCard = inventory.card[i]
            let rewardRelic = inventory.relics[i]
            cards.push(
                <CadeuxReward isItem={rewardCard.constructor.name == "Relic"} card={rewardCard} deck={deck} player={player} isBuy={true} />
            )
            relics.push(
                <CadeuxReward isItem={rewardRelic.constructor.name == "Relic"} card={rewardRelic} deck={deck} player={player} isBuy={true} />
            )
        }

        return [cards, relics]
    }
    let inv = generateInventory()

    return (
        <>
            <div className="container-fluid">
                <div className="store-bg-div">
                    <div className="store-div row justify-content-evenly">
                        <div className="store-title desc-cadeaux row col-2">
                            {balance} <img src="../src/assets/coins.png" alt="" className="" />
                        </div>
                        <div className="row-div row col-8">
                            <div className="store-cards row col-12" onClick={() => { setBalance(player.gold) }}>{inv[0]}</div>
                            <div className="store-cards row col-12" onClick={() => { setBalance(player.gold) }}>{inv[1]}</div>
                        </div>
                        <span className="start-button-index col-4" onClick={() => { changeStateFunc(1) }}><span>PROGRESS</span></span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Store;