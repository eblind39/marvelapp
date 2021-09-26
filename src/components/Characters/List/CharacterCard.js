import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from "../../../redux/Characters/charactersActionCreators";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom';

function CharacterCard({character, charactersFavorites}) {
    const [isCharacterInFavs, setIsCharacterInFavs] = useState(false);
    const dispatch = useDispatch();
    let srcImage = `${ character.thumbnail.path }.${ character.thumbnail.extension }`;
    if (srcImage.indexOf('image_not_available')>=0) srcImage = '/images/ImageNotFound.jpg';

    const toggleFavorites = function() {
        if (!isCharacterInFavs) {
            dispatch(addToFavorites(charactersFavorites, character));
            setIsCharacterInFavs(true);
        } else {
            dispatch(removeFromFavorites(charactersFavorites, character.id));
            setIsCharacterInFavs(false);
        }
    }

    useEffect(() => {
        setIsCharacterInFavs(charactersFavorites ? charactersFavorites.includes(character) : false);
    }, []);

    return (
        <Card className="character-card-default-height">
            <div
                className="set-equal-height"
            >
                <Image 
                    as={Link} 
                    to={`/characters/${character.id}`} 
                    src={srcImage} 
                    wrapped 
                    fluid
                    ui={false} />
            </div>
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
            <Button animated='vertical'>
                <Button.Content hidden 
                    onClick={toggleFavorites}>
                    { isCharacterInFavs ? 'Remove from favorites' : 'Add to favorites' }
                </Button.Content>
                <Button.Content visible>
                    <Icon name='heart' color={isCharacterInFavs ? "red" : "grey"} />
                </Button.Content>
            </Button>
        </Card>
    );
}

export default CharacterCard;