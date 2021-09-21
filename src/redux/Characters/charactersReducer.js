import * as ActionTypes from './charactersActionTypes';

export const Characters = (state = {
                                        isLoading: false,
                                        errMes: null,
                                        characters: [],
                                        character: {},
                                        comicsByCharacter: [],
                                        comicsPageNumber: 0,
                                        comicsTotalPages: 0,
                                        comicsTotalComics: 0,
                                        storiesByCharacter: [],
                                        storiesPageNumber: 0,
                                        storiesTotalPages: 0,
                                        storiesTotalStories: 0,
                                        charactersFavorites: [],
                                        pageNumber: 0,
                                        totalCharacters: 0,
                                        totalPages: 0,
                                        orderByName: null,
                                        characterNameFilter: null,
                                        comicIdFilter: null,
                                        storyIdFilter: null
                                    },
                           action) => {
                               switch (action.type) {
                                    case ActionTypes.CHARACTERS_ADD:
                                        return {
                                                ...state, 
                                                isLoading: false, 
                                                errMes: null, 
                                                characters: [...state.characters, ...action.payload],
                                                totalCharacters: action.totalCharacters,
                                                totalPages: parseInt(action.totalCharacters / 20),
                                                characterNameFilter: action.characterNameFilter,
                                                comicIdFilter: action.comicIdFilter,
                                                storyIdFilter: action.storyIdFilter,
                                                orderByName: action.orderByName,
                                                pageNumber: state.pageNumber
                                               }
                                    case ActionTypes.CHARACTERS_ADD_BY_ID:
                                        return {
                                                ...state, 
                                                isLoading: false, 
                                                errMes: null, 
                                                character: action.payload
                                               }
                                    case ActionTypes.CHARACTERS_ADD_COMICS_BY_CHARID:
                                        return {
                                                ...state,
                                                isLoading: false, 
                                                errMes: null, 
                                                comicsByCharacter: action.payload, 
                                                comicsTotalComics: action.comicsTotalComics, 
                                                comicsTotalPages: parseInt(action.comicsTotalComics / 3),
                                                comicsPageNumber: state.comicsPageNumber
                                               }
                                    case ActionTypes.CHARACTERS_ADD_STORIES_BY_CHARID:
                                        return {
                                                ...state,
                                                isLoading: false, 
                                                errMes: null, 
                                                storiesByCharacter: action.payload, 
                                                storiesTotalStories: action.storiesTotalStories, 
                                                storiesTotalPages: parseInt(action.storiesTotalStories / 3),
                                                storiesPageNumber: state.comicsPageNumber
                                                }
                                    case ActionTypes.CHARACTERS_LOADING:
                                        return {...state, isLoading: true, errMes: null, characterNameFilter: state.characterNameFilter}
                                    case ActionTypes.CHARACTERS_FAILED:
                                        return {...state, isLoading: false, errMes: action.payload}
                                    case ActionTypes.CHARACTERS_INCREMENT_PAGE_NUMBER:
                                        console.log('state.pageNumber', state.pageNumber);
                                        return {...state, pageNumber: state.pageNumber + 1}
                                    case ActionTypes.CHARACTERS_SET_COMICS_PAGE_NUMBER:
                                        return {...state, comicsPageNumber: action.payload}
                                    case ActionTypes.CHARACTERS_SET_STORIES_PAGE_NUMBER:
                                        return {...state, storiesPageNumber: action.payload}
                                    case ActionTypes.CHARACTERS_SET_FILTERS:
                                        return {
                                                ...state, 
                                                isLoading: false, 
                                                errMes: null, 
                                                characters: [], 
                                                totalCharacters: 0,
                                                totalPages: 0, 
                                                characterNameFilter: action.characterNameFilter,
                                                comicIdFilter: action.comicIdFilter,
                                                storyIdFilter: action.storyIdFilter,
                                                pageNumber: action.pageNumber,
                                               }
                                    case ActionTypes.CHARACTERS_SET_ARRAY_FAVORITES:
                                        return { ...state, charactersFavorites: action.payload }
                                    default:
                                        return state;
                               }
                           }