import React from "react";
import { Card, Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";

function CharacterFavoriteCard({character}) {
    let srcImage = `${ character.thumbnail.path }.${ character.thumbnail.extension }`;

    return (
        <Card className="character-card-default-height" style={{marginBottom: "30px"}}>
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
        </Card>
    );
}

export default CharacterFavoriteCard;