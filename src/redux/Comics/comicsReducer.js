import * as ActionTypes from './comicsActionTypes';
import * as DefaultPaginationConsts from '../../data/paginationData';

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
                                    comicTitleFilter: null,
                                    comicFormatFilter: null,
                                    issueNumberFilter: null,
                                    orderByIssueNumber: null
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
                                                totalPages: parseInt(action.totalComics / DefaultPaginationConsts.defaultPageSize),
                                                comicTitleFilter: state.comicTitleFilter,
                                                comicFormatFilter: state.comicFormatFilter,
                                                issueNumberFilter: state.issueNumberFilter,
                                                orderByIssueNumber: state.orderByIssueNumber,
                                                pageNumber: state.pageNumber
                                               }
                                   case ActionTypes.COMICS_ADD_BY_ID:
                                       return {
                                                ...state, 
                                                isLoading: false, 
                                                errMes: null, 
                                                comic: action.payload 
                                              }
                                   case ActionTypes.COMICS_ADD_CHARACTERS_BY_COMICID:
                                       return {
                                           ...state,
                                           isLoading: false, 
                                           errMes: null, 
                                           charactersByComic: action.payload,
                                           charactersTotalCharacters: action.charactersTotalCharacters,
                                           charactersTotalPages: parseInt(action.charactersTotalCharacters / DefaultPaginationConsts.tablePageSize),
                                           charactersPageNumber: state.charactersPageNumber
                                       }
                                   case ActionTypes.COMICS_ADD_STORIES_BY_COMICID:
                                       return {
                                           ...state,
                                           isLoading: false, 
                                           errMes: null, 
                                           storiesByComic: action.payload,
                                           storiesTotalStories: action.storiesTotalStories,
                                           storiesTotalPages: parseInt(action.storiesTotalStories / DefaultPaginationConsts.tablePageSize),
                                           storiesPageNumber: state.comicsPageNumber
                                       }
                                    case ActionTypes.COMICS_ADD_SEARCH:
                                        return {
                                                ...state, 
                                                isLoading: false,
                                                errMes: null, 
                                                comicsAutoComplete: action.payload,
                                                comicTitleFilter: action.comicTitleFilter,
                                                comicFormatFilter: action.comicFormatFilter,
                                                issueNumberFilter: action.issueNumberFilter
                                                }
                                    case ActionTypes.COMICS_LOADING:
                                        return {...state, isLoading: true, errMes: null, comicTitleFilter: state.comicTitleFilter}
                                    case ActionTypes.COMICS_FAILED:
                                        return {...state, isLoading: false, errMes: action.payload}
                                    case ActionTypes.COMICS_INCREMENT_PAGE_NUMBER:
                                        return {...state, pageNumber: state.pageNumber + 1}
                                    case ActionTypes.COMICS_SET_CHARACTERS_PAGE_NUMBER:
                                        return {...state, charactersPageNumber: action.payload}
                                    case ActionTypes.COMICS_SET_STORIES_PAGE_NUMBER:
                                        return {...state, storiesPageNumber: action.payload}
                                    case ActionTypes.COMICS_SET_FILTERS:
                                        return {
                                                ...state, 
                                                isLoading: false, 
                                                errMes: null, 
                                                comics: [], 
                                                totalComics: 0, 
                                                totalPages: 0, 
                                                comicTitleFilter: action.comicTitleFilter,
                                                comicFormatFilter: action.comicFormatFilter,
                                                issueNumberFilter: action.issueNumberFilter,
                                                orderByIssueNumber: action.orderByIssueNumber,
                                                pageNumber: action.pageNumber
                                               }
                                    case ActionTypes.COMICS_SET_ARRAY_FAVORITES:
                                        return { ...state, comicsFavorites: action.payload }
                                    default:
                                        return state;
                               }
                           }