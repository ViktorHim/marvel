import { Link, useParams } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import Spinner from '../../components/Spinner/Spinner'
import Error from '../../components/Error/Error'
import './singleComicPage.scss'
import { useEffect, useState } from 'react'

const SingleComicPage = () => {

    const {comicId} = useParams();
    const {loading, error, getComicById} = useMarvelService();
    const [comic, setComic] = useState(null);

    useEffect(() => {
        getComicById(comicId)
        .then(handleComicLoaded);
    }, [comicId]);

    const handleComicLoaded = (comicRes) => {
        setComic(comicRes);
    }

    let content = null;
    if(loading) {
        content = <Spinner/>;
    } else if (error) {
        content = <Error/>;
    }
    else if(comic) {
        content = <View comic={comic}/>;
    }

    return (
    <div className="single-comic">
        {content}
        <Link to="/comics" className="single-comic__back">Back to all</Link>
    </div>
    )
}

const View = ({comic}) => {
    const {thumbnail, pageCount, price, name, language, description} = comic;
    return (
        <>
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{`Language: ${language}`}</p>
                <div className="single-comic__price">{price}</div>
            </div>
        </>
    )
}

export default SingleComicPage