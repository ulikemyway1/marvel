import { Component } from 'react';
import './charInfo.scss';
import MarvelService from '../services/MarvelService';
import Spinner from '../Spinner/Spinner';

class CharInfo extends Component {

    constructor(props) {
        super(props);
        this.marvelService = new MarvelService();
        this.state = {
            char: null,
            loading: true,
        }
    }

    componentDidMount() {
        this.updateChar(this.props.charID);
    }

    updateChar = (id) => {
        if (!id) id = '1010912';
        this.setState({
            loading: true,
        })
        this.marvelService.getCharacter(id).then(this.onCharUpdate).catch(this.onError);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.charID !== this.props.charID) {
            this.updateChar(this.props.charID);
        }
    }

    onCharUpdate = (charInfo) => {
        this.setState({
            char: charInfo,
            loading: false,
        })
    }

    onError = () => {
        console.log('Can not fetch')
    }

    render = () => {
        return (

            <div className="char__info">
                {this.state.loading ? <Spinner /> : <View props={this.state.char} />}
            </div>

        )
    }

}

export default CharInfo;

const View = ({ props }) => {
    let comicsList = 'No comics';
    if (props.comics.length > 0)
    props.comics.map((comic, index) => {
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