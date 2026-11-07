import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Home.css";
import CadeuxReward from "./CadeuxReward";
import Decklist from "./Decklist";
import { useEffect } from "react";
import PlayerStatBar from "./PlayerStatBar";

function Home({ changeStateFunc, player, deck, game, png, typePNG }) {
    const [count, setCount] = useState(0);
    useEffect(() => { player.reset() }, [])


    return (
        <>
            <div className="container-fluid p-2">
                <div className="card-box-reward row" id="home-box">
                    <div className="button-background col-3"> <span className="start-button-home" id="" onClick={() => { changeStateFunc(3) }}>return</span></div>
                    <PlayerStatBar player={game.player} enem={game.enem} deck={deck} game={game} />
                    <div className="button-background col-3"><span className="start-button-home col-3" onClick={() => { changeStateFunc(1) }}>continue</span></div>
                    <Decklist deck={deck} player={player} isDeleting={false} png={png} typePNG={typePNG} />
                </div>
            </div>
        </>
    );
}

export default Home;