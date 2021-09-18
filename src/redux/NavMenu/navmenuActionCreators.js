import * as ActionTypes from '././navmenuActionTypes';
import * as MenuOptions from '../../data/navmenuOptions';

export const setActiveMenu = (optionMenu) => (dispatch) => {
    let tmpObj = {
        isCharacters: (optionMenu===MenuOptions.characters),
        isCharacterFavorites: (optionMenu===MenuOptions.characterfavorites),
        isComics: (optionMenu===MenuOptions.comics),
        isComicFavorites: (optionMenu===MenuOptions.comicfavorites),
    };
    dispatch(setActiveMenuOptions(tmpObj));
}

export const setActiveMenuOptions = (menuOptions) => ({
    type: ActionTypes.NAVMENU_SET_ACTIVE_OPTION,
    isCharacters: menuOptions.isCharacters, 
    isCharacterFavorites: menuOptions.isCharacterFavorites, 
    isComics: menuOptions.isComics,
    isComicFavorites: menuOptions.isComicFavorites
});