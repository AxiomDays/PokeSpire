import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./PlayField.css";
import { useEffect } from "react";

function PlayerStatBar({ player, deck, game }) {
    const [count, setCount] = useState(0);
    const [hpPercentage, sethpPercentage] = useState(100);
    const [ehpPercentage, setehpPercentage] = useState(100);
    const [pevoPercentage, setpevoPercentage] = useState(player.evo)
    const [gold, setGold] = useState(player.gold)


    let HP = player.HP;
    let MaxHP = player.MaxHP;
    let pMana = player.mana
    let SHD = player.SHD
    let pEvo = player.evo

    useEffect(() => {
        if (HP <= 0) {
            sethpPercentage(0)
        } else {
            sethpPercentage((HP / MaxHP) * 100)
            setpevoPercentage((pEvo / 100) * 100)
        }
    }, [HP, pEvo])

    return (
        <>
            <div className="left-player col row">
                <div className="arithmetica col-2">{pMana}</div>
                <div className="player-body col-9">
                    <div className="name-div row col">
                        <span className="player-name col-12">{player.name.toUpperCase()}</span>
                        <span className="">{HP}/{MaxHP}</span>
                        <span className="hp-bar col-2"> <div className="hp-bar-value" style={{ width: `${hpPercentage}%`, color: 'blue' }}></div></span>
                        <span className="xp-bar col-2"> <div className="xp-bar-value" style={{ width: `${pevoPercentage}%` }}></div></span>
                        <span className="shield">{SHD}</span>
                    </div>
                </div>
            </div>
            <div className="store-title desc-cadeaux row col">
                {gold} <img src="/coins.png" alt="" className="" />
            </div>
        </>
    );
}

export default PlayerStatBar;