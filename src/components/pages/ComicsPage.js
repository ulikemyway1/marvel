import ComicsList from '../comicsList/ComicsList';
import decoration from '../../resources/img/vision.png';

const ComicsPage = () => {
    return (
        <>
         <ComicsList />
         <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default ComicsPage;