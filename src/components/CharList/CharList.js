import './charList.scss';
import React, { useState, useRef, useEffect, useMemo} from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

const CharList = ({onCharSelected}) => {

    const [charList, setCharList] = useState([]); // список персонажей
    const [offset, setOffset] = useState(210); // отступ
    const [loading, setLoading] = useState(true); // загрузка
    const [error, setError] = useState(false); // ошибка
    const [charEnded, setCharEnded] = useState(false); // флаг конца пагинации
    const [selectedCard, SetSelectedCard] = useState(null); // индекс выбранной карточки

    useEffect(() => {
        loadList();
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

    const onCardSelected = (id, cardIndex) => {
        onCharSelected(id);
        handleCardClick(cardIndex);
    }

    const onListLoaded = (list) => {
        let ended = false;

        if(list.length < 9) {
            ended = true;
        }

        setCharList((prev) => ([...prev, ...list]));
        setOffset((prev) => (prev + 9));
        setLoading(false);
        setCharEnded(ended);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const loadList = (offset) => {
        const service = new MarvelService();

        setLoading(true);

        service
        .getAllCharacters(offset)
        .then(onListLoaded)
        .catch(onError);
    }

    const renderCharItems = () => {
        return charList.map(({name, thumbnail, id}, index) => 
        (                    
            <li className="char__item"
            ref={(el) => cardRefs[index] = el}
            key={id}
            onClick={() => onCardSelected(id, index)}>
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
                onClick={() => loadList(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

export default CharList;