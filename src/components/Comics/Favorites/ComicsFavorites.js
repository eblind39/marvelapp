import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Header } from "semantic-ui-react";
import NavMenu from "../../NavMenu/NavMenu";
import ComicsBanner from "./../Banner/ComicsBanner";
import { setActiveMenu } from '../../../redux/NavMenu/navmenuActionCreators';
import * as MenuOptions from '../../../data/navmenuOptions';
import NoDataFound from "../../Utils/NoDataFoundComponent";
import NoMoreData from "../../Utils/NoMoreDataComponent";
import ComicFavoriteCard from "./ComicFavoriteCard";

function ComicsFavorites(props) {
    const comicsFavorites = useSelector(state => state.comics.comicsFavorites);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveMenu(MenuOptions.comicfavorites));
    }, []);

    return(
        <React.Fragment>
            <NavMenu />
            <ComicsBanner />
            <Grid
                container
                centered
                style={{ background: "orange" }}
                columns={4}
                divided
                doubling
            >
                <Grid.Row>
                    <Header as='h2'>Favorite comics</Header>
                </Grid.Row>
                <Grid.Row>
                    {
                        comicsFavorites.map((comic, index) => {
                            return (
                                <Grid.Column key={comic.id}>
                                    <ComicFavoriteCard
                                        comic={comic}
                                    />
                                </Grid.Column>
                            );
                        })
                    }
                </Grid.Row>
                <Grid.Row>
                    <NoDataFound showif={comicsFavorites.length === 0} />
                    <NoMoreData showif={comicsFavorites.length > 0} />
                </Grid.Row>
            </Grid>

        </React.Fragment>
    );
}

export default ComicsFavorites;