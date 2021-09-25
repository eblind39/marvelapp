import React from "react";
import CharactersBanner from "./Banner/CharactersBanner";
import CharactersSearchBar from "./SearchBar/CharactersSearchBar";
import CharactersList from "./List/CharactersList";
import NavMenu from '../NavMenu/NavMenu';

function CharactersIndex(props) {
    return (
        <React.Fragment>
            <NavMenu />
            <CharactersBanner />
            <CharactersSearchBar />
            <CharactersList />
        </React.Fragment>
    );
}

export default CharactersIndex;