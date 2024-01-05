import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useState, useEffect, useMemo } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

const RandomChar = () => {
    const [character, setCharacter] = useState({});
    const {loading, error, getCharacterById, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, []);

    const content = useMemo(() => {
        if(loading) return  <Spinner/>;
        if (error) return <Error/>;
        return <View char={character}/>;
    }, [loading, error, character]);

    const handleCharLoaded = (char) => {
        setCharacter(char);
    }

    const getRandomId = () => {
        return Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    }

    const updateChar = () => {
        clearError();
        const id = getRandomId();
        getCharacterById(id)
        .then(handleCharLoaded)
    }

        return (
            <div className="randomchar">
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                    onClick={updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
}

const View = ({char}) => {
    let {name, description, thumbnail, homepage, wiki} = char;

    if(!description) {
        description = 'none';
    } else if(description.length > 200) {
        description = `${description.substr(0, 200)}...`;
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomChar;