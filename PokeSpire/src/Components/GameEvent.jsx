import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./GameEvent.css";
import CadeuxReward from "./CadeuxReward";
import Decklist from "./Decklist";
import { useEffect } from "react";

function GameEvent({ changeStateFunc, player, deck, game, event, isPokeCenter, isChest, gamestart }) {
    const [count, setCount] = useState(0);
    const [displayResults, setDisplayResults] = useState(false)
    const [displayDesc, setDisplayDesc] = useState("")
    const [selectedOption, setSelectedOption] = useState()
    const [delList, setDelList] = useState(false)

    let optionList = []
    if (!isPokeCenter && !isChest) {
        let eventOptions = event.options.forEach((option) => {
            optionList.push(<div key={option[0]} className="event-option col-3" onClick={() => { setDisplay(option[0]) }}>{option[1]}</div>
            )
        })
    }

    function pokecenterHeal() {
        player.reset()
        changeStateFunc(1)
    }

    const swapToScene = (sceneType, content) => {
        switch (sceneType) {
            case "fight":
                changeStateFunc(0)
                console.log("fight in game event hit")
                break
        }
        if (content.constructor.name == "Enem") {
            content.reset()
            gamestart(player, content, deck)
        }
    }

    const setDisplay = (opt) => {
        setDisplayResults(true)
        setSelectedOption(opt)
        setDisplayDesc(event.options[opt][2])
    }

    const rewardGet = (reward) => {
        if (reward.constructor.name == "Card") {
            console.log(deck.cards)
            deck.addCard(reward)
            console.log("reward get obtained")
            console.log(deck.cards)
        } else {
            reward.addRelic(player)
        }

    }

    const concludeEvent = async (eventOption) => {
        switch (event.rewards[eventOption][0]) {
            case "fight":
                await swapToScene("fight", event.rewards[eventOption][1])
                console.log("fight event works", event.rewards[eventOption][1])
                break
            case "reward":
                rewardGet(event.rewards[eventOption][1])
                console.log("reward event works")
                changeStateFunc(1)
                break
            case "buff":
                player.eventBoost(event.rewards[eventOption][1][1], event.rewards[eventOption][1][0])
                console.log("buff event works", player)
                changeStateFunc(1)
                break
        }

    }

    useEffect(() => { }, [displayResults])

    return (
        <>
            <div className="container-fluid p-2">
                <div className="card-box-reward row">
                    <div className="poke-img col-12"></div>
                    <div className="stats col-12">
                        {player.name} <br></br> {player.HP}/{player.MaxHP} `[{player.OHP}]` ({player.mana}) ({player.evo})
                    </div>

                    {displayResults ?
                        <div className="event-div row">
                            <h1>{displayDesc}</h1>
                            <div className="event-option" onClick={() => { concludeEvent(selectedOption) }}>Continue</div>
                        </div>
                        : (
                            isPokeCenter ?
                                <div className="pokecenter-div">
                                    < div className="btn-row row"><div className="event-option col-3" onClick={() => { pokecenterHeal() }}>Heal Pokemon</div><div className="event-option col-3" onClick={() => { setDelList(true) }}>Delete Card</div></div>
                                    <div className="delList" onClick={() => { setTimeout(() => { setDelList(false), changeStateFunc(1) }, 500) }}>{delList ? <Decklist deck={deck} player={player} isDeleting={true} /> : ""}</div>
                                </div>
                                : (

                                    isChest ? <div className="pokecenter-div">
                                        <CadeuxReward card={event} player={player} deck={deck} />
                                        < div className="btn-row row">
                                            <div className="event-option col-3" onClick={() => { rewardGet(event), setTimeout(() => { changeStateFunc(1) }, 500) }}>Pick up Item</div>
                                            <div className="event-option col-3" onClick={() => { setTimeout(() => { changeStateFunc(1) }, 200) }}>Leave</div>
                                        </div>
                                    </div>
                                        :
                                        <div className="event-div row">
                                            <h1 className="event-header">{event.title}</h1>
                                            <div className="event-desc">{event.desc}</div>
                                            <div className="event-options row">{optionList}</div>
                                        </div>
                                )
                        )}
                </div >
            </div >
        </>
    );
}

export default GameEvent;