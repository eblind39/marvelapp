import React from 'react';

export const NoDataFound = ({showif}) => {
    const styleContainer = {
        zIndex: 899, 
        paddingTop: '4em'
    }

    const styleNoData = {
        color: '#ffffff'
    }

    return(
        <React.Fragment>
            {showif &&
                <div style={styleContainer}>
                    <p style={styleNoData}>No data found...</p>
                </div>
            }
        </React.Fragment>
    );
}

export default NoDataFound;