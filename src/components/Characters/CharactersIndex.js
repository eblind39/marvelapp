import React from "react";
import CharactersBanner from "../Characters/CharactersBanner";
import CharactersSearchBar from "../Characters/CharactersSearchBar";
import CharactersList from "../Characters/CharactersList";
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