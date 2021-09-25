import React from 'react';

export const NoMoreData = ({showif}) => {
    const styleContainer = {
        zIndex: 899, 
        paddingTop: '4em',
        marginTop: '3em', 
        marginBottom: '3em', 
    }
    
    const styleNoMoreData = {
        color: '#ffffff', 
        fontSize: "1em"
    }

    return(
        <React.Fragment>
            {showif &&
                <div style={styleContainer}>
                    <p style={styleNoMoreData}>No more data... ♥</p>
                </div>
            }
        </React.Fragment>
    );
}

export default NoMoreData;