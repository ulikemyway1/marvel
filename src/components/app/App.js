import { Component } from 'react';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary  from '../errorBoundary/ErrorBoundary';
import decoration from '../../resources/img/vision.png';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCharID: null,
        }
    }

    updateCharIdHandler = (id) => {
        this.setState({
            selectedCharID: id,
        })
    }

    render = () => {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList charUpdateHandler={this.updateCharIdHandler}/>
                        <ErrorBoundary>
                        <CharInfo charID={this.state.selectedCharID}/>
                        </ErrorBoundary>

                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    } 
}

export default App;