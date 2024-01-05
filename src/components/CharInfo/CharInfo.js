import './charInfo.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import Skeleton from '../Skeleton/Skeleton';

const CharInfo = ({charId}) => {
    const [character, setCharacter] = useState(null);
    const {loading, error, getCharacterById} = useMarvelService();

    useEffect(() => {
        const updateChar = () => {
            if(!charId) {
                return;
            }

            getCharacterById(charId)
            .then(handleCharLoaded)
        }

        updateChar();
    }, [charId]);

    const handleCharLoaded = (char) => {
        setCharacter(char);
    }

    let content = null;
    if(!loading && !error && !character) {
        content = <Skeleton/>;
    }
    else if(loading) {
        content = <Spinner/>;
    } else if (error) {
        content = <Error/>;
    }
    else {
        content = <View char={character}/>;
    }

    return (
        <div className="char__info">
            {content}
        </div>
    )
}

const View = ({char}) =>{
    let {name, description, thumbnail, homepage, wiki, comics} = char;
    if(!description) {
        description = 'none';
    }
    return (
        <>
         <div className="char__basics">
                    <img src={thumbnail} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : 'no comics'}
                    {
                        comics.slice(0, 10).map((item,i) => 
                        (                    
                        <li className="char__comics-item"
                        key={i}>
                            {item.name}
                        </li>
                    ))
                    }
                </ul>
        </>
    );
}

export default CharInfo;