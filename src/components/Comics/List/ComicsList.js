import React, { useRef, useState } from "react";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Utils/LoadingComponent";
import NoDataFound from "../../Utils/NoDataFoundComponent";
import NoMoreData from "../../Utils/NoMoreDataComponent";
import { fetchComics, incPageNumber } from "../../../redux/Comics/comicsActionCreators";
import { setActiveMenu } from '../../../redux/NavMenu/navmenuActionCreators';
import * as MenuOptions from '../../../data/navmenuOptions';
import { Grid } from "semantic-ui-react";
import ComicCard from './ComicCard';
import ScrollToTopPage from "../../Utils/ScrollToTopPageComponent";

function ComicsList(props) {
    const [lastElement, setLastElement] = useState(null);
    const isLoading = useSelector(state => state.comics.isLoading);
    const errMess = useSelector(state => state.comics.errMess);
    const pageNumber = useSelector(state => state.comics.pageNumber);
    const comicTitleFilter = useSelector(state => state.comics.comicTitleFilter);
    const comicFormatFilter = useSelector(state => state.comics.comicFormatFilter);
    const issueNumberFilter = useSelector(state => state.comics.issueNumberFilter);
    const orderByIssueNumber = useSelector(state => state.comics.orderByIssueNumber);
    const comics = useSelector(state => state.comics.comics);
    const comicsFavorites = useSelector(state => state.comics.comicsFavorites);
    const totalPages = useSelector(state => state.comics.totalPages);
    const totalComics = useSelector(state => state.comics.totalComics);
    const dispatch = useDispatch();

    const getComics = useCallback(() => {
        dispatch(fetchComics(comics, pageNumber, comicTitleFilter, comicFormatFilter, issueNumberFilter, orderByIssueNumber));
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
                    <Loading showif={isLoading} />
                    <NoDataFound showif={totalComics === 0 && !isLoading} />
                    <NoMoreData showif={pageNumber - 1 === totalPages} />
                    <ScrollToTopPage />
                </Grid.Row>
            </Grid>

        </React.Fragment>
    );
}

export default ComicsList;