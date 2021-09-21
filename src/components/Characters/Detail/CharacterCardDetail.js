import React from "react";
import CharacterCardDetailHeader from './CharacterCardDetailHeader';
import CharacterCardDetailComics from "./CharacterCardDetailComics";
import CharacterCardDetailStories from "./CharacterCardDetailStories";

function CharacterCardDetail({character, comics, comicsTotalPages, stories, storiesTotalPages}) {
    return(
        <React.Fragment>
            <CharacterCardDetailHeader
                character={character}
            />
            <CharacterCardDetailComics
                character={character}
                comics={comics}
                comicsTotalPages={comicsTotalPages}
            />
            <CharacterCardDetailStories
                character={character}
                stories={stories}
                storiesTotalPages={storiesTotalPages}
            />
        </React.Fragment>
    );
}

export default CharacterCardDetail;