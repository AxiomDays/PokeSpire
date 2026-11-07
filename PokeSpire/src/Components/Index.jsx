import { useState } from "react";
import { Map_Class } from "../../map";
import { mapGenerator } from "../../data"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Index.css";
import CadeuxReward from "./CadeuxReward";
import Decklist from "./Decklist";
import { useEffect } from "react";
import { getRandomNumber } from "../../models";

function Index({ changeStateFunc, generate, png, typePNG, apiLoading, player, currMap, setCurrMap }) {
    const [count, setCount] = useState(0);
    const [img, setImg] = useState(["../src/assets/pokeball-icon.png", "../src/assets/pokeball-icon.png", "../src/assets/pokeball-icon.png"])
    const [typeImg, setTypeImg] = useState([""])
    const [playerArr, setPlayerArr] = useState([])

    useEffect(() => {
        if (png != undefined) { setImg(png); if (apiLoading) { } }
        if (typePNG != undefined) { setTypeImg(typePNG); if (apiLoading) { } }
        if (player.name != undefined) {
            setPlayerArr([player.name, player.HP, player.evo, player.gold, player.strikeScaling, player.flashScaling, player.defScaling, player.type])
        }
    }, [png, img, typeImg])

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    function specifyPokemon() {
        let person = prompt("Choose your Pokemon", "pikachu").toLocaleLowerCase();
        if (person == null || person == "") {
            return
        } else {
            generate(false, person)
        }
    }

    function createLineList() {
        let arr = ["standard", "sky", "sea", "ennui", "mountain"]
        let ret = []
        arr.forEach((line) => {
            ret.push(<div className="col-4 line-over-div" data-bs-toggle="modal" data-bs-target="#lineModal" onClick={() => { setCurrMap(new Map_Class(mapGenerator(6, line))); changeStateFunc(2) }}><div className="line-buttons"><img src={`../src/assets/lineIcons/${line}.svg`} alt="" srcset="" /></div><span className="line-buttons-text">{line}</span></div>)
        })
        return ret
    }


    return (
        <>

            <div className="index-body row">
                <div className="btn-row-index row col-7">
                    <div className="start-button-index main-index-btns col-8" onClick={() => { generate(true) }}> <span>GENERATE<p id="katakana">-ジェネレート-</p></span></div>
                    <div className="start-button-index main-index-btns col-8" id="middle-element" data-bs-toggle="modal" data-bs-target="#lineModal" ><span>START<p id="katakana">-スタート-</p></span></div>
                    <div className="start-button-index main-index-btns col-8" onClick={() => { specifyPokemon() }}> <span>GENERATE AGAIN <p id="katakana">-オンコー-</p></span></div>
                </div>
                <div className="data-row-index row col-5">
                    <div className="poke-display-box col-10">
                        <img className="index-generated-image" src={apiLoading ? "../src/assets/pokeball spin (1).gif" : img[2]} alt="" srcset="" />

                    </div>
                    <div className="poke-ticket-display">
                        <div className="poke-ticket-inner-box">
                            <div className="poke-ticket-title">METRO TICKET<img src="../src/assets/pokeball-icon.png" className="poke-ticket-icon"></img></div>
                            <div className="poke-ticket-body row">
                                <div className="poke-ticket-left-row col-4">
                                    <div className="poke-ticket-passport">
                                        <img src={apiLoading ? "../src/assets/pokeball spin (1).gif" : img[0]} className=""></img>
                                    </div>
                                    <span div="poke-type-div"><img src={typeImg[0]} className=""></img><img src={typeImg[1]} className=""></img></span>
                                </div>
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
                                        </table></> : <></>} </div>
                            </div>
                        </div>

                    </div>
                    <div className="data-buttons-row row col-10">
                        <button type="button" className="data-button" data-bs-toggle="modal" data-bs-target="#guideModal"><span>GUIDE</span></button>
                        <button className="data-button" data-bs-toggle="modal" data-bs-target="#aboutModal"><span>ABOUT</span></button>
                    </div>
                    <div className="modal modal-dialog-scrollable fade " id="guideModal" role="dialog">
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content bg-body border-info border-3">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5">Game Guide</h1>

                                </div>
                                <div className="modal-body ">
                                    <div className="row p-3 m-3">
                                        <div className="left-row col-4 justify-content-center align-content-center">
                                            <img src="../src/assets/card-example.png" alt="" srcset="" />
                                        </div>
                                        <div className="right-row col-8 desc-box">
                                            <h2 className="text-decoration-underline">CARD TUTORIAL</h2>
                                            From top to bottom; and left to right. <br />

                                            1. Pokepoint Cost - Points required to be spent to play a card.
                                            By default, the player starts with 5. If your points are lower than the cost of the card, it cannot be played. <br /><br />

                                            2. Title - Name of Card <br /><br />

                                            3. Type - Type of card, if the target is weak to a certain type, an attack card deals more damage. Vice-versa if they are resistant to it.<br /><br />

                                            4. Description - Explains what the card does, its capabilities, restrictions and effects<br /><br />
                                        </div>
                                    </div>
                                    <div className="row p-3 m-3">
                                        <div className="right-row col-7 desc-box">
                                            <h2 className="text-decoration-underline">STATUS TUTORIAL</h2>
                                            From top to bottom; and left to right. <br />

                                            1. Pokepoint - Points spent to play a card. By default, the player starts with 5. Refills every turn. <br /><br />

                                            2. HP - If this is reduced to 0, you lose. <br /><br />

                                            3. Evo Bar - When this is full, and your pokemon has the potential, it might be able to evolve!<br /><br />

                                            4. Shield - Takes damage before going to your HP bar. Only lasts the turn it was created <br /><br />

                                            5. Status Effect - Hover for more information.

                                        </div>
                                        <div className="left-row col justify-content-center align-items-center d-flex">
                                            <img src="../src/assets/status-bar-example.png" alt="" srcset="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="aboutModal" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content bg-body border-3">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5">About</h1>
                                </div>
                                <div className="modal-body text-center fs-4">
                                    A side project made as extra OOP and React.js practice and a way to learn how to
                                    utilize local storage. Winded up taking far longer than intended.
                                    Balance is all over the place. You can view more of my projects at <a href="https://github.com/AxiomDays">my github</a> or visit my
                                    personal vanity website at <a href="https://ravennest.neocities.org/">Raven's Nest</a>.<br></br>
                                    <br></br>
                                    Know that if you're reading this, I love you. Yes, YOU reading this.
                                </div>
                                <div className="modal-footer"></div>
                            </div>
                        </div>


                    </div>
                    <div className="modal fade" id="lineModal" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content bg-body border-3">
                                <div className="modal-header mtitle">
                                    <h1 className="modal-title text-center w-100 text-white col-12">PICK A LINE
                                    </h1>
                                </div>
                                <div className="modal-header msubtitle">
                                    <span className="modal-title text-center w-100 h-50 text-black col-12 text-muted">THIS DETERMINES WHAT ENEMIES AND REWARDS YOU ENCOUNTER
                                    </span>
                                </div>
                                <div className="modal-body line-bg">
                                    <div className="container">
                                        <div className="row line-container">
                                            {createLineList()}</div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>




            </div >

        </>
    );
}

export default Index;