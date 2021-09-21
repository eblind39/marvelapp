import React from "react";
import { Container, Grid, Image, Card, Header, Button, Icon } from 'semantic-ui-react';
import { useHistory } from "react-router";

function CharacterCardDetailHeader({character}) {
    const history = useHistory();
    let srcImage = `${ character?.thumbnail?.path }.${ character?.thumbnail?.extension }`;

    return(
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
                        <p style={{ color: "black" }}>{character.description}</p>
                    </Container>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default CharacterCardDetailHeader;