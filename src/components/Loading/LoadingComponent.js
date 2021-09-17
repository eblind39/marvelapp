import React from 'react';

export const Loading = () => {
    return(
        <div className="col-12" style={{zIndex: 899, color: '#9a0d2e', marginTop: '4em'}}>
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading...</p>
        </div>
    );
}

export default Loading;