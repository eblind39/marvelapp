import React from "react";
import { Container, Grid, Image, Pagination, Header } from 'semantic-ui-react';
import { fetchStoriesByComicId, setStoriesPageNumber } from '../../../redux/Comics/comicsActionCreators';
import { useDispatch } from "react-redux";

function ComicCardDetailStories({comic, stories, storiesTotalPages}) {
    const dispatch = useDispatch();

    return (
        <Grid
        container
        centered
        style={{ background: "orange", color: "rgba(232, 230, 227, 0.87)", paddingLeft: "12px", paddingBottom: "12px" }}
        columns={1}
        divided
        doubling
    >
        <Grid.Row>
            <Grid.Column width={16}>
                <Grid
                    columns={3}
                    style={{ background: "#181a1b", marginRight: "6px" }}
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
                                <Grid.Row key={story.id}>
                                    <Grid.Column width={4}>
                                        {
                                            (srcImage === null || srcImage === "" || srcImage === undefined || srcImage === "undefined.undefined")
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
                                    totalPages={storiesTotalPages ? storiesTotalPages : 1}
                                    onPageChange={(event, data) => {
                                        dispatch(setStoriesPageNumber(data.activePage - 1));
                                        dispatch(fetchStoriesByComicId(data.activePage - 1, comic.id));
                                    }}
                                />
                                :
                                <p>No data. {storiesTotalPages}</p>
                        }
                    </Grid.Row>
                </Grid>
            </Grid.Column>
        </Grid.Row>
    </Grid>
    );
}

export default ComicCardDetailStories;