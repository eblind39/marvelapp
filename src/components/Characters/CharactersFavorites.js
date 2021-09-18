import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Card, Image, Header } from "semantic-ui-react";
import NavMenu from "../NavMenu/NavMenu";
import CharactersBanner from "./CharactersBanner";
import { setActiveMenu } from '../../redux/NavMenu/navmenuActionCreators';
import * as MenuOptions from '../../data/navmenuOptions';

function RenderCard({character}) {
    let srcImage = `${ character.thumbnail.path }.${ character.thumbnail.extension }`;

    return (
        <Card className="character-card-default-height" style={{cursor: "pointer"}}>
            <Image as={Link} to={`/characters/${character.id}`} src={ srcImage } wrapped ui={false} />
            <Card.Content>
                <Card.Header>{ character.name }</Card.Header>
                <Card.Meta>
                    <span className='date'>
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(character.modified)))}
                    </span>
                </Card.Meta>
                <Card.Description className="limit-text-words">
                    { character.description }
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                { character.id }
            </Card.Content>
        </Card>
    );
}

function CharactersFavorites(props) {
    const charactersFavorites = useSelector(state => state.characters.charactersFavorites);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveMenu(MenuOptions.characterfavorites));
    }, []);

    return(
        <React.Fragment>
            <NavMenu />
            <CharactersBanner />
            <Grid
                container
                centered
                style={{ background: "orange" }}
                columns={4}
                divided
                doubling
            >
                <Grid.Row>
                    <Header as='h2'>Favorite characters</Header>
                </Grid.Row>
                <Grid.Row>
                    {
                        charactersFavorites.map((character, index) => {
                            return (
                                <Grid.Column>
                                    <RenderCard
                                        key={character.id}
                                        character={character}
                                    />
                                </Grid.Column>
                            );
                        })
                    }
                </Grid.Row>
            </Grid>

            {
                charactersFavorites.length === 0 && 
                <p>No data</p>
            }

            {
                charactersFavorites.length > 0  && 
                <p className='text-center my-10' style={{ marginTop: '3em', marginBottom: '3em', zIndex: 899, color: '#9a0d2e' }}>No more data... ♥</p>
            }
        </React.Fragment>
    );
}

export default CharactersFavorites;