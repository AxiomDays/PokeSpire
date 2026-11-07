import "./Index.css";

import { useState, useEffect } from "react";

function MetroCard({ player, png, typePNG, phase, noImg = false }) {
    const [img, setImg] = useState(["../src/assets/pokeball-icon.png", "../src/assets/pokeball-icon.png", "../src/assets/pokeball-icon.png"])
    const [typeImg, setTypeImg] = useState([""])
    const [playerArr, setPlayerArr] = useState([])

    useEffect(() => {
        if (png != undefined) { setImg(png); }
        if (typePNG != undefined) { setTypeImg(typePNG); }
        if (player.name != undefined) {
            setPlayerArr([player.name, player.HP, player.evo, player.gold, player.strikeScaling, player.flashScaling, player.defScaling, player.type])
        }
    }, [phase])

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }


    return (
        <>
            <div className="over-poke-ticket">
                <div className={player.shadow ? "shadow-card poke-ticket-display" : "poke-ticket-display"} >
                    <div className="poke-ticket-inner-box">
                        <div className="poke-ticket-title">METRO TICKET<img src="../src/assets/pokeball-icon.png" className="poke-ticket-icon"></img></div>
                        <div className="poke-ticket-body row">
                            {!noImg ? <div className="poke-ticket-left-row col-4">
                                <div className="poke-ticket-passport">
                                    <img src={img[0]} className=""></img>
                                </div>
                                <span div="poke-type-div"><img src={typeImg[0]} className=""></img><img src={typeImg[1]} className=""></img></span>
                            </div> : ""}
                            <div className="poke-ticket-table col-8">
                                {playerArr[0] ? <>
                                    <table>

                                        <tbody>

                                            <tr>
                                                <td className="col-3">Name</td><td className="col-9">{capitalizeFirstLetter(playerArr[0])}</td>
                                            </tr>
                                            <tr>
                                                <td>HP</td><td>{playerArr[1]}</td>
                                            </tr>
                                            <tr>
                                                <td>Evolution Pts.</td><td>{playerArr[2]}</td>
                                            </tr>
                                            <tr>
                                                <td>PokeDollars</td><td>{playerArr[3]}</td>
                                            </tr>
                                            <tr>
                                                <td>Striking Power</td><td>{playerArr[4][0]}</td>
                                            </tr>
                                            <tr>
                                                <td>Special Power</td><td>{playerArr[5][0]}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-10">Defensive Power</td><td className="col-2">{playerArr[6][0]}</td>
                                            </tr>

                                        </tbody>
                                    </table>

                                </> : <></>} </div>
                            {player.shadow ? <div className="shadow-text">SHADOW</div> : ""}
                        </div>
                    </div>
                </div>

            </div >
        </>
    );
}

export default MetroCard;