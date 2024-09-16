import useHttp from "../hooks/useHttp.hook";

const useMarvelService = () => {


    const API_KEY = 'f7e55a2773e7244d58f18c54c2049624';
    const API_BASE = 'https://gateway.marvel.com:443/v1/public/';
    const _baseOffset = 100;

    const { request, isLoading, hasError, clearError } = useHttp();



    const getAllCharacters = async (offset = 0) => {
        const res = await request(`${API_BASE}characters?limit=9&offset=${_baseOffset + offset}&apikey=${API_KEY}`);
        return res.data.results.map((character) => _transformCharacterData(character));
    }

    const getCharacter = async (id) => {
        const characterData = await request(`${API_BASE}characters/${id}?apikey=${API_KEY}`);
        return _transformCharacterData(characterData.data.results[0]);
    }

    const getComics = async (offset) => {
        const comicsData = await request(`${API_BASE}comics?limit=9&offset=${_baseOffset + offset}&apikey=${API_KEY}`);
        return comicsData.data.results.map((comics) => _transfromComicsData(comics));
    }

    const getComic = async (id) => {
        const comicData = await request(`${API_BASE}comics/${id}?apikey=${API_KEY}`);
        return  _transfromComicData(comicData.data.results[0]);
    }

    function _transfromComicsData(comics) {
        return {
            id: comics.id,
            title: comics.title,
            price: comics.prices[0].price,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`
        }
    }

    function _transformCharacterData(character) {
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

    function _transfromComicData (comic) {
        const price = +comic.prices[0].price > 0? `${comic.prices[0].price}$` : 'Not available';
        return {
            id: comic.id,
            title: comic.title,
            price: price,
            thumbnail: `${comic.images[0].path}.${comic.images[0].extension}`,
            description: comic.description,
            pageCount: comic.pageCount,
        }

    }

    return { getAllCharacters, getCharacter, getComics, isLoading, hasError, clearError, getComic }
}

export default useMarvelService;