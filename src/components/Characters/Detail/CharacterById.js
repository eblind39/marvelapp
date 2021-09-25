import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacterById, fetchComicsByCharacterId, fetchStoriesByCharacterId } from "../../../redux/Characters/charactersActionCreators";
import CharacterCardDetail from './CharacterCardDetail';

function CharacterById({characterId}) {
    const character = useSelector(state => state.characters.character);
    const comicsByCharacter = useSelector(state => state.characters.comicsByCharacter);
    const comicsTotalPages = useSelector(state => state.characters.comicsTotalPages);
    const storiesByCharacter = useSelector(state => state.characters.storiesByCharacter);
    const storiesTotalPages = useSelector(state => state.characters.storiesTotalPages);
    const isLoading = useSelector(state => state.characters.isLoading);
    const errMess = useSelector(state => state.characters.errMess);
    const dispatch = useDispatch();

    useEffect(() => {
        if (characterId === null) return;
        dispatch(fetchCharacterById(characterId));
        dispatch(fetchComicsByCharacterId(0, characterId));
        dispatch(fetchStoriesByCharacterId(0, characterId));
    }, [characterId, dispatch]);
    
    return(
        <React.Fragment>
            { 
                (character) &&
                <CharacterCardDetail 
                        key={character.id}
                        character={character} 
                        comics={comicsByCharacter}
                        comicsTotalPages={comicsTotalPages}
                        stories={storiesByCharacter}
                        storiesTotalPages={storiesTotalPages}
                        isLoading={isLoading}
                        errMess={errMess}
                />
            }
        </React.Fragment>
    );
}

export default CharacterById;