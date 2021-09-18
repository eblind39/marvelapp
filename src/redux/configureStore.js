// import { createStoreHook, } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Characters } from "./Characters/charactersReducer";
import { Comics } from "./Comics/comicsReducer";
import { Stories } from "./Stories/storiesReducer";
import { NavMenu } from "./NavMenu/navmenuReducer";
import logger from "redux-logger";
import thunk from 'redux-thunk';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            characters: Characters,
            comics: Comics,
            stories: Stories,
            navmenu: NavMenu
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};