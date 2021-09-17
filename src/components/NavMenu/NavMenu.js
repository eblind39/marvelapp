import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Grid, Menu, Icon } from 'semantic-ui-react';

function NavMenu(props) {
    const [isCharacterActive, setIsCharacterActive] = useState(false);
    const [isComicActive, setIsComicActive] = useState(false);

    const elemClicked = function(optMnu) {
        switch(optMnu) {
            case 'character':
                setIsCharacterActive(true);
                setIsComicActive(false);
            case 'comic':
                setIsCharacterActive(false);
                setIsComicActive(true);
        }
    }

    return (
        <React.Fragment>
            <Grid style={{ background: 'orange', paddingBottom: "12px", paddingTop: "12px", marginTop: "12px" }} container columns={2} doubling textAlign='center' >
                <Menu>
                    <Menu.Item as={ Link } name='characters' to='characters' onClick={() => { elemClicked('character') }}>
                        <Icon name='user' className={isCharacterActive ? 'active-opt-menu' : ''} />
                        Characters
                    </Menu.Item>
                    <Menu.Item as={ Link } name='comics' to='comics' onClick={() => { elemClicked('comic') }}>
                        <Icon name='address book' className={isComicActive ? 'active-opt-menu' : ''} />
                        Comics
                    </Menu.Item>
                </Menu>
            </Grid>
        </React.Fragment>
    );
}

export default NavMenu;