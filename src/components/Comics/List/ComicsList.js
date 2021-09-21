import React, { useRef, useState } from "react";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/LoadingComponent";
import NoData from "../../Utils/NoDataComponent";
import NoMoreData from "../../Utils/NoMoreDataComponent";
import { fetchComics, incPageNumber } from "../../../redux/Comics/comicsActionCreators";
import { setActiveMenu } from '../../../redux/NavMenu/navmenuActionCreators';
import * as MenuOptions from '../../../data/navmenuOptions';
import { Grid } from "semantic-ui-react";
import ComicCard from './ComicCard';

function ComicsList(props) {
    const [lastElement, setLastElement] = useState(null);
    const isLoading = useSelector(state => state.comics.isLoading);
    const errMess = useSelector(state => state.comics.errMess);
    const pageNumber = useSelector(state => state.comics.pageNumber);
    const comicTitle = useSelector(state => state.comics.comicTitle);
    const comics = useSelector(state => state.comics.comics);
    const comicsFavorites = useSelector(state => state.comics.comicsFavorites);
    const totalPages = useSelector(state => state.comics.totalPages);
    const totalComics = useSelector(state => state.comics.totalComics);
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

    useEffect(() => {
        dispatch(setActiveMenu(MenuOptions.comics));
    }, []);

    return (
        <React.Fragment>
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
                                    <Grid.Column key={comic.id}>
                                        <ComicCard 
                                            comic={comic} 
                                            comicsFavorites={comicsFavorites}
                                            isLoading={isLoading}
                                            errMess={errMess}
                                        />
                                    </Grid.Column>
                                </div>
                            );
                        else
                            return (
                                <Grid.Column key={comic.id}>
                                    <ComicCard 
                                        comic={comic}
                                        comicsFavorites={comicsFavorites}
                                        isLoading={isLoading}
                                        errMess={errMess}
                                    />
                                </Grid.Column>
                            );
                    })
                }
                <Grid.Row>
                    <Loading show={isLoading} />
                    <NoData show={totalComics === 0 && !isLoading} />
                    <NoMoreData show={pageNumber - 1 === totalPages} />
                </Grid.Row>
            </Grid>

        </React.Fragment>
    );
}

export default ComicsList;