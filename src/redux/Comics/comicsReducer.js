import * as ActionTypes from './comicsActionTypes';

export const Comics = (state = {
                                        isLoading: false,
                                        errMes: null,
                                        comics: [],
                                        comic: {},
                                        comicsAutoComplete: [],
                                        charactersByComic: [],
                                        charactersPageNumber: 0,
                                        charactersTotalPages: 0,
                                        charactersTotalCharacters: 0,
                                        storiesByComic: [],
                                        storiesPageNumber: 0,
                                        storiesTotalPages: 0,
                                        storiesTotalStories: 0,
                                        comicsFavorites: [],
                                        pageNumber: 0,
                                        totalComics: 0,
                                        totalPages: 0,
                                        comicTitle: null,
                                        comicFormat: null,
                                        issueNumber: null
                                    },
                           action) => {
                               switch (action.type) {
                                    case ActionTypes.COMICS_ADD:
                                        return {
                                                ...state, 
                                                isLoading: false, 
                                                errMes: null, 
                                                comics: [...state.comics, ...action.payload],
                                                totalComics: action.totalComics,
                                                totalPages: parseInt(action.totalComics / 20),
                                                comicTitle: action.comicTitle,
                                                comicFormat: action.comicFormat,
                                                issueNumber: action.issueNumber,
                                                pageNumber: state.pageNumber
                                               }
                                   case ActionTypes.COMICS_ADD_BY_ID:
                                       return { ...state, comic: action.payload }
                                   case ActionTypes.COMICS_ADD_CHARACTERS_BY_COMICID:
                                       return {
                                           ...state,
                                           charactersByComic: action.payload,
                                           charactersTotalCharacters: action.charactersTotalCharacters,
                                           charactersTotalPages: parseInt(action.charactersTotalCharacters / 3),
                                           charactersPageNumber: state.charactersPageNumber
                                       }
                                   case ActionTypes.COMICS_ADD_STORIES_BY_COMICID:
                                       return {
                                           ...state,
                                           storiesByComic: action.payload,
                                           storiesTotalStories: action.storiesTotalStories,
                                           storiesTotalPages: parseInt(action.storiesTotalStories / 3),
                                           storiesPageNumber: state.comicsPageNumber
                                       }
                                    case ActionTypes.COMICS_ADD_SEARCH:
                                        return {
                                                ...state, 
                                                isLoading: false, 
                                                errMes: null, 
                                                comicsAutoComplete: action.payload,
                                                comicTitle: action.comicTitle,
                                                comicFormat: action.comicFormat,
                                                issueNumber: action.issueNumber
                                                }
                                    case ActionTypes.COMICS_LOADING:
                                        return {...state, isLoading: true, errMes: null, comicTitle: state.comicTitle}
                                    case ActionTypes.COMICS_FAILED:
                                        return {...state, isLoading: false, errMes: action.payload}
                                    case ActionTypes.COMICS_INCREMENT_PAGE_NUMBER:
                                        return {...state, pageNumber: state.pageNumber + 1}
                                    case ActionTypes.COMICS_SET_CHARACTERS_PAGE_NUMBER:
                                        return {...state, charactersPageNumber: action.payload}
                                    case ActionTypes.COMICS_SET_STORIES_PAGE_NUMBER:
                                        return {...state, storiesPageNumber: action.payload}
                                    case ActionTypes.COMICS_SET_FILTER_TITLE:
                                        return {
                                                ...state, 
                                                isLoading: false, 
                                                errMes: null, 
                                                comics: [], 
                                                totalComics: 0, 
                                                totalPages: 0, 
                                                comicTitle: action.comicTitle,
                                                comicFormat: action.comicFormat,
                                                issueNumber: action.issueNumber,
                                                pageNumber: action.pageNumber
                                               }
                                    case ActionTypes.COMICS_SET_ARRAY_FAVORITES:
                                        return { ...state, comicsFavorites: action.payload }
                                    default:
                                        return state;
                               }
                           }