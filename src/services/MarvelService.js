import useHttp from "../hooks/useHttp";

const  useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=b69f3e5e4a94d353acb84b176360823c';
    const {request, loading, error, clearError} = useHttp();

    const getAllCharacters = async (offset = 210, limit = 9) => {
        const url = `${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`;
        const characters = await request(url);

        return characters.data.results.map(_transformCharacter);
        
    }

    const getCharacterById = async (id) => {
        const url = `${_apiBase}characters/${id}?${_apiKey}`
        const character = await request(url);
        return _transformCharacter(character.data.results[0]);
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

    return{loading, error, getAllCharacters, getCharacterById, clearError};
}

export default useMarvelService;