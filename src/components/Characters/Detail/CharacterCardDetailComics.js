import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { fetchComicsByCharacterId, setComicsPageNumber } from "../../../redux/Characters/charactersActionCreators";
import { Container, Grid, Image, Pagination, Header } from 'semantic-ui-react';

function CharacterCardDetailComics({character, comics, comicsTotalPages}) {
    const dispatch = useDispatch();

    return(
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
                                    <Grid.Row key={comic.id}>
                                        <Grid.Column width={4}>
                                            <Image as={Link} to={`/comics/${comic.id}`} src={srcImage} size="tiny" />
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
    );
}

export default CharacterCardDetailComics;