import * as ActionTypes from './storiesActionTypes';

export const Stories = (state = {
                                    isLoading: false,
                                    errMes: null,
                                    stories: [],
                                    storiesAutoComplete: [],
                                    pageNumber: 0,
                                    totalStories: 0,
                                    totalPages: 0,
                                    comicId: null
                                },
                                action) => {
                               switch (action.type) {
                                    case ActionTypes.STORIES_ADD:
                                        return {
                                                ...state, 
                                                isLoading: false, 
                                                errMes: null, 
                                                stories: [...state.stories, ...action.payload],
                                                totalStories: action.totalStories,
                                                totalPages: parseInt(action.totalStories / 20),
                                                comicId: action.comicId,
                                                pageNumber: state.pageNumber
                                               }
                                    case ActionTypes.STORIES_ADD_SEARCH:
                                    return {
                                            ...state, 
                                            isLoading: false, 
                                            errMes: null, 
                                            storiesAutoComplete: action.payload,
                                            comicId: action.comicId
                                           }
                                    case ActionTypes.STORIES_LOADING:
                                        return {...state, isLoading: true, errMes: null, comicId: state.comicId}
                                    case ActionTypes.STORIES_FAILED:
                                        return {...state, isLoading: false, errMes: action.payload}
                                    case ActionTypes.STORIES_INCREMENT_PAGE_NUMBER:
                                        return {...state, pageNumber: state.pageNumber + 1}
                                    case ActionTypes.STORIES_SET_FILTER_COMIC_ID:
                                        return {
                                                ...state, 
                                                isLoading: false, 
                                                errMes: null, 
                                                stories: [], 
                                                totalStories: 0, 
                                                totalPages: 0, 
                                                comicId: action.payload,
                                                pageNumber: action.pageNumber
                                               }
                                    default:
                                        return state;
                               }
                           }