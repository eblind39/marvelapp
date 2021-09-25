import * as ActionTypes from '././storiesActionTypes';
import * as DefaultPaginationConsts from '../../data/paginationData';
import { PRIVATE_KEY, PUBLIC_KEY } from '../../data/apiKeys';
import { MD5 } from 'crypto-js';
import { baseUrl } from '../../data/baseUrl';

export const fetchStories = (pageNumber, comicId, isAutoComplete) => (dispatch) => {
    dispatch(storiesLoading(true));
    let intLimit = (isAutoComplete ? DefaultPaginationConsts.autocompletePageSize : DefaultPaginationConsts.defaultPageSize)

    // you need a new time stamp for every request                                                                                    
    let ts = new Date().getTime();
    let hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    let apiUrl = new URL(baseUrl + 'stories');
    let params = { 
        apikey: PUBLIC_KEY, 
        hash: hash, 
        offset: (pageNumber * intLimit), 
        limit: intLimit
    };
    if (comicId) params.comics = comicId;

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
                    if (!isAutoComplete)
                        dispatch(addStories(stories.data.results, stories.data.total, comicId));
                    else
                        dispatch(addStoriesForAutoComplete(stories.data.results, comicId));
                }
            })
            .catch(error => dispatch(storiesFailed(error.message)));
}

export const incPageNumber = () => ({
    type: ActionTypes.STORIES_INCREMENT_PAGE_NUMBER
});

export const setComicId = (comicId) => ({
    type: ActionTypes.STORIES_SET_FILTER_COMIC_ID,
    payload: comicId,
    pageNumber: 0
});

export const storiesLoading = () => ({
    type: ActionTypes.STORIES_LOADING
});

export const addStories = (stories, total, comicId) => ({
    type: ActionTypes.STORIES_ADD,
    payload: stories,
    totalComics: total,
    comicId: comicId
});

export const addStoriesForAutoComplete = (stories, comicId) => ({
    type: ActionTypes.STORIES_ADD_SEARCH,
    payload: stories,
    comicId: comicId
});

export const storiesFailed = (errmes) => ({
    type: ActionTypes.STORIES_FAILED,
    payload: errmes
});