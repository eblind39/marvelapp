import React from "react";
import { Grid, Image } from "semantic-ui-react";

function CharactersBanner(props) {

    return (
        <React.Fragment>
            <Grid style={{ background: 'orange',paddingBottom: "12px" }} container columns={2} doubling textAlign='center' >
                <Image src='/images/Marvel-Character-Banner.jpg' size='huge' />
            </Grid>
        </React.Fragment>
    );

}

export default CharactersBanner;