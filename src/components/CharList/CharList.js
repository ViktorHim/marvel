import './charList.scss';
import React, { useState, useRef, useEffect, useMemo} from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

const CharList = ({handleCharSelected}) => {
    const [charList, setCharList] = useState([]); // список персонажей
    const [offset, setOffset] = useState(210); // отступ
    const [charEnded, setCharEnded] = useState(false); // флаг конца пагинации
    const [selectedCard, SetSelectedCard] = useState(null); // индекс выбранной карточки

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        loadCharList();
    }, []);

    const cardRefs = useRef([]); // массив ссылок на карточки персонажей

    const otherContent = useMemo(() => { // определение дополниельного контента (спиннер, ошибка)
        if(loading) return <Spinner/>;
        if(error) return <Error/>;
        return null;
    }, [loading, error]);

    const handleCardClick = (cardIndex) => {
        if(cardIndex !== selectedCard && selectedCard !== null) { // если произошел клик на другую карточку с текущей убирается выделение
            cardRefs[selectedCard].classList.remove('char__item_selected');
        }

        SetSelectedCard(cardIndex);
        cardRefs[cardIndex].classList.add('char__item_selected');
    }

    const handleCardSelected = (id, cardIndex) => {
        handleCharSelected(id);
        handleCardClick(cardIndex);
    }

    const handleCharListLoaded = (list) => {
        let ended = false;

        if(list.length < 9) {
            ended = true;
        }

        setCharList((prev) => ([...prev, ...list]));
        setOffset((prev) => (prev + 9));
        setCharEnded(ended);
    }

    const loadCharList = () => {
        getAllCharacters(offset)
        .then(handleCharListLoaded)
    }

    const renderCharItems = () => {
        return charList.map(({name, thumbnail, id}, index) => 
        (                    
            <li className="char__item"
            ref={(el) => cardRefs[index] = el}
            key={id}
            onClick={() => handleCardSelected(id, index)}>
                <img src={thumbnail} alt="abyss"/>
                <div className="char__name">{name}</div>
            </li>
        )
    );
    }

    const charItems = renderCharItems();

        return (
            <div className="char__list">
                <ul className="char__grid">{charItems}</ul>
                {otherContent}
                <button className="button button__main button__long"
                disabled={loading}
                style={{display: charEnded ? 'none' : 'block'}}
                onClick={loadCharList}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

export default CharList;