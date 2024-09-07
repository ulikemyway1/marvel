class MarvelService {

    constructor() {
        this.API_KEY = 'f7e55a2773e7244d58f18c54c2049624';
        this.API_BASE = 'https://gateway.marvel.com:443/v1/public/';
        this._baseOffset = 100;
    }

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(res.status);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = 0) => {
        const res = await this.getResource(`${this.API_BASE}characters?limit=9&offset=${this._baseOffset + offset}&apikey=${this.API_KEY}`);
        return res.data.results.map((character) => this._transformCharacterData(character));
    }

    getCharacter = async (id) => {
        const characterData = await this.getResource(`${this.API_BASE}characters/${id}?apikey=${this.API_KEY}`);
        return this._transformCharacterData(characterData.data.results[0]);
    }

    _transformCharacterData(character) {
        return {
            comics: character.comics.items,
            id: character.id,
            name: character.name,
            description: character.description ? `${character.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
        }
    }
}

export default MarvelService;