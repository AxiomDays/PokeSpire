import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./GameEvent.css";
import CadeuxReward from "./CadeuxReward";
import PlayerStatBar from "./PlayerStatBar";
import Decklist from "./Decklist";
import { useEffect } from "react";
import { statusEffectsPush, takeRandomFromArray, skillNametoMoveName } from "../../models";

function GameEvent({ changeStateFunc, player, deck, game, event, isPokeCenter, isChest, gamestart, evolve, png, typePNG }) {
    const [count, setCount] = useState(0);
    const [displayResults, setDisplayResults] = useState(false)
    const [displayDesc, setDisplayDesc] = useState("")
    const [displayOutcome, setDisplayOut] = useState("")
    const [selectedOption, setSelectedOption] = useState()
    const [delList, setDelList] = useState(false)
    const [typeList, setTypeList] = useState(false)
    const [shd, setshd] = useState(false)
    const [cont, setHideCont] = useState(false)
    const [cardChangeLimit, setCardChangeLimit] = useState(1)
    let pendingEvent = false;

    let optionList = []
    if (!isPokeCenter && !isChest) {
        let eventOptions = event.options.forEach((option) => {
            optionList.push(<div key={option[0]} className="event-option col-3" onClick={() => { setDisplay(option[0]) }}>{option[1]}</div>
            )
        })
    }

    function pokecenterHeal() {
        player.pokeCenterHeal()
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
            gamestart(player, content, deck, "clear")
        }
    }

    const setDisplay = (opt) => {
        setDisplayResults(true)
        setSelectedOption(opt)
        setDisplayDesc(event.options[opt][2])
        setDisplayOut(event.options[opt][3])
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
        pendingEvent = false
        let skipNextVar = false
        event.rewards[eventOption].forEach((option) => {
            if (skipNextVar == true) {
                console.log("SKIPPED EVENT FOREACH");
                return;
            }
            skipNextVar = false
            switch (option[0]) {
                case "fight":
                    swapToScene("fight", option[1])
                    pendingEvent = true
                    console.log("fight event works", option[1])
                    break
                case "reward":
                    rewardGet(option[1])

                    break
                case "buff":
                    player.eventBoost(option[1][1], option[1][0])
                    if (player.HP > player.MaxHP) {
                        player.HP = player.MaxHP
                    }
                    console.log("buff event works", player)

                    break
                case "evolve":
                    player.evo += 100
                    evolve(player)

                    break
                case "trans_poke":
                    player.shadow = true;

                    break;
                case "trans_card":
                    setTypeList(true)
                    setCardChangeLimit(option[1])
                    break;
                case "trans_shd_card":
                    setshd(true)
                    setTypeList(true)
                    setCardChangeLimit(option[1])
                    break;
                case "curse":
                    statusEffectsPush(player.gameStatusList, option[1])

                    break;
                case "duplicate":
                    deck.addCard(takeRandomFromArray(deck.cards))
                    deck.addCard(takeRandomFromArray(deck.cards))
                    break;
                case "remove":
                    setDelList(true);
                    pendingEvent = true;
                    break;
                case "pricecheck":
                    if (player.gold < option[1]) {
                        alert("Not enough money.")
                        skipNextVar = true
                    } else {
                        player.gold -= option[1]
                        break
                    }


            }
        })
        if (!pendingEvent) {
            changeStateFunc(1)
        }


    }

    useEffect(() => { }, [displayResults])

    return (
        <>
            <div className="container-fluid p-2">
                <div className="card-box-reward row">
                    <div className="event-container row">
                        <div className="stat-bar col-4"><PlayerStatBar player={player} deck={deck} game={game} /></div>

                        {displayResults ?
                            <div className="event-div row col-12">
                                <h1>{displayDesc}</h1>
                                <div className="greyBorderImage alert">{displayOutcome}</div>
                                <div className={cont ? "event-option hidden" : "event-option"} onClick={() => { concludeEvent(selectedOption); setHideCont(true) }}>Continue</div>
                            </div>
                            : (
                                isPokeCenter ?
                                    <div className="pokecenter-div col">
                                        < div className="btn-row row">
                                            <div className="event-option col-4" id={player.evo < 100 ? "faded" : ""} onClick={() => { evolve(player); pokecenterHeal() }}>Evolve Pokemon</div>
                                            <div className="event-option col-4" onClick={() => { pokecenterHeal() }}>Heal Pokemon</div>
                                            <div className="event-option col-4" onClick={() => { setDelList(true) }}>Delete Card</div>
                                            {/* <div className="event-option col-3" onClick={() => { setTypeList(true) }}>Change Card Type</div> */}
                                        </div>
                                    </div>
                                    : (

                                        isChest ? <div className="pokecenter-div">
                                            <CadeuxReward card={event} player={player} deck={deck} />
                                            < div className="btn-row justify-content-around row">
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
                        <div className="delList" onClick={() => { setTimeout(() => { setDelList(false), changeStateFunc(1) }, 500) }}>{delList ? <Decklist deck={deck} player={player} isDeleting={true} png={png} typePNG={typePNG} /> : ""}</div>
                        <div className="delList">{typeList ? <Decklist deck={deck} player={player} isDeleting={false} isChangeType={true} png={png} typePNG={typePNG} changeStateFunc={changeStateFunc} shadowException={shd} ccLimit={cardChangeLimit} /> : ""}</div>
                    </div >
                </div>
            </div >
        </>
    );
}

export default GameEvent;