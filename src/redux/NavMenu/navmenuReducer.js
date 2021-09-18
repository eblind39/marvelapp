import * as ActionTypes from './navmenuActionTypes';

export const NavMenu = (state = {
                                    isCharacters: false,
                                    isCharacterFavorites: false,
                                    isComics: false,
                                    isComicFavorites: false,
                                },
                                action) => {
                               switch (action.type) {
                                    case ActionTypes.NAVMENU_SET_ACTIVE_OPTION:
                                        return {
                                            ...state, 
                                            isCharacters: action.isCharacters, 
                                            isCharacterFavorites: action.isCharacterFavorites, 
                                            isComics: action.isComics,
                                            isComicFavorites: action.isComicFavorites
                                        }
                                    default:
                                        return state;
                               }
                           }