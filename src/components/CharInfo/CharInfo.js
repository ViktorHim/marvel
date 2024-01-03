import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import Skeleton from '../Skeleton/Skeleton';

class CharInfo extends Component{
    state = { // состояние с карточкой персонажа
        char: null,
        loading: false,
        error: false
    }

    service = new MarvelService();


    onCharLoaded = (char) => {
        this.setState({char, loading: false});
        
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    setLoading = () => {
        this.setState({loading: true});
    }

    updateChar = () => {
        const {charId} = this.props;

        if(!charId) {
            return;
        }
        this.setLoading();
        this.service
        .getCharacterById(charId)
        .then(this.onCharLoaded)
        .catch(this.onError);
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }


    render () {
        const {char, loading, error} = this.state;
        let content = null;
        if(!loading && !error && !char) {
            content = <Skeleton/>;
        }
        else if(loading) {
            content = <Spinner/>;
        } else if (error) {
            content = <Error/>;
        }
        else {
            content = <View char={char}/>;
        }

        return (
            <div className="char__info">
               {content}
            </div>
        )
    }
    
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