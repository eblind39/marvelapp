import React from "react";
import ComicCardDetailHeader from "./ComicCardDetailHeader";
import ComicCardDetailCharacters from "./ComicCardDetailCharacters";
import ComicCardDetailStories from "./ComicCardDetailStories";

function ComicCardDetail({comic, characters, charactersTotalPages, stories, storiesTotalPages}) {
    return (
        <React.Fragment>
            <ComicCardDetailHeader 
                comic={comic}
            />
            <ComicCardDetailCharacters
                comic={comic}
                characters={characters}
                charactersTotalPages={charactersTotalPages}
            />
            <ComicCardDetailStories
                comic={comic}
                stories={stories}
                storiesTotalPages={storiesTotalPages}
            />
        </React.Fragment>
    );
}

export default ComicCardDetail;