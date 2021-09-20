import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacterById, fetchComicsByCharacterId, fetchStoriesByCharacterId, setComicsPageNumber, setStoriesPageNumber } from '../../redux/Characters/charactersActionCreators';
import { Container, Grid, Image, Card, Pagination, Header, Button, Icon } from 'semantic-ui-react';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import NavMenu from "../NavMenu/NavMenu";
import CharactersBanner from "./CharactersBanner";

function RenderCard({character, comics, comicsTotalPages, stories, storiesTotalPages}) {
    const history = useHistory();
    const dispatch = useDispatch();

    let srcImage = `${ character?.thumbnail?.path }.${ character?.thumbnail?.extension }`;

    return (
        <React.Fragment>
            <Grid
                container
                centered
                style={{ background: "orange", marginRight: "12px", marginTop: "12px" }}
                columns={4}
                divided
                doubling
            >
                <Grid.Row
                    style={{ background: "#181a1b", color: "rgba(232, 230, 227, 0.87)", margin: "12px" }}
                >
                    <Grid.Column width={6}>
                        <Button 
                            as='div' 
                            labelPosition='right'
                            onClick={(e) => { history.goBack(); }}>
                            <Button icon>
                                <Icon name='chevron left' />
                                {' Back'}
                            </Button>
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={10} centered style={{ margin: "0 auto" }}>
                        <Header as="h1">Character details</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Card>
                            <Image src={srcImage} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{character.name}</Card.Header>
                            </Card.Content>
                            <Card.Content centered extra>
                                {character.id}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Container>
                            <p style={{color: "black"}}>{character.description}</p>
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
                        
                        <Grid
                            columns={3}
                            style={{ background: "#181a1b", color: "rgba(232, 230, 227, 0.87)", marginRight: "6px" }}
                            divided
                        >
                            <Grid.Row centered>
                                <Header as='h2'>Comics</Header>
                            </Grid.Row>
                            {
                                (comics.length > 0) &&
                                <Grid.Row>
                                    <Grid.Column width={4}></Grid.Column>
                                    <Grid.Column width={4}>
                                        <Container>
                                            <Header as="h4">Title</Header>
                                        </Container>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Container>
                                            <Header as="h4">Description</Header>
                                        </Container>
                                    </Grid.Column>
                                </Grid.Row>
                            }
                            {
                                comics &&
                                comics.map((comic, index) => {
                                    let srcImage = `${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`;
                                    return (
                                        <Grid.Row>
                                            <Grid.Column width={4}>
                                                <Image as={Link} to={`/comics/${comic.id}`} src={ srcImage } size="tiny" />
                                            </Grid.Column>
                                            <Grid.Column width={4}>
                                                <Container>
                                                    <p>{comic.title}</p>
                                                </Container>
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                <Container>
                                                    <p>{comic.description}</p>
                                                </Container>
                                            </Grid.Column>
                                        </Grid.Row>
                                    );
                                })
                            }
                            <Grid.Row centered>
                                {
                                    (comics.length > 0)
                                        ?
                                        <Pagination
                                            totalPages={comicsTotalPages}
                                            onPageChange={(event, data) => {
                                                dispatch(setComicsPageNumber(data.activePage - 1));
                                                dispatch(fetchComicsByCharacterId(data.activePage - 1, character.id));
                                            }}
                                        />
                                        :
                                        <p>No data.</p>
                                }
                            </Grid.Row>
                        </Grid>
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
                        <Grid
                            columns={3}
                            style={{ background: "#181a1b", color: "rgba(232, 230, 227, 0.87)", marginRight: "6px", marginTop: "12px", marginBottom: "12px" }}
                            divided
                        >
                            <Grid.Row centered>
                                <Header as='h2'>Stories</Header>
                            </Grid.Row>
                            {
                                (stories.length > 0) &&
                                <Grid.Row>
                                    <Grid.Column width={4}></Grid.Column>
                                    <Grid.Column width={4}>
                                        <Container>
                                            <Header as="h4">Title</Header>
                                        </Container>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Container>
                                            <Header as="h4">Description</Header>
                                        </Container>
                                    </Grid.Column>
                                </Grid.Row>
                            }
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
                            <Grid.Row centered>
                                {
                                    (stories.length > 0)
                                    ?
                                    <Pagination 
                                        totalPages={storiesTotalPages}
                                        onPageChange={(event, data) => {
                                            dispatch(setStoriesPageNumber(data.activePage - 1)); 
                                            dispatch(fetchStoriesByCharacterId(data.activePage - 1, character.id)); 
                                        }}
                                    />
                                    :
                                    <p>No data.</p>
                                }
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </React.Fragment>
    );
}

function CharacterById(props) {
    const [characterId, setCharacterId] = useState(null);
    const character = useSelector(state => state.characters.character);
    const comicsByCharacter = useSelector(state => state.characters.comicsByCharacter);
    const comicsTotalPages = useSelector(state => state.characters.comicsTotalPages);
    const storiesByCharacter = useSelector(state => state.characters.storiesByCharacter);
    const storiesTotalPages = useSelector(state => state.characters.storiesTotalPages);
    const isLoading = useSelector(state => state.characters.isLoading);
    const errMess = useSelector(state => state.characters.errMess);
    const dispatch = useDispatch();

    useEffect(() => {
        let strPath = document.location.pathname;
        let arrTmp = strPath.split('/');
        let characterIdLocal = arrTmp[arrTmp.length - 1];

        setCharacterId(characterIdLocal);
        if (characterId === null) return;
        dispatch(fetchCharacterById(characterId));
        dispatch(fetchComicsByCharacterId(0, characterId));
        dispatch(fetchStoriesByCharacterId(0, characterId));
    }, [characterId, dispatch]);
    
    return(
        <React.Fragment>
            { 
                (character) &&
                <RenderCard 
                        key={character.id}
                        character={character} 
                        comics={comicsByCharacter}
                        comicsTotalPages={comicsTotalPages}
                        stories={storiesByCharacter}
                        storiesTotalPages={storiesTotalPages}
                        isLoading={isLoading}
                        errMess={errMess}
                />
            }
        </React.Fragment>
    );
}

export default CharacterById;