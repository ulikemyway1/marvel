import { useState, useEffect } from 'react';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';

const CharInfo = ({ charID }) => {


    const { getCharacter, isLoading, hasError, clearError } = useMarvelService();
    const [char, setChar] = useState(null);
    const [itIsIntialLoading, setItIsInitialLodaing] = useState(true);

    useEffect(() => updateChar(charID), [charID]);

    const updateChar = (id) => {
        if (!id) id = '1010912';
        getCharacter(id).then(onCharUpdate);
    }

    const onCharUpdate = (charInfo) => {
        setChar(charInfo);
        setItIsInitialLodaing(false);
    }

    return (

        <div className="char__info">
            {(itIsIntialLoading || isLoading) ? <Spinner /> : <View props={char} />}
        </div>

    )
}

export default CharInfo;

const View = ({ props }) => {
    let comicsList = 'No comics';
    if (props.comics.length > 0)
        comicsList = props.comics.map((comic, index) => {
            while (index < 10)
                return (
                    <li key={index} className="char__comics-item">
                        {comic.name}
                    </li>
                )
            return null;
        })

    return (
        <>
            <div className="char__basics">
                <img src={props.thumbnail} alt={props.name} />
                <div>
                    <div className="char__info-name">{props.name}</div>
                    <div className="char__btns">
                        <a href={props.homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={props.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {props.description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList}
            </ul>
        </>
    )
}