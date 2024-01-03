import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

class CharList extends Component{

    state = {
        charList: [], // список персонажей
        offset: 210, // отстут
        loading: true, // загрузка
        error: false, // ошибка
        charEnded: false // флаг конца пагинации
    }

    service = new MarvelService();

    setLoading = () => {
        this.setState({loading: true});
    }

    onListLoaded = (list) => {
        let ended = false;

        if(list.length < 9) {
            ended = true;
        }

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...list],
            loading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    loadList = (offset) => {
        this.setLoading();
        this.service.getAllCharacters(offset)
        .then(this.onListLoaded)
        .catch(this.onError);
    }

    componentDidMount () {
        this.loadList();
    }

    render() {
        const {charList, loading,error, offset, charEnded} = this.state;
        let content = null;

        if(loading) {
            content = <Spinner/>;
        } else if (error) {
            content = <Error/>;
        }
        else {
            content = null;
        }

        return (
            <div className="char__list">
                    <ul className="char__grid">
                            {charList.map(({name, thumbnail, id}) => 
                            (                    
                            <li className="char__item"
                            key={id}
                            onClick={() => this.props.onCharSelected(id)}>
                                <img src={thumbnail} alt="abyss"/>
                                <div className="char__name">{name}</div>
                            </li>
                        )
                        )}
                        </ul>
                        {content}
                
                <button className="button button__main button__long"
                disabled={loading}
                style={{display: charEnded ? 'none' : 'block'}}
                onClick={() => this.loadList(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
   
}

export default CharList;