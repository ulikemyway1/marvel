import { useState } from 'react';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import decoration from '../../resources/img/vision.png';

const App = () => {

    const [selectedCharID, setSelectedCharId] = useState(null)

    const updateCharIdHandler = (id) => {
        setSelectedCharId(id)
    }


    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar />
                <div className="char__content">
                    <CharList charUpdateHandler={updateCharIdHandler} />
                    <ErrorBoundary>
                        <CharInfo charID={selectedCharID} />
                    </ErrorBoundary>

                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )

}

export default App;