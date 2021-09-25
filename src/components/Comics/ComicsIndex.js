import React from "react";
import NavMenu from "../NavMenu/NavMenu";
import ComicsBanner from "./Banner/ComicsBanner";
import ComicsList from "./List/ComicsList";
import ComicsSearchBar from "./SearchBar/ComicsSearchBar";

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