import React from "react";
import { Container, Grid, Image, Pagination, Header } from 'semantic-ui-react';
import { fetchCharactersByComicId, setCharactersPageNumber } from '../../../redux/Comics/comicsActionCreators';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

function ComicCardDetailCharacters({comic, characters, charactersTotalPages}) {
    const dispatch = useDispatch();

    return (
        <Grid
        container
        centered
        style={{ background: "orange", paddingLeft: "12px", paddingBottom: "12px" }}
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
                        <Header as='h2'>Characters</Header>
                    </Grid.Row>
                    {
                        (characters.length > 0) &&
                        <Grid.Row>
                            <Grid.Column width={4}></Grid.Column>
                            <Grid.Column width={4}>
                                <Container>
                                    <Header as="h4">Name</Header>
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
                        characters &&
                        characters.map((character, index) => {
                            let srcImage = `${character?.thumbnail?.path}.${character?.thumbnail?.extension}`;
                            if (srcImage.indexOf('image_not_available')>=0) srcImage = '/images/ImageNotFound.jpg';
                            return (
                                <Grid.Row key={character.id}>
                                    <Grid.Column width={4}>
                                        <Image as={Link} to={`/characters/${character.id}`} src={ srcImage } size="tiny" />
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
                    <Grid.Row centered>
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
            </Grid.Column>
        </Grid.Row>
    </Grid>
    );
}

export default ComicCardDetailCharacters;