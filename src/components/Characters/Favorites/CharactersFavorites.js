import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Card, Image, Header } from "semantic-ui-react";
import NavMenu from "../../NavMenu/NavMenu";
import CharactersBanner from "./../CharactersBanner";
import { setActiveMenu } from '../../../redux/NavMenu/navmenuActionCreators';
import * as MenuOptions from '../../../data/navmenuOptions';
import NoData from "../../Utils/NoDataComponent";
import NoMoreData from "../../Utils/NoMoreDataComponent";
import CharacterFavoriteCard from './CharacterFavoriteCard';

function CharactersFavorites(props) {
    const charactersFavorites = useSelector(state => state.characters.charactersFavorites);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveMenu(MenuOptions.characterfavorites));
    }, []);

    return(
        <React.Fragment>
            <NavMenu />
            <CharactersBanner />
            <Grid
                container
                centered
                style={{ background: "orange" }}
                columns={4}
                divided
                doubling
            >
                <Grid.Row>
                    <Header as='h2'>Favorite characters</Header>
                </Grid.Row>
                <Grid.Row>
                    {
                        charactersFavorites.map((character, index) => {
                            return (
                                <Grid.Column key={character.id}>
                                    <CharacterFavoriteCard
                                        character={character}
                                    />
                                </Grid.Column>
                            );
                        })
                    }
                </Grid.Row>
                <Grid.Row>
                    <NoData show={charactersFavorites.length === 0} />
                    <NoMoreData show={charactersFavorites.length > 0} />
                </Grid.Row>
            </Grid>
        </React.Fragment>
    );
}

export default CharactersFavorites;