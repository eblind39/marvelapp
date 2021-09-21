import React from "react";
import CharactersBanner from "./CharactersBanner";
import CharactersSearchBar from "./CharactersSearchBar";
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