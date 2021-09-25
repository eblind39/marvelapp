import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addToFavorites, removeFromFavorites } from "../../../redux/Comics/comicsActionCreators";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import { useDispatch } from 'react-redux';

function ComicCard({comic, comicsFavorites}) {
    const [isComicInFavs, setIsComicInFavs] = useState(false);
    const dispatch = useDispatch();
    let srcImage = `${ comic.thumbnail.path }.${ comic.thumbnail.extension }`;

    const toggleFavorites = function() {
        if (!isComicInFavs) {
            dispatch(addToFavorites(comicsFavorites, comic));
            setIsComicInFavs(true);
        } else {
            dispatch(removeFromFavorites(comicsFavorites, comic.id));
            setIsComicInFavs(false);
        }
    }

    useEffect(() => {
        setIsComicInFavs(comicsFavorites ? comicsFavorites.includes(comic) : false);
    }, []);

    return (
        <Card className="comic-card-default-height">
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
                <Card.Header>{ comic.title }</Card.Header>
                <Card.Meta>
                </Card.Meta>
                <Card.Description className="limit-text-words">
                    { comic.description }
                </Card.Description>
            </Card.Content>
            {
                (comic.issueNumber !== undefined) &&
                <Card.Content extra>
                    Issue number {comic?.issueNumber}
                </Card.Content>
            }
            <Card.Content extra>
                { comic.id }
            </Card.Content>
            <Button animated='vertical'>
                <Button.Content hidden 
                    onClick={toggleFavorites}>
                    { isComicInFavs ? 'Remove from favorites' : 'Add to favorites' }
                </Button.Content>
                <Button.Content visible>
                    <Icon name='heart' color={isComicInFavs ? "red" : "grey"} />
                </Button.Content>
            </Button>
        </Card>
    );
}

export default ComicCard;