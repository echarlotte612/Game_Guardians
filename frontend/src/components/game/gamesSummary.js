import React, { Component } from 'react';
import Images from '../images/gameImages/images';
import axios from 'axios';
import './games.css'
import { startSession } from 'mongoose';

export default class Games extends React.Component{
    constructor(props) {
        super(props);
        this.getGames = this.getGames.bind(this);
        this.state = {
            games: [],
            isLoaded: null,
        }
    }
    getGames() {
        axios.get('http://localhost:5000/games',{})
        .then(res => {
            this.setState({games: res.data})})
        .catch((error) => {
            console.log(error)
        })
    }
    componentDidMount(){
        // this.getGames()
        if (this.state.games.length == 0) {this.getGames()}
    }

    render() {

        return (
            <div className="gamesList">
            <h2>{this.state.games.map((game, index) => {
                return <ul><a href={`/game`} key={index}>
                            <li className="gamesLogo"><Images id = {game._id}/></li>
                            <li className="gamesListTitle">{game.title}</li>
                            <li>{game.short_desc}</li>
                            <li>PEGI: {game.pegi}</li>
                        </a></ul>
            })}</h2>
            </div>
        )
    }
}