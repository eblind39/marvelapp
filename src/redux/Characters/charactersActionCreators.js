import * as ActionTypes from './charactersActionTypes';
import { PRIVATE_KEY, PUBLIC_KEY } from '../../data/apiKeys';
import { MD5 } from 'crypto-js';
import { baseUrl } from '../../data/baseUrl';

export const fetchCharacters = (pageNumber, characterName, comicIdFilter, storyIdFilter, filterByName) => (dispatch) => {
    dispatch(charactersLoading(true));

    // you need a new time stamp for every request                                                                                    
    let ts = new Date().getTime();
    let hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    let apiUrl = new URL(baseUrl + 'characters');
    let params = { 
        apikey: PUBLIC_KEY, 
        hash: hash, 
        offset: (pageNumber * 20), 
        limit: 20
    };
    if (characterName) params.nameStartsWith = characterName;
    if (comicIdFilter) params.comics = comicIdFilter;
    if (storyIdFilter) params.stories = storyIdFilter;
    if (filterByName) params.orderBy = filterByName;

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
                    dispatch(addCharacters(characters.data.results, characters.data.total, characterName, comicIdFilter, storyIdFilter, filterByName))
                }
            })
            .catch(error => dispatch(charactersFailed(error.message)));
}

export const fetchCharacterById = (characterId) => (dispatch) => {
    dispatch(charactersLoading(true));

    // you need a new time stamp for every request                                                                                    
    let ts = new Date().getTime();
    let hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    let apiUrl = new URL(baseUrl + 'characters/' + characterId);
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
            .then(character => {
                if (character?.data?.results) {
                    dispatch(addCharacterById(character.data.results[0]));
                }
            })
            .catch(error => dispatch(charactersFailed(error.message)));
}

export const fetchComicsByCharacterId = (pageNumber, characterId) => (dispatch) => {
    dispatch(charactersLoading(true));

    // you need a new time stamp for every request                                                                                    
    let ts = new Date().getTime();
    let hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    let apiUrl = new URL(baseUrl + 'characters/' + characterId + '/comics');
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
                    dispatch(addComicsByCharacterId(comics.data.results, comics.data.total));
                }
            })
            .catch(error => dispatch(charactersFailed(error.message)));
}

export const fetchStoriesByCharacterId = (pageNumber, characterId) => (dispatch) => {
    dispatch(charactersLoading(true));

    // you need a new time stamp for every request                                                                                    
    let ts = new Date().getTime();
    let hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    let apiUrl = new URL(baseUrl + 'characters/' + characterId + '/stories');
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
            .then(stories => {
                if (stories?.data?.results) {
                    dispatch(addStoriesByCharacterId(stories.data.results, stories.data.total));
                }
            })
            .catch(error => dispatch(charactersFailed(error.message)));
}

export const incPageNumber = () => ({
    type: ActionTypes.CHARACTERS_INCREMENT_PAGE_NUMBER
});

export const setCharacterFilter = (characterName, comicIdFilter, storyIdFilter) => ({
    type: ActionTypes.CHARACTERS_SET_FILTERS,
    characterName: characterName,
    comicIdFilter: comicIdFilter,
    storyIdFilter: storyIdFilter,
    pageNumber: 0
});

export const charactersLoading = () => ({
    type: ActionTypes.CHARACTERS_LOADING
});

export const addCharacters = (characters, total, characterName, comicIdFilter, storyIdFilter, filterByName) => ({
    type: ActionTypes.CHARACTERS_ADD,
    payload: characters,
    totalCharacters: total,
    characterName: characterName,
    comicIdFilter: comicIdFilter,
    storyIdFilter: storyIdFilter,
    filterByName: filterByName
});

export const addCharacterById = (character) => ({
    type: ActionTypes.CHARACTERS_ADD_BY_ID,
    payload: character
});

export const addComicsByCharacterId = (comics, total) => ({
    type: ActionTypes.CHARACTERS_ADD_COMICS_BY_CHARID,
    payload: comics,
    comicsTotalComics: total
});

export const setComicsPageNumber = () => ({
    type: ActionTypes.CHARACTERS_SET_COMICS_PAGE_NUMBER
});

export const addStoriesByCharacterId = (stories, total) => ({
    type: ActionTypes.CHARACTERS_ADD_STORIES_BY_CHARID,
    payload: stories,
    storiesTotalStories: total
});

export const setStoriesPageNumber = () => ({
    type: ActionTypes.CHARACTERS_SET_STORIES_PAGE_NUMBER
});

export const charactersFailed = (errmes) => ({
    type: ActionTypes.CHARACTERS_FAILED,
    payload: errmes
});