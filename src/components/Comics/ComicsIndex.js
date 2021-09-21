import React from "react";
import NavMenu from "../NavMenu/NavMenu";
import ComicsBanner from "./ComicsBanner";
import ComicsList from "./List/ComicsList";
import ComicsSearchBar from "./ComicsSearchBar";

function ComicsIndex(props) {
    return (
        <React.Fragment>
            <NavMenu />
            <ComicsBanner />
            <ComicsSearchBar />
            <ComicsList />
        </React.Fragment>
    );
}

export default ComicsIndex;