import React from "react";
import { Card, Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";

function ComicFavoriteCard({comic}) {
    let srcImage = `${ comic.thumbnail.path }.${ comic.thumbnail.extension }`;

    return (
        <Card className="comic-card-default-height" style={{cursor: "pointer", marginBottom: "30px"}}>
            <Image as={Link} to={`/comics/${comic.id}`} src={srcImage} wrapped ui={false} />
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