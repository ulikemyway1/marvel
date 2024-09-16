import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorrMessage from '../ErrorMessage/ErrorMessage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ComicsList = () => {

    const { getComics, isLoading, hasError } = useMarvelService();
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0)
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(() => {
        const fetchNewComics = async () => {
            const newComics = await getComics(offset);
            setComics((comics) => [...comics, ...newComics]);
            setIsLoadingMore(false);
        }
        fetchNewComics();
    }, [offset])

    const loadMoreComics = () => {
        setOffset((offset) => offset + 9);
        setIsLoadingMore(true);
    }

    const errorMessage = hasError ? <ErrorrMessage /> : null;
    const view = !hasError && comics.length > 0 ? <View comics={comics} buttonClickHandler={loadMoreComics} isLoadingMore={isLoadingMore} /> : null;
    const loader = isLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            <h2 style={{ textAlign: 'center', padding: '40px' }}>See some Comics!</h2>
            {view}
            {errorMessage}
            {loader}

        </div>
    )
}

const View = ({ comics, buttonClickHandler, isLoadingMore }) => {

    return (
        <>
            <ul className="comics__grid">
                {comics.map((comicsItem) => {
                    return (<li key={comicsItem.id} className="comics__item">
                        <Link to={`/comics/${comicsItem.id}`}>
                            <img src={comicsItem.thumbnail} alt={comicsItem.title} className="comics__item-img" />
                            <div className="comics__item-name">{comicsItem.title}</div>
                            <div className="comics__item-price">{comicsItem.price}$</div>
                        </Link>
                    </li>)
                })}


            </ul>
            <button className="button button__main button__long" onClick={buttonClickHandler} disabled={isLoadingMore}>
                <div className="inner">load more</div>
            </button>
        </>
    )
}

export default ComicsList;