import React, { useRef, useState } from "react";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Loading from "../Loading/LoadingComponent";
import { fetchComics, incPageNumber } from "../../redux/Comics/comicsActionCreators";
import { Card, Image, Grid } from "semantic-ui-react";

function RenderCard({comic}) {
        let srcImage = `${ comic.thumbnail.path }.${ comic.thumbnail.extension }`;

        return (
            <Card className="comic-card-default-height">
                <Image as={Link} to={`/comics/${comic.id}`} src={ srcImage } wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{ comic.name }</Card.Header>
                    <Card.Meta>
                    </Card.Meta>
                    <Card.Description className="limit-text-words">
                        { comic.description }
                    </Card.Description>
                </Card.Content>
                <Card.Content centered extra>
                    { comic.id }
                </Card.Content>
            </Card>
        );
}

function ComicsList(props) {
    const [lastElement, setLastElement] = useState(null);
    const isLoading = useSelector(state => state.comics.isLoading);
    const errMess = useSelector(state => state.comics.errMess);
    const pageNumber = useSelector(state => state.comics.pageNumber);
    const comicTitle = useSelector(state => state.comics.comicTitle);
    const comics = useSelector(state => state.comics.comics);
    const totalPages = useSelector(state => state.comics.totalPages);
    const dispatch = useDispatch();

    const getComics = useCallback(() => {
        dispatch(fetchComics(pageNumber, comicTitle));
    }, [pageNumber, dispatch]);

    useEffect(() => {
        if (pageNumber <= totalPages) {
            getComics();
        }
    }, [pageNumber, getComics]);

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

    if (comics.length === 0) {
        return (
            <Loading />
        );
    } else {
        return (
            <React.Fragment>
                {/* <Header as='h3' content='comics' textAlign='center' /> */}
                
                <Grid
                    container
                    centered
                    style={{ background: "orange" }}
                    columns={4}
                    divided
                    doubling
                >
                    {
                        comics.map((comic, index) => {
                            if (index === comics.length - 1 && !isLoading && pageNumber <= totalPages)
                                return (
                                    <div key={`${comic.name}-${index}`}
                                        ref={setLastElement} >
                                        <Grid.Column>
                                            <RenderCard 
                                                key={comic.id}
                                                comic={comic} 
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
                                            key={comic.id}
                                            comic={comic} 
                                            isLoading={isLoading}
                                            errMess={errMess}
                                        />
                                    </Grid.Column>
                                );
                        })
                    }
                </Grid>
                
                {isLoading && <Loading />}

                {comics.length === 0 && <p>No data</p>}

                {pageNumber - 1 === totalPages && (
                    <p className='text-center my-10' style={{marginTop: '3em', zIndex: 899, color: '#9a0d2e'}}>No more data... ♥</p>
                )}
            </React.Fragment>
        );
    }
}

export default ComicsList;