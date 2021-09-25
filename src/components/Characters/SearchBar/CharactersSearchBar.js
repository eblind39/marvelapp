import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Form, Input, Button, Select, Search, Label } from "semantic-ui-react";
import { setCharacterFilter, fetchCharacters } from "../../../redux/Characters/charactersActionCreators";
import { fetchComics } from "../../../redux/Comics/comicsActionCreators";
import { fetchStories } from "../../../redux/Stories/storiesActionCreators";

function CharactersSearchBar(props) {
	const [characterNameFilter, setCharacterNameFilter] = useState(null);
	const [comicIdFilter, setComicIdFilter] = useState(null);
	const [storyIdFilter, setStoryIdFilter] = useState(null);
	const [orderByName, setOrderByName] = useState(null);
	const [storiesCombo, setStoriesCombo] = useState([]);
	const [orderNameComboOpts, setOrderNameComboOpts] = useState([]);
	const characters = useSelector((state) => state.characters.characters)
	const comics = useSelector((state) => state.comics.comics)
	const pageNumber = useSelector((state) => state.characters.pageNumber);
	// for comics
	const isComicsLoading = useSelector((state) => state.comics.isLoadding);
	const comicsAutoComplete = useSelector((state) => state.comics.comicsAutoComplete);
	// for stories
	const isStoriesLoading = useSelector((state) => state.stories.isLoadding);
	const storiesAutoComplete = useSelector((state) => state.stories.storiesAutoComplete);
	const dispatch = useDispatch();
	const timeoutComicsRef = useRef();

	const doSearchCharacters = () => {
		let strCharacterNameFilter = (characterNameFilter === "" ? null : characterNameFilter);
		let strComicIdFilter = (comicIdFilter === "" ? null : comicIdFilter);
		let strStoryIdFilter = (storyIdFilter === "" ? null : storyIdFilter);
		let strOrderByName = (orderByName === "" ? null : orderByName);
		
		dispatch(setCharacterFilter(strCharacterNameFilter, strComicIdFilter, strStoryIdFilter, strOrderByName));
		dispatch(fetchCharacters(characters, pageNumber, strCharacterNameFilter, strComicIdFilter, strStoryIdFilter, strOrderByName));
	};

	// Start for comics autocomplete
	const handleSearchComicsChange = (e, data) => {
		if (data.value === "") {
			setComicIdFilter(null);
			setStoriesCombo([]);
		} else {
			clearTimeout(timeoutComicsRef.current);
			dispatch(fetchComics(comics, 0, data.value, null, null, null, true));

			timeoutComicsRef.current = setTimeout(() => {
				if (comicsAutoComplete.length === 0) {
					return;
				}
			}, 300);
		}
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
						<Grid
							container
							centered
							verticalAlign="bottom"
							style={{ background: "orange", padding: "0 3em 0 3em" }}
							columns={5}
							doubling
						>
							<Grid.Row>
								<Grid.Column>
									<Form.Field
										control={Input}
										autoComplete="off"
										label=""
										placeholder="Name"
										onChange={(e) => setCharacterNameFilter(e.target.value)}
									/>
								</Grid.Column>
								<Grid.Column>
									<Form.Field
										control={Search}
										placeholder="Comic"
										loading={isComicsLoading}
										resultRenderer={resultRenderer}
										onSearchChange={handleSearchComicsChange}
										onResultSelect={(e, data) => {
											dispatch(fetchStories(0, data.result.id, true));
											setComicIdFilter(data.result.id);
										}}
										results={comicsAutoComplete}
									/>
								</Grid.Column>
								<Grid.Column>
									<Form.Field
										control={Select}
										placeholder="Select a story"
										options={storiesCombo}
										onChange={(e, { value }) => {
											setStoryIdFilter(value);
										}}
									/>
								</Grid.Column>
								<Grid.Column>
									<Form.Field
										control={Select}
										placeholder="Order by name"
										options={orderNameComboOpts}
										onChange={(e, { value }) => setOrderByName(value)}
									/>
								</Grid.Column>
								<Grid.Column>
									<Button
										style={{ width: "100%" }}
										primary
										onClick={doSearchCharacters}
									>
										Search
									</Button>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Form.Group>
				</Form>
			</Grid>
		</React.Fragment>
	);
}

export default CharactersSearchBar;
