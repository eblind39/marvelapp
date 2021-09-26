import React from "react";
import { Card, Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";

function ComicFavoriteCard({comic}) {
    let srcImage = `${ comic.thumbnail.path }.${ comic.thumbnail.extension }`;
    if (srcImage.indexOf('image_not_available')>=0) srcImage = '/images/ImageNotFound.jpg';

    return (
        <Card className="comic-card-default-height" style={{marginBottom: "30px"}}>
            <div
                className="set-equal-height"
            >
                <Image 
                    as={Link} 
                    to={`/comics/${comic.id}`} 
                    src={srcImage} 
                    wrapped 
                    fluid
                    ui={false} />
            </div>
            <Card.Content>
                <Card.Header>{comic.name}</Card.Header>
                <Card.Meta>
                </Card.Meta>
                <Card.Description className="limit-text-words">
                    {comic.description}
                </Card.Description>
            </Card.Content>
            <Card.Content centered extra>
                {comic.id}
            </Card.Content>
        </Card>
    );
}

export default ComicFavoriteCard;