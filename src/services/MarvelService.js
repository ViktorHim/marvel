class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=b69f3e5e4a94d353acb84b176360823c1';

    getData = async (url) => {
        try {
            const response = await fetch(url);

            if(!response.ok) {
                throw new Error(`could not fetch ${url}, status: ${response.status}`);
            }
    
            return await response.json();
        }
        catch {
            throw new Error('went something wrong :(');
        }
    }

    getAllCharacters = async (limit = 9, offset = 210) => {
        const url = `${this._apiBase}characters?limit=${limit}&offset=${offset}&${this._apiKey}`;
        const characters  = await this.getData(url);

        return characters.data.results.map(this._transformCharacter);
        
    }

    getCharacterById = async (id) => {
        const url = `${this._apiBase}characters/${id}?${this._apiKey}`
        const character = await this.getData(url);
        return this._transformCharacter(character.data.results[0]);
    }

    _transformCharacter = (character) => {
            return {
                        name: character.name,
                        description: character.description,
                        thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
                        homepage: character.urls[0].url,
                        wiki: character.urls[1].url
                    }
    }
}

export default MarvelService;