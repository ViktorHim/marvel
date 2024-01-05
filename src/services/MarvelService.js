import useHttp from "../hooks/useHttp";

const  useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=b69f3e5e4a94d353acb84b176360823c';

    const CHARACTERS_PER_PAGE = 9;
    const CHARACTERS_OFFSET = 210;
    const COMICS_PER_PAGE = 8;
    const COMICS_OFFSET = 0;

    const {request, loading, error, clearError} = useHttp();

    const getAllCharacters = async (offset = CHARACTERS_OFFSET, limit = CHARACTERS_PER_PAGE) => {
        const url = `${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`;
        const characters = await request(url);
        return characters.data.results.map(_transformCharacter);
        
    }

    const getCharacterById = async (characterId) => {
        const url = `${_apiBase}characters/${characterId}?${_apiKey}`;
        const character = await request(url);
        return _transformCharacter(character.data.results[0]);
    }

    const getAllComics = async (offset = COMICS_OFFSET, limit = COMICS_PER_PAGE) => {
        const url = `${_apiBase}comics?limit=${limit}&offset=${offset}&${_apiKey}`;
        const comics = await request(url);
        return comics.data.results.map(_transformComic);
    }

    const getComicById = async (comicId) => {
        const url = `${_apiBase}comics/${comicId}?${_apiKey}`;
        const comic = await request(url);
        return _transformComic(comic.data.results[0]);
    }

    const _transformCharacter = (character) => {
            return {
                        name: character.name,
                        description: character.description,
                        thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
                        homepage: character.urls[0].url,
                        wiki: character.urls[1].url,
                        id: character.id,
                        comics: character.comics.items
                    }
    }

    const _transformComic = (comic) => {
        return {
                    id: comic.id,
                    name: comic.title,
                    price: comic.prices.price,
                    thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
                    url: comic.urls[0].url
                }
    }

    return{loading, error, getAllCharacters, getCharacterById, getAllComics, getComicById, clearError};
}

export default useMarvelService;