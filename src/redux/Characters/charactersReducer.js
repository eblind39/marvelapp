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
                                        pageNumber: 0,
                                        totalCharacters: 0,
                                        totalPages: 0,
                                        filterByName: null,
                                        characterName: null,
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
                                                characterName: action.characterName,
                                                comicIdFilter: action.comicIdFilter,
                                                storyIdFilter: action.storyIdFilter,
                                                filterByName: action.filterByName,
                                                pageNumber: state.pageNumber
                                               }
                                    case ActionTypes.CHARACTERS_ADD_BY_ID:
                                        return {...state, character: action.payload}
                                    case ActionTypes.CHARACTERS_ADD_COMICS_BY_CHARID:
                                        return {
                                                ...state, 
                                                comicsByCharacter: action.payload, 
                                                comicsTotalComics: action.comicsTotalComics, 
                                                comicsTotalPages: parseInt(action.comicsTotalComics / 3),
                                                comicsPageNumber: state.comicsPageNumber
                                               }
                                    case ActionTypes.CHARACTERS_ADD_STORIES_BY_CHARID:
                                        return {
                                                ...state, 
                                                storiesByCharacter: action.payload, 
                                                storiesTotalStories: action.storiesTotalStories, 
                                                storiesTotalPages: parseInt(action.storiesTotalStories / 3),
                                                storiesPageNumber: state.comicsPageNumber
                                                }
                                    case ActionTypes.CHARACTERS_LOADING:
                                        return {...state, isLoading: true, errMes: null, characterName: state.characterName}
                                    case ActionTypes.CHARACTERS_FAILED:
                                        return {...state, isLoading: false, errMes: action.payload}
                                    case ActionTypes.CHARACTERS_INCREMENT_PAGE_NUMBER:
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
                                                characterName: action.characterName,
                                                comicIdFilter: action.comicIdFilter,
                                                storyIdFilter: action.storyIdFilter,
                                                pageNumber: action.pageNumber
                                               }
                                    default:
                                        return state;
                               }
                           }