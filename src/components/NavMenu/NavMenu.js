import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Grid, Menu, Icon } from 'semantic-ui-react';

function NavMenu(props) {
    const isCharacters = useSelector(state => state.navmenu.isCharacters);
    const isCharacterFavorites = useSelector(state => state.navmenu.isCharacterFavorites);
    const isComics = useSelector(state => state.navmenu.isComics);
    const isComicFavorites = useSelector(state => state.navmenu.isComicFavorites);

    return (
        <React.Fragment>
            <Grid style={{ background: 'orange', paddingBottom: "12px", paddingTop: "12px", marginTop: "12px" }} container columns={2} doubling textAlign='center' >
                <Menu className="custom-font">
                    <Menu.Item 
                        as={ Link } 
                        name='characters' 
                        to='characters'
                        active={isCharacters}
                        className={isCharacters ? 'active-opt-menu' : 'inactive-opt-menu'}>
                        <Icon name='user' />
                        Characters
                    </Menu.Item>
                    <Menu.Item 
                        as={ Link } 
                        name='comics' 
                        to='comics'
                        active={isComics}
                        className={isComics ? 'active-opt-menu' : 'inactive-opt-menu'}>
                        <Icon name='address book' />
                        Comics
                    </Menu.Item>
                    {/* { 
                        (isCharacters || isCharacterFavorites) && */}
                        <Menu.Item 
                            as={ Link } 
                            name='charactersfavorites' 
                            to='charactersfavorites' 
                            active={isCharacterFavorites}
                            className={isCharacterFavorites ? 'active-opt-menu' : 'inactive-opt-menu'}>
                            <Icon name='heart' />
                            Character Favorites
                        </Menu.Item>
                    {/* }
                    {
                        (isComics || isComicFavorites) && */}
                        <Menu.Item 
                            as={ Link } 
                            name='comicsfavorites' 
                            to='comicsfavorites' 
                            active={isComicFavorites}
                            className={isComicFavorites ? 'active-opt-menu' : 'inactive-opt-menu'}>
                            <Icon name='heart' />
                            Comic Favorites
                        </Menu.Item>
                    {/* } */}
                </Menu>
            </Grid>
        </React.Fragment>
    );
}

export default NavMenu;