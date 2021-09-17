import React, { useRef, useState } from "react";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/LoadingComponent";
import { fetchCharacters, incPageNumber } from "../../redux/Characters/charactersActionCreators";
import { Card, Image, Grid } from "semantic-ui-react";
import { Link } from 'react-router-dom';

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

function CharactersList(props) {
    const [lastElement, setLastElement] = useState(null);
    const isLoading = useSelector(state => state.characters.isLoading);
    const errMess = useSelector(state => state.characters.errMess);
    const pageNumber = useSelector(state => state.characters.pageNumber);
    const characterName = useSelector(state => state.characters.characterName);
    const comicIdFilter = useSelector(state => state.characters.comicIdFilter);
    const characters = useSelector(state => state.characters.characters);
    const totalPages = useSelector(state => state.characters.totalPages);
    const dispatch = useDispatch();

    const getCharacters = useCallback(() => {
        dispatch(fetchCharacters(pageNumber, characterName, comicIdFilter));
        // fetchCharacters(pageNumber)(dispatch);
    }, [pageNumber, dispatch]);

    useEffect(() => {
        if (pageNumber <= totalPages) {
            getCharacters();
        }
    }, [pageNumber, getCharacters]);

    // Start infinite scroll
    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    dispatch(incPageNumber())
                }
            })
    );

    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);
    // end infinite scroll

    if (characters.length === 0) {
        return (
            <Loading />
        );
    } else {
        return (
            <React.Fragment>
                {/* <Header as='h3' content='Characters' textAlign='center' /> */}
                
                <Grid
                    container
                    centered
                    style={{ background: "orange" }}
                    columns={4}
                    divided
                    doubling
                >
                    {
                        characters.map((character, index) => {
                            if (index === characters.length - 1 && !isLoading && pageNumber <= totalPages)
                                return (
                                    <div key={`${character.name}-${index}`}
                                        ref={setLastElement} >
                                        <Grid.Column>
                                            <RenderCard 
                                                key={character.id}
                                                character={character} 
                                                isLoading={isLoading}
                                                errMess={errMess}
                                            />
                                        </Grid.Column>
                                    </div>
                                );
                            else
                                return (
                                    <Grid.Column>
                                        <RenderCard 
                                            key={character.id}
                                            character={character} 
                                            isLoading={isLoading}
                                            errMess={errMess}
                                        />
                                    </Grid.Column>
                                );
                        })
                    }
                </Grid>
                
                {isLoading && <Loading />}

                {characters.length === 0 && <p>No data</p>}

                {pageNumber - 1 === totalPages && (
                    <p className='text-center my-10' style={{marginTop: '3em', zIndex: 899, color: '#9a0d2e'}}>No more data... ♥</p>
                )}
            </React.Fragment>
        );
    }
}

export default CharactersList;