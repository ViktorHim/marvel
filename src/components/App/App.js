import AppHeader from "../AppHeader/AppHeader";
import RandomChar from "../RandomChar/RandomChar";
import CharList from "../CharList/CharList";
import CharInfo from "../CharInfo/CharInfo";
import { useState } from "react";

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedChar, SetSelectedChar] = useState(null);

    const handleCharSelected = (id) => {
        SetSelectedChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList handleCharSelected={handleCharSelected}/>
                    <CharInfo charId={selectedChar}/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;