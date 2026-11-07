import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Header.css";
import Decklist from "./Decklist";
import { useEffect } from "react";

function Header({ text = "blood drain again", changeStateFunc, player, deck, png, typePNG
}) {
    const [delList, setDelList] = useState(false);
    const [relList, setRelList] = useState(false);
    const [gold, setGold] = useState(player.gold)

    function openDeck() {
        setDelList(!delList)
        setRelList(false)
    }

    function openRel() {
        setRelList(!relList)
        setDelList(false)
    }

    useEffect(() => {
        setGold(player.gold)
    })

    return (
        <>
            <div className="over-header container-fluid">
                <div className="visual-row">
                    <div className="row col-6">
                        <div className="header-gold-display row col-2">
                            {gold} <img src="../src/assets/coins.png" alt="" className="" />
                        </div>
                        <span className="start-button-index col me-3" id="header-deck-btn" onClick={() => { openDeck() }}><span>DECK</span></span>
                        <span className="start-button-index col" id="header-deck-btn" onClick={() => { openRel() }}><span>RELICS</span></span>
                    </div>
                    <marquee behavior="slide" className="visualizer col-3 col-xl-3" onClick={() => { changeStateFunc(3) }}>{text}</marquee>
                </div>
            </div>
            <div className="delList" >{delList ? <Decklist deck={deck} player={player} isDeleting={false} png={png} typePNG={typePNG} /> : ""}</div>
            <div className="delList" >{relList ? <Decklist deck={deck} player={player} isDeleting={false} png={png} typePNG={typePNG} reliclist={true} /> : ""}</div>
        </>
    );
}

export default Header;