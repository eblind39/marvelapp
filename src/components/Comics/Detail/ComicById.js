import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoriesByComicId, fetchCharactersByComicId, fetchComicById } from '../../../redux/Comics/comicsActionCreators';
import ComicCardDetail from './ComicCardDetail';

function ComicById({comicId}) {
    const comic = useSelector(state => state.comics.comic);
    const charactersByComic = useSelector(state => state.comics.charactersByComic);
    const charactersTotalPages = useSelector(state => state.comics.charactersTotalPages);
    const storiesByComic = useSelector(state => state.comics.storiesByComic);
    const storiesTotalPages = useSelector(state => state.comics.storiesTotalPages);
    const isLoading = useSelector(state => state.comics.isLoading);
    const errMess = useSelector(state => state.comics.errMess);
    const dispatch = useDispatch();

    useEffect(() => {
        if (comicId === null) return;
        dispatch(fetchComicById(comicId));
        dispatch(fetchCharactersByComicId(0, comicId));
        dispatch(fetchStoriesByComicId(0, comicId));
    }, [comicId, dispatch]);
    
    return(
        <React.Fragment>
            { 
                (comic) &&
                <ComicCardDetail 
                        key={comic.id}
                        comic={comic} 
                        characters={charactersByComic}
                        charactersTotalPages={charactersTotalPages}
                        stories={storiesByComic}
                        storiesTotalPages={storiesTotalPages}
                        isLoading={isLoading}
                        errMess={errMess}
                />
            }
        </React.Fragment>
    );
}

export default ComicById;