import React from 'react';
import { Icon } from 'semantic-ui-react';

export const Loading = ({showif}) => {
    const styleContainer = {
        zIndex: 899, 
        paddingTop: '4em',
        color: '#ffffff'
    }

    return(
        <React.Fragment>
            {showif &&
                <div style={styleContainer}>
                    <Icon loading name='spinner' size='big' />
                    <p>Loading...</p>
                </div>
            }
        </React.Fragment>
    );
}

export default Loading;