import React from 'react';

export const NoData = ({show}) => {
    const styleContainer = {
        zIndex: 899, 
        paddingTop: '4em'
    }

    const styleNoData = {
        color: '#ffffff'
    }

    return(
        <React.Fragment>
            {show &&
                <div style={styleContainer}>
                    <p style={styleNoData}>No data found...</p>
                </div>
            }
        </React.Fragment>
    );
}

export default NoData;