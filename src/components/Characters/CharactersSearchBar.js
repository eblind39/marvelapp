import React, { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Form, Input, Button, Select, Search, Label } from "semantic-ui-react";
import { setCharacterFilter, fetchCharacters } from "../../redux/Characters/charactersActionCreators";
import { fetchComics } from "../../redux/Comics/comicsActionCreators";
import { fetchStories } from "../../redux/Stories/storiesActionCreators";

function CharactersSearchBar(props) {
	const [searchText, setSearchText] = useState("");
	const [selectedComicId, setSelectedComicId] = useState("");
	const [selectedStoryId, setSelectedStoryId] = useState("");
	const [storiesCombo, setStoriesCombo] = useState([]);
	const [orderNameComboOpts, setOrderNameComboOpts] = useState([]);
	const [selectedOrderDir, setSelectedOrderDir] = useState(null);
	const pageNumber = useSelector((state) => state.characters.pageNumber);
	// for comics
	const isComicsLoading = useSelector((state) => state.comics.isLoadding);
	const comicsAutoComplete = useSelector((state) => state.comics.comicsAutoComplete);
	// for stories
	const isStoriesLoading = useSelector((state) => state.stories.isLoadding);
	const storiesAutoComplete = useSelector(
		(state) => state.stories.storiesAutoComplete
	);
	const dispatch = useDispatch();
	const timeoutComicsRef = useRef();

	const doSearchCharacters = () => {
		let strSearchText = (searchText === "" ? null : searchText);
		let strSelectedComicId = (selectedComicId === "" ? null : selectedComicId);
		let strSelectedStoryId = (selectedStoryId === "" ? null : selectedStoryId);
		let strSelectedOrderDir = (selectedOrderDir === "" ? null : selectedOrderDir);
		console.log(strSearchText, strSelectedComicId, strSelectedStoryId, strSelectedOrderDir);
		dispatch(setCharacterFilter(strSearchText, strSelectedComicId, strSelectedStoryId));
		dispatch(fetchCharacters(pageNumber, strSearchText, strSelectedComicId, strSelectedStoryId, strSelectedOrderDir));
	};

	// Start for comics autocomplete
	const handleSearchComicsChange = (e, data) => {
		clearTimeout(timeoutComicsRef.current);
		dispatch(fetchComics(0, data.value, null, null, null, true));

		timeoutComicsRef.current = setTimeout(() => {
			if (comicsAutoComplete.length === 0) {
				return;
			}
		}, 300);
	};
	React.useEffect(() => {
		setOrderNameComboOpts([
			{ key: '', value: '', text: '' },
			{ key: 'name', value: 'name', text: 'Ascending' },
			{ key: '-name', value: '-name', text: 'Descending' }
		]);

		return () => {
			clearTimeout(timeoutComicsRef.current);
		};
	}, []);
	// End for comics autocomplete

	React.useEffect(() => {
		let tmpArr = storiesAutoComplete.map((story) => {
			return {
				key: story.id,
				value: story.id,
				text: story.title,
			};
		});
		tmpArr.unshift({ key: '', value: '', text: '' });
		setStoriesCombo(tmpArr);
	}, [storiesAutoComplete]);

	const resultRenderer = ({ title }) => <Label content={title} />

	return (
		<React.Fragment>
			<Grid
                container
                centered
                verticalAlign="bottom"
				style={{ background: "orange" }}
				columns={4}
				doubling
			>
				<Form>
					<Form.Group widths="equal">
						<Form.Field
							control={Input}
							autoComplete="off"
							label=""
							placeholder="Name"
							onChange={(e) => setSearchText(e.target.value)}
						/>
						<Form.Field
							control={Search}
							placeholder="Comic"
							loading={isComicsLoading}
							resultRenderer={resultRenderer}
							onSearchChange={handleSearchComicsChange}
							onResultSelect={(e, data) => {
								dispatch(fetchStories(0, data.result.id, true));
								setSelectedComicId(data.result.id);
							}}
							results={comicsAutoComplete}
						/>
						<Form.Field
							control={Select}
							placeholder="Select a story"
							options={storiesCombo}
							onChange={(e, { value }) => {
								setSelectedStoryId(value);
							}}
						/>
						<Form.Field
							control={Select}
							placeholder="Order by name"
							options={orderNameComboOpts}
							onChange={ (e, { value }) => setSelectedOrderDir(value) }
						/> 
                        <Button
                            style={{ marginBottom: "12px" }}
                            primary
                            onClick={doSearchCharacters}
                        >
                            Search
                        </Button>
					</Form.Group>
				</Form>
			</Grid>
		</React.Fragment>
	);
}

export default CharactersSearchBar;
