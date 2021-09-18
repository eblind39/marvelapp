import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Card, Image, Header } from "semantic-ui-react";
import NavMenu from "../NavMenu/NavMenu";
import ComicsBanner from "./ComicsBanner";
import { setActiveMenu } from '../../redux/NavMenu/navmenuActionCreators';
import * as MenuOptions from '../../data/navmenuOptions';

function RenderCard({comic}) {
    let srcImage = `${ comic.thumbnail.path }.${ comic.thumbnail.extension }`;

    return (
        <Card className="comic-card-default-height">
            <Image as={Link} to={`/comics/${comic.id}`} src={srcImage} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{comic.name}</Card.Header>
                <Card.Meta>
                </Card.Meta>
                <Card.Description className="limit-text-words">
                    {comic.description}
                </Card.Description>
            </Card.Content>
            <Card.Content centered extra>
                {comic.id}
            </Card.Content>
        </Card>
    );
}

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
                                <Grid.Column>
                                    <RenderCard
                                        key={comic.id}
                                        comic={comic}
                                    />
                                </Grid.Column>
                            );
                        })
                    }
                </Grid.Row>
            </Grid>

            {
                comicsFavorites.length === 0 && 
                <p>No data</p>
            }

            {
                comicsFavorites.length > 0  && 
                <p className='text-center my-10' style={{ marginTop: '3em', marginBottom: '3em', zIndex: 899, color: '#9a0d2e' }}>No more data... ♥</p>
            }
        </React.Fragment>
    );
}

export default ComicsFavorites;