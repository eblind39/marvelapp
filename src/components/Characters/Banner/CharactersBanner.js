import React from "react";
import { Grid, Image } from "semantic-ui-react";

function CharactersBanner(props) {

    return (
        <React.Fragment>
            <Grid 
                style={{ background: 'orange', paddingBottom: "12px", borderBottom: "12px solid #cc8400" }} 
                container 
                columns={2} 
                doubling 
                textAlign='center'
                className="cropped-banner" >
                <Image 
                    src='/images/Marvel-Character-Banner.jpg' 
                    size='huge'
                    className="full-banner"
                />
            </Grid>
        </React.Fragment>
    );

}

export default CharactersBanner;