import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import decoration from '../../resources/img/vision.png';
import { useState } from 'react';

const MainPage = () => {

    const [selectedCharID, setSelectedCharId] = useState(null)

    const updateCharIdHandler = (id) => {
        setSelectedCharId(id)
    }


    return (
        <>
        <RandomChar />
                <div className="char__content">
                    <CharList charUpdateHandler={updateCharIdHandler} />
                    <ErrorBoundary>
                        <CharInfo charID={selectedCharID} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;