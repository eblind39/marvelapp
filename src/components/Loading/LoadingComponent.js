import React from 'react';
import { Icon } from 'semantic-ui-react';

export const Loading = ({show}) => {
    const styleContainer = {
        zIndex: 899, 
        paddingTop: '4em',
        color: '#ffffff'
    }

    return(
        <React.Fragment>
            {show &&
                <div style={styleContainer}>
                    <Icon loading name='spinner' size='big' />
                    <p>Loading...</p>
                </div>
            }
        </React.Fragment>
    );
}

export default Loading;