import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoriesByComicId, fetchCharactersByComicId, fetchComicById, setStoriesPageNumber, setCharactersPageNumber } from '../../redux/Comics/comicsActionCreators';
import { Container, Grid, Image, Card, Pagination, Header } from 'semantic-ui-react';
import NavMenu from "../NavMenu/NavMenu";
import ComicsBanner from "./ComicsBanner";

function RenderCard({comic, characters, charactersTotalPages, stories, storiesTotalPages}) {
    const dispatch = useDispatch();

    let srcImage = `${ comic?.thumbnail?.path }.${ comic?.thumbnail?.extension }`;

    return (
        <React.Fragment>
            <Grid
                container
                centered
                style={{ background: "orange", marginRight: "12px", paddingTop: "12px" }}
                columns={4}
                divided
                doubling
            >
                <Grid.Row>
                    <Header as="h1">Comic details</Header>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Card>
                            <Image src={srcImage} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{comic.title}</Card.Header>
                            </Card.Content>
                            <Card.Content centered extra>
                                {comic.id}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Container>
                            <p style={{color: "black"}}>{comic.description}</p>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid
                container
                centered
                style={{ background: "orange", paddingLeft: "12px", marginTop: "12px" }}
                columns={1}
                divided
                doubling
            >
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Header as='h2'>Characters</Header>
                        <Grid
                            columns={3}
                            style={{ background: "#181a1b", color: "rgba(232, 230, 227, 0.87)", marginRight: "6px" }}
                            divided
                        >
                            {
                                characters &&
                                characters.map((character, index) => {
                                    let srcImage = `${character?.thumbnail?.path}.${character?.thumbnail?.extension}`;
                                    return (
                                        <Grid.Row>
                                            <Grid.Column width={4}>
                                                <Image src={srcImage} size="tiny" />
                                            </Grid.Column>
                                            <Grid.Column width={4}>
                                                <Container>
                                                    <p>{character.name}</p>
                                                </Container>
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                <Container>
                                                    <p>{character.description}</p>
                                                </Container>
                                            </Grid.Column>
                                        </Grid.Row>
                                    );
                                })
                            }
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {
                        (characters.length > 0)
                        ?
                        <Pagination 
                            totalPages={charactersTotalPages ? charactersTotalPages : 1} 
                            onPageChange={(event, data) => {
                                dispatch(setCharactersPageNumber(data.activePage - 1)); 
                                dispatch(fetchCharactersByComicId(data.activePage - 1, comic.id)); 
                            }} 
                        />
                        :
                        <p>No data.</p>
                    }
                </Grid.Row>
            </Grid>
            <Grid
                container
                centered
                style={{ background: "orange", color: "rgba(232, 230, 227, 0.87)", paddingLeft: "12px", marginTop: "12px" }}
                columns={1}
                divided
                doubling
            >
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Header as='h2'>Stories</Header>
                        <Grid
                            columns={3}
                            style={{ background: "#181a1b", marginRight: "6px" }}
                            divided
                        >
                            {
                                stories &&
                                stories.map((story, index) => {
                                    let srcImage = `${story?.thumbnail?.path}.${story?.thumbnail?.extension}`;
                                    return (
                                        <Grid.Row>
                                            <Grid.Column width={4}>
                                                {
                                                    (srcImage===null || srcImage==="" || srcImage===undefined || srcImage==="undefined.undefined") 
                                                    ?
                                                        <Image src="/images/no-img.png" size="tiny" />
                                                    :
                                                        <Image src={srcImage} size="tiny" />
                                                    
                                                }
                                            </Grid.Column>
                                            <Grid.Column width={4}>
                                                <Container>
                                                    <p>{story.title}</p>
                                                </Container>
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                <Container>
                                                    <p>{story.description}</p>
                                                </Container>
                                            </Grid.Column>
                                        </Grid.Row>
                                    );
                                })
                            }
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {
                        (stories.length > 0)
                        ?
                        <Pagination 
                            totalPages={storiesTotalPages ? storiesTotalPages : 1 }
                            onPageChange={(event, data) => {
                                dispatch(setStoriesPageNumber(data.activePage - 1)); 
                                dispatch(fetchStoriesByComicId(data.activePage - 1, comic.id)); 
                            }}
                        />
                        :
                        <p>No data. { storiesTotalPages }</p>
                    }
                </Grid.Row>
            </Grid>
        </React.Fragment>
    );
}

function ComicById(props) {
    const [comicId, setComicId] = useState(null);
    const comic = useSelector(state => state.comics.comic);
    const charactersByComic = useSelector(state => state.comics.charactersByComic);
    const charactersTotalPages = useSelector(state => state.comics.charactersTotalPages);
    const storiesByComic = useSelector(state => state.comics.storiesByComic);
    const storiesTotalPages = useSelector(state => state.comics.storiesTotalPages);
    const isLoading = useSelector(state => state.comics.isLoading);
    const errMess = useSelector(state => state.comics.errMess);
    const dispatch = useDispatch();

    useEffect(() => {
        let strPath = document.location.pathname;
        let arrTmp = strPath.split('/');
        let comicIdLocal = arrTmp[arrTmp.length - 1];

        setComicId(comicIdLocal);
        console.log(comicIdLocal);
        if (comicId === null) return;
        dispatch(fetchComicById(comicId));
        dispatch(fetchCharactersByComicId(0, comicId));
        dispatch(fetchStoriesByComicId(0, comicId));
    }, [comicId, dispatch]);
    
    return(
        <React.Fragment>
            { 
                (comic) &&
                <RenderCard 
                        key={comic.id}
                        comic={comic} 
                        characters={charactersByComic}
                        charactersTotalPages={charactersTotalPages}
                        stories={storiesByComic}
                        storiesTotalPages={storiesTotalPages}
                        isLoading={isLoading}
                        errMess={errMess}
                />
            }
        </React.Fragment>
    );
}

export default ComicById;