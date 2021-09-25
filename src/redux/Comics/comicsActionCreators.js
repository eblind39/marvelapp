import * as ActionTypes from '././comicsActionTypes';
import * as DefaultPaginationConsts from '../../data/paginationData';
import { PRIVATE_KEY, PUBLIC_KEY } from '../../data/apiKeys';
import { MD5 } from 'crypto-js';
import { baseUrl } from '../../data/baseUrl';

export const fetchComics = (comicsState, pageNumber, comicTitleFilter, comicFormatFilter, issueNumberFilter, filterByIssueNumber, isAutoComplete) => (dispatch) => {
    dispatch(comicsLoading(true));
    let intLimit = (isAutoComplete ? DefaultPaginationConsts.autocompletePageSize : DefaultPaginationConsts.defaultPageSize)

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
    if (comicTitleFilter) params.titleStartsWith = comicTitleFilter;
    if (comicFormatFilter) params.formatType = comicFormatFilter;
    if (issueNumberFilter) params.issueNumber = issueNumberFilter;
    if (filterByIssueNumber) params.orderBy = filterByIssueNumber;

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
                    if (!isAutoComplete) {
                        let arrTmp = comics.data.results.filter((item, index) => !comicsState.some(itemstt => itemstt.id === item.id));
                        dispatch(addComics(arrTmp, comics.data.total));
                    } else {
                        dispatch(addComicsForAutoComplete(comics.data.results, comicTitleFilter, comicFormatFilter, issueNumberFilter));
                    }
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
        offset: (pageNumber * DefaultPaginationConsts.tablePageSize), 
        limit: DefaultPaginationConsts.tablePageSize
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
        offset: (pageNumber * DefaultPaginationConsts.tablePageSize), 
        limit: DefaultPaginationConsts.tablePageSize
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

export const setComicFilters = (comicTitleFilter, comicFormatFilter, issueNumberFilter, orderByIssueNumber) => ({
    type: ActionTypes.COMICS_SET_FILTERS,
    comicTitleFilter: comicTitleFilter,
    comicFormatFilter: comicFormatFilter,
    issueNumberFilter: issueNumberFilter,
    orderByIssueNumber: orderByIssueNumber,
    pageNumber: 0
});

export const comicsLoading = () => ({
    type: ActionTypes.COMICS_LOADING
});

export const addComics = (comics, total) => ({
    type: ActionTypes.COMICS_ADD,
    payload: comics,
    totalComics: total,
});

export const addComicsForAutoComplete = (comics, comicTitleFilter, comicFormatFilter, issueNumberFilter) => ({
    type: ActionTypes.COMICS_ADD_SEARCH,
    payload: comics,
    comicTitleFilter: comicTitleFilter,
    comicFormatFilter: comicFormatFilter,
    issueNumberFilter: issueNumberFilter
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