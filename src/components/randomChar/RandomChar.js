import { useState, useEffect } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorrMessage from '../ErrorMessage/ErrorMessage';

const RandomChar = () => {

    const [character, setCharacter] = useState(null);
    const { getCharacter, isLoading, hasError, clearError } = useMarvelService();

    const onCharLoaded = (character) => {
        setCharacter(character);
    }


    useEffect(() => updateCharacter(), [])

    const updateCharacter = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id).then(onCharLoaded);
    }



    const characterView = !(isLoading || hasError) && character ? <View character={character} /> : null;
    const loader = isLoading ? <Spinner /> : null;
    const errorMessage = hasError ? <ErrorrMessage /> : null;
    return (
        <div className="randomchar">
            {loader}
            {characterView}
            {errorMessage}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateCharacter}>
                    <div className="inner" >try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )

}

const View = ({ character }) => {
    const { name, description, thumbnail, homepage, wiki } = character;
    const imgNotFound = thumbnail.includes('not_available');
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={imgNotFound ? 'randomchar__img-not-found' : 'randomchar__img'} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;