import React, { useRef, useState } from "react";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Utils/LoadingComponent";
import NoDataFound from "../../Utils/NoDataFoundComponent";
import NoMoreData from "../../Utils/NoMoreDataComponent";
import { fetchCharacters, incPageNumber } from "../../../redux/Characters/charactersActionCreators";
import { setActiveMenu } from '../../../redux/NavMenu/navmenuActionCreators';
import * as MenuOptions from '../../../data/navmenuOptions';
import { Grid } from "semantic-ui-react";
import CharacterCard from "./CharacterCard";
import ScrollToTopPage from "../../Utils/ScrollToTopPageComponent";

function CharactersList(props) {
    const [lastElement, setLastElement] = useState(null);
    const isLoading = useSelector(state => state.characters.isLoading);
    const errMess = useSelector(state => state.characters.errMess);
    const pageNumber = useSelector(state => state.characters.pageNumber);
    const characterNameFilter = useSelector(state => state.characters.characterNameFilter);
    const comicIdFilter = useSelector(state => state.characters.comicIdFilter);
    const storyIdFilter = useSelector(state => state.characters.storyIdFilter);
    const orderByName = useSelector(state => state.characters.orderByName);
    const characters = useSelector(state => state.characters.characters);
    const totalPages = useSelector(state => state.characters.totalPages);
    const totalCharacters = useSelector(state => state.characters.totalCharacters);
    const charactersFavorites = useSelector(state => state.characters.charactersFavorites);
    const dispatch = useDispatch();

    const getCharacters = useCallback(() => {
        dispatch(fetchCharacters(characters, pageNumber, characterNameFilter, comicIdFilter, storyIdFilter, orderByName));
    }, [pageNumber, dispatch]);

    useEffect(() => {
        if (pageNumber <= totalPages) {
            getCharacters();
        }
    }, [pageNumber, getCharacters]);

    useEffect(() => {
        dispatch(setActiveMenu(MenuOptions.characters));
    }, []);

    // Start infinite scroll
    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    dispatch(incPageNumber());
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
                    characters.map((character, index) => {
                        if (index === characters.length - 1 && !isLoading && pageNumber <= totalPages)
                            return (
                                <div key={`${character.name}-${index}`}
                                    ref={setLastElement} >
                                    <Grid.Column key={character.id}>
                                        <CharacterCard 
                                            character={character}
                                            charactersFavorites={charactersFavorites}
                                            isLoading={isLoading}
                                            errMess={errMess}
                                        />
                                    </Grid.Column>
                                </div>
                            );
                        else
                            return (
                                <Grid.Column key={character.id}>
                                    <CharacterCard 
                                        character={character} 
                                        charactersFavorites={charactersFavorites}
                                        isLoading={isLoading}
                                        errMess={errMess}
                                    />
                                </Grid.Column>
                            );
                    })
                }
                <Grid.Row>
                    <Loading showif={isLoading} />
                    <NoDataFound showif={totalCharacters === 0 && !isLoading} />
                    <NoMoreData showif={pageNumber - 1 === totalPages} />
                    <ScrollToTopPage />
                </Grid.Row>
            </Grid>
        </React.Fragment>
    );
}

export default CharactersList;