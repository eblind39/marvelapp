import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import CharactersIndex from "../Characters/CharactersIndex";
import CharacterById from '../Characters/CharacterById';
import CharactersFavorites from "../Characters/CharactersFavorites";
import ComicsIndex from "../Comics/ComicsIndex";
import ComicById from '../Comics/ComicById';
import ComicsFavorites from '../Comics/ComicsFavorites';
import Home from "../Home/HomeComponent";

class Main extends Component {

    render() {
        const CharacterByIdRoute = ({match}) => {
            return (
                <CharacterById 
                    characterId={parseInt(match.params.characterId, 10)}
                />
            );
        }

        const ComicByIdRoute = ({match}) => {
            return (
                <ComicById 
                    characterId={parseInt(match.params.comicId, 10)}
                />
            );
        }

        return(
            <div>
                <Switch>
                    <Route path="/home" component={() => <Home />} />
                    <Route exact path="/characters" component={() => <CharactersIndex />} />
                    <Route exact path="/characters/:characterId" component={CharacterByIdRoute} />
                    <Route exact path="/charactersfavorites" component={CharactersFavorites} />
                    <Route exact path="/comics" component={() => <ComicsIndex />} />
                    <Route exact path="/comics/:comicId" component={ComicByIdRoute} />
                    <Route exact path="/comicsfavorites" component={ComicsFavorites} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }

}

export default withRouter(Main);