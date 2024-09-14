import { useState, useRef, useEffect } from 'react';

import './charList.scss';
import Spinner from '../Spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

const CharList = ({charUpdateHandler}) => {

    console.log('render')
    const {getAllCharacters, isLoading, hasError, clearError } =  useMarvelService();
    const [characters, setCharacters] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    useEffect(loadCharacters, [])
    useEffect(loadCharacters, [offset])

    const refs = useRef([]);

    const createRef = (ref, i) => {
        refs.current[i] = ref;
    }

    const onCharListLoaded = (newCharacters) => {
        setCharacters([...characters, ...newCharacters])
    }

    const onLoadMoreButtonClick = () => {
        setOffset(offset => offset + 9);
        setIsLoadingMore(true)
    }

    function loadCharacters() {
        getAllCharacters(offset).then(onCharListLoaded);
    }

   
    const onClickHandler = (id) => {
        charUpdateHandler(id);
        refs.current.forEach((element) => element.classList.remove('char__item_selected'))

    }

    const loader = isLoading ? <Spinner /> : null;
    const errorMessage = hasError ? 'Error' : null;
    const charList = !(isLoading || hasError) ?
        <View createRefCallBack={createRef}
            characters={characters}
            onClickHandler={onClickHandler}
            onLoadMoreButtonClick={onLoadMoreButtonClick}
            buttonDisable={isLoadingMore} /> : null;
    return (
        <>
            {loader}
            {errorMessage}
            {charList}
        </>
    )

}


const View = ({ createRefCallBack, characters, onClickHandler, onLoadMoreButtonClick, buttonDisable }) => {
    const charactersList = characters.map((character, index) => {
        const noImage = character.thumbnail.includes('not_available');
        const objectFit = { 'objectFit': noImage ? 'contain' : 'cover' };
        const onClick = (e) => {
            onClickHandler(character.id);
            const li = e.target.closest('li');
            li.classList.add('char__item_selected');
        }
        return (
            <li ref={(e) => createRefCallBack(e, index)} className="char__item" tabIndex="0" key={character.id} onClick={onClick}>
                <img src={character.thumbnail} alt={character.name} style={objectFit} />
                <div className="char__name">{character.name}</div>
            </li>
        )

    })
    return (
        <div className="char__list">
            <ul className="char__grid">
                {charactersList}
            </ul>
            <button className="button button__main button__long" onClick={onLoadMoreButtonClick} disabled={buttonDisable}>
                <div className="inner" >load more</div>
            </button>
        </div>
    )

}

export default CharList;