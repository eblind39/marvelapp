import React from "react";
import { useDispatch } from "react-redux";
import { fetchStoriesByCharacterId, setStoriesPageNumber } from "../../../redux/Characters/charactersActionCreators";
import { Container, Grid, Image, Pagination, Header } from 'semantic-ui-react';

function CharacterCardDetailStories({character, stories, storiesTotalPages}) {
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
                                if (srcImage.indexOf('image_not_available')>=0) srcImage = '/images/ImageNotFound.jpg';
                                return (
                                    <Grid.Row key={story.id}>
                                        <Grid.Column width={4}>
                                            {
                                                (srcImage === null || srcImage === "" || srcImage === undefined || srcImage === "undefined.undefined")
                                                    ?
                                                    <Image src="/images/ImageNotFound.jpg" size="tiny" />
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
    );
}

export default CharacterCardDetailStories;