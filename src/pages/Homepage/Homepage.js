import { useState } from "react";

import RandomChar from "../../components/RandomChar/RandomChar"
import CharList from "../../components/CharList/CharList"
import CharInfo from "../../components/CharInfo/CharInfo"

import decoration from "../../resources/img/vision.png"


const Homepage = () => {

    const [selectedChar, SetSelectedChar] = useState(null);

    const handleCharSelected = (id) => {
        SetSelectedChar(id);
    }

  return (
    <>
        <RandomChar/>
        <div className="char__content">
            <CharList handleCharSelected={handleCharSelected}/>
            <CharInfo charId={selectedChar}/>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}

export default Homepage