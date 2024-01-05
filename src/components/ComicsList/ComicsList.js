import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [offset, setOffset] = useState(200);
    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        loadComicsList();
    }, []);

    const otherContent = useMemo(() => { // определение дополниельного контента (спиннер, ошибка)
        if(loading) return <Spinner/>;
        if(error) return <Error/>;
        return null;
    }, [loading, error]);

    const handleComicsListLoaded = (list) => {

        let ended = false;

        if(list.length < 8) {
            ended = true;
        }

        setComicsList((prev) => [...prev, ...list]);
        setOffset(prev => prev + 9);
        setComicsEnded(ended);
    }

    const loadComicsList = () => {
        getAllComics(offset)
        .then(handleComicsListLoaded);
    }

    const renderComicsItems = () => {
        return comicsList.map(({name, thumbnail, id, price, url}, i) => (
            <li className="comics__item" key={i}>
                    <Link to={`${id}`}>
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{name}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
        ));

    }

    const comicsItems = renderComicsItems();



    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {comicsItems}
            </ul>
            {otherContent}
            <button className="button button__main button__long"
            onClick={loadComicsList}
            disabled={loading}
            style={{display: comicsEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;