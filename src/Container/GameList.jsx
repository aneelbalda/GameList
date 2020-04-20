import React, { Component } from 'react'
import { connect } from 'react-redux';
import GameList from '../Component/GameList'
import { getGameList } from '../Reducer/GameReducer';
import { getApiStatus } from '../Reducer/ApiStatusReducer';
import * as gameAction from '../Action/GameActions';

const mapStateToProps = (state, props) => ({
    gameListApiStatus: getApiStatus(state, 'gameApiStatus'),
    gameList: getGameList(state),
});

const mapDispatchToProps = {
    fetchGameList: gameAction.fetchGameList,
}

class GameListContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameList: []
        }
    }
    componentDidMount() {
        const { fetchGameList } = this.props;
        fetchGameList();
    }

    render() {
        const { gameList, gameListApiStatus } = this.props;
        return (
            <GameList 
                gameList={gameList} 
                gameListApiStatus={gameListApiStatus} 
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameListContainer);