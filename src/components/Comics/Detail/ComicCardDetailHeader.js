import React from "react";
import { Container, Grid, Image, Card, Header, Button, Icon } from 'semantic-ui-react';
import { useHistory } from "react-router";

function ComicCardDetailHeader({comic}) {
    const history = useHistory();

    let srcImage = `${ comic?.thumbnail?.path }.${ comic?.thumbnail?.extension }`;
    if (srcImage.indexOf('image_not_available')>=0) srcImage = '/images/ImageNotFound.jpg';

    return (
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
                    <Header as="h1">Comic details</Header>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={6}>
                    <Card>
                        <Image src={srcImage} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{comic.title}</Card.Header>
                        </Card.Content>
                        {
                            (comic?.issueNumber !== undefined) &&
                            <Card.Content centered extra>
                                Issue number {comic?.issueNumber}
                            </Card.Content>
                        }
                        <Card.Content centered extra>
                            {comic.id}
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Container>
                        <p style={{ color: "black" }}>{comic.description}</p>
                    </Container>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default ComicCardDetailHeader;