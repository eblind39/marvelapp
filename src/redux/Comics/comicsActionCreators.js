import * as ActionTypes from '././comicsActionTypes';
import { PRIVATE_KEY, PUBLIC_KEY } from '../../data/apiKeys';
import { MD5 } from 'crypto-js';
import { baseUrl } from '../../data/baseUrl';

export const fetchComics = (pageNumber, comicTitle, comicFormat, issueNumber, isAutoComplete) => (dispatch) => {
    dispatch(comicsLoading(true));
    let intLimit = (isAutoComplete ? 6 : 20)

    // you need a new time stamp for every request                                                                                    
    let ts = new Date().getTime();
    let hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    let apiUrl = new URL(baseUrl + 'comics');
    let params = { 
        apikey: PUBLIC_KEY, 
        hash: hash, 
        offset: (pageNumber * intLimit), 
        limit: intLimit
    };
    if (comicTitle) params.titleStartsWith = comicTitle;
    if (comicFormat) params.formatType = comicFormat;
    if (issueNumber) params.issueNumber = issueNumber;

    apiUrl.search = new URLSearchParams(params).toString();

    return fetch(apiUrl)
            .then(
                response => {
                    if (response.ok) {
                        return response;
                    } else {
                        let error = new Error('Error' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                error => {
                    let errmess = new Error(error.message);
                    throw errmess;
                }
            )
            .then(response => response.json())
            .then(comics => {
                if (comics?.data?.results) {
                    if (!isAutoComplete)
                        dispatch(addComics(comics.data.results, comics.data.total, comicTitle, comicFormat, issueNumber));
                    else
                        dispatch(addComicsForAutoComplete(comics.data.results, comicTitle, comicFormat, issueNumber));
                }
            })
            .catch(error => dispatch(comicsFailed(error.message)));
}

export const fetchComicById = (comicId) => (dispatch) => {
    dispatch(comicsLoading(true));

    // you need a new time stamp for every request                                                                                    
    let ts = new Date().getTime();
    let hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    let apiUrl = new URL(baseUrl + 'comics/' + comicId);
    let params = { 
        apikey: PUBLIC_KEY, 
        hash: hash
    };

    apiUrl.search = new URLSearchParams(params).toString();

    return fetch(apiUrl)
            .then(
                response => {
                    if (response.ok) {
                        return response;
                    } else {
                        let error = new Error('Error' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                error => {
                    let errmess = new Error(error.message);
                    throw errmess;
                }
            )
            .then(response => response.json())
            .then(comic => {
                if (comic?.data?.results) {
                    console.log(comic.data.results[0]);
                    dispatch(addComicById(comic.data.results[0]));
                }
            })
            .catch(error => dispatch(comicsFailed(error.message)));
}

export const fetchCharactersByComicId = (pageNumber, comicId) => (dispatch) => {
    dispatch(comicsLoading(true));

    // you need a new time stamp for every request                                                                                    
    let ts = new Date().getTime();
    let hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    let apiUrl = new URL(baseUrl + 'comics/' + comicId + '/characters');
    let params = { 
        apikey: PUBLIC_KEY, 
        hash: hash,
        offset: (pageNumber * 3), 
        limit: 3
    };

    apiUrl.search = new URLSearchParams(params).toString();

    return fetch(apiUrl)
            .then(
                response => {
                    if (response.ok) {
                        return response;
                    } else {
                        let error = new Error('Error' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                error => {
                    let errmess = new Error(error.message);
                    throw errmess;
                }
            )
            .then(response => response.json())
            .then(characters => {
                if (characters?.data?.results) {
                    dispatch(addCharactersByComicId(characters.data.results, characters.data.total));
                }
            })
            .catch(error => dispatch(comicsFailed(error.message)));
}

export const fetchStoriesByComicId = (pageNumber, comicId) => (dispatch) => {
    dispatch(comicsLoading(true));

    // you need a new time stamp for every request                                                                                    
    let ts = new Date().getTime();
    let hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    let apiUrl = new URL(baseUrl + 'comics/' + comicId + '/stories');
    let params = { 
        apikey: PUBLIC_KEY, 
        hash: hash,
        offset: (pageNumber * 3), 
        limit: 3
    };

    apiUrl.search = new URLSearchParams(params).toString();

    return fetch(apiUrl)
            .then(
                response => {
                    if (response.ok) {
                        return response;
                    } else {
                        let error = new Error('Error' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                error => {
                    let errmess = new Error(error.message);
                    throw errmess;
                }
            )
            .then(response => response.json())
            .then(comics => {
                if (comics?.data?.results) {
                    dispatch(addStoriesByComicId(comics.data.results, comics.data.total));
                }
            })
            .catch(error => dispatch(comicsFailed(error.message)));
}

export const addToFavorites = (comicsFavorites, comic) => (dispatch) => {
    let letFiltered = comicsFavorites.filter(item => item.id === comic.id);
    let localArr = (letFiltered.length > 0 ? [...comicsFavorites] : [...comicsFavorites, comic]);
    dispatch(setFavoritesArray(localArr));
}
export const removeFromFavorites = (comicsFavorites, comicId) => (dispatch) => {
    let localArr = comicsFavorites.filter(item => item.id !== comicId);
    dispatch(setFavoritesArray(localArr));
}
export const setFavoritesArray = (comicsFavorites) => ({
    type: ActionTypes.COMICS_SET_ARRAY_FAVORITES,
    payload: comicsFavorites
});

export const incPageNumber = () => ({
    type: ActionTypes.COMICS_INCREMENT_PAGE_NUMBER
});

export const setComicFilters = (comicTitle, comicFormat, issueNumber) => ({
    type: ActionTypes.COMICS_SET_FILTER_TITLE,
    comicTitle: comicTitle,
    comicFormat: comicFormat,
    issueNumber: issueNumber,
    pageNumber: 0
});

export const comicsLoading = () => ({
    type: ActionTypes.COMICS_LOADING
});

export const addComics = (comics, total, comicTitle, comicFormat, issueNumber) => ({
    type: ActionTypes.COMICS_ADD,
    payload: comics,
    totalComics: total,
    comicTitle: comicTitle,
    comicFormat: comicFormat,
    issueNumber: issueNumber
});

export const addComicsForAutoComplete = (comics, comicTitle, comicFormat, issueNumber) => ({
    type: ActionTypes.COMICS_ADD_SEARCH,
    payload: comics,
    comicTitle: comicTitle,
    comicFormat: comicFormat,
    issueNumber: issueNumber
});

export const addComicById = (comic) => ({
    type: ActionTypes.COMICS_ADD_BY_ID,
    payload: comic
});

export const addCharactersByComicId = (characters, total) => ({
    type: ActionTypes.COMICS_ADD_CHARACTERS_BY_COMICID,
    payload: characters,
    charactersTotalCharacters: total
});

export const setCharactersPageNumber = () => ({
    type: ActionTypes.COMICS_SET_CHARACTERS_PAGE_NUMBER
});

export const addStoriesByComicId = (stories, total) => ({
    type: ActionTypes.COMICS_ADD_STORIES_BY_COMICID,
    payload: stories,
    storiesTotalStories: total
});

export const setStoriesPageNumber = () => ({
    type: ActionTypes.COMICS_SET_STORIES_PAGE_NUMBER
});

export const comicsFailed = (errmes) => ({
    type: ActionTypes.COMICS_FAILED,
    payload: errmes
});