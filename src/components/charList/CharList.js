import { Component, createRef } from 'react';

import './charList.scss';
import Spinner from '../Spinner/Spinner';
import MarvelService from '../services/MarvelService';

class CharList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            characters: [],
            error: false,
            offset: 0,
            isLoadingMore: false,
        }
        this.marvelService = new MarvelService();
        this.elements = [];
    }

    componentDidMount() {
        this.loadCharacters();
       
    }

    createRef = (elem) => {
        this.elements.push(elem);        
    }

    onCharListLoaded = (newCharacters) => {
        this.setState(({ characters }) => ({
            loading: false,
            isLoadingMore: false,
            characters: [...characters, ...newCharacters]
        }))
    }

    onLoadMoreButtonClick = () => {
        this.setState(({ offset }) => ({
            offset: offset + 9,
            isLoadingMore: true,
        }), () => this.loadCharacters())
    }

    loadCharacters = () => {
        const offset = this.state.offset;
        this.marvelService.getAllCharacters(offset).then(this.onCharListLoaded).catch(this.onError);
    }

    onError = () => {
        this.setState({
            loading: false,
            characters: null,
            erorr: true
        })

    }

    onClickHandler = (id) => {
        this.props.charUpdateHandler(id);
        this.elements.forEach((element) => element.classList.remove('char__item_selected'))

    }

    render = () => {
        const { loading, characters, error } = this.state;
        const loader = loading ? <Spinner /> : null;
        const errorMessage = error ? 'Error' : null;
        const charList = !(loading || error) ? <View createRefCallBack = {this.createRef} characters={characters} onClickHandler={this.onClickHandler} onLoadMoreButtonClick={this.onLoadMoreButtonClick} buttonDisable={this.state.isLoadingMore} /> : null;
        return (
            <>
                {loader}
                {errorMessage}
                {charList}
            </>
        )

    }
}


const View = ({ createRefCallBack, characters, onClickHandler, onLoadMoreButtonClick, buttonDisable }) => {
    const charactersList = characters.map(character => {
        const noImage = character.thumbnail.includes('not_available');
        const objectFit = { 'objectFit': noImage ? 'contain' : 'cover' };
        const onClick = (e) => {
            onClickHandler(character.id);
            const li = e.target.closest('li');
            li.classList.add('char__item_selected');
        }
        return (
            <li ref = {createRefCallBack} className="char__item" tabIndex="0" key={character.id} onClick={onClick}>
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