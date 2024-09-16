import './singleComicPage.scss';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import ErrorrMessage from '../ErrorMessage/ErrorMessage';

const SingleComicPage = () => {
    const { id } = useParams();
    const [comic, setComic] = useState(null);

    useEffect(() => {
        updateComic(id)
    }, [id]);

    const updateComic = async (comicID) => {
        clearError();
        const comicInfo = await getComic(id);
        setComic(comicInfo);
    }

    const { isLoading, hasError, getComic, clearError } = useMarvelService();

    const loader = isLoading ? <Spinner /> : null;
    const errorMessage = hasError ? <ErrorrMessage /> : null;
    const view = comic ? <View comic={comic} /> : null;
    return (
        <>
            {loader}
            {errorMessage}
            {view}
        </>

    )

}

const View = ({ comic }) => {

    return (
        <div className="single-comic">
            <img src={comic.thumbnail} alt={comic.title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comic.title}</h2>
                <p className="single-comic__descr">{comic.description}</p>
                <p className="single-comic__descr">Pages count: {comic.pageCount}</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{comic.price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;