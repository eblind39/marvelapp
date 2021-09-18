import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Form, Input, Button, Select } from "semantic-ui-react";
import { setComicFilters, fetchComics } from "../../redux/Comics/comicsActionCreators";

function ComicsSearchBar(props) {
	const [searchTitle, setSearchTitle] = useState("");
	const [formatsCombo, setFormatsCombo] = useState([]);
	const [searchIssueNumber, setSearchIssueNumber] = useState("");
	const [selectedComicFormat, setSelectedComicFormat] = useState("");
	const pageNumber = useSelector((state) => state.comics.pageNumber);

	const dispatch = useDispatch();

	const doSearchComics = () => {
		let strSearchTitle = searchTitle === "" ? null : searchTitle;
		let strSelectedComicFormat = selectedComicFormat === "" ? null : selectedComicFormat;
		let strSelectedIssueNumber = searchIssueNumber === "" ? null : searchIssueNumber;
		console.log('doSearchComics', strSearchTitle, strSelectedComicFormat);
		dispatch(setComicFilters(strSearchTitle, strSelectedComicFormat, strSelectedIssueNumber));
		dispatch(fetchComics(pageNumber, strSearchTitle, strSelectedComicFormat, strSelectedIssueNumber, false));
	};

	useEffect(() => {
		let comicFormats = ['', 'comic', 'collection'];
		let comicFormatsObjs = comicFormats.map(format => ({
			key: format,
			value: format,
			text: format			
		}));
		setFormatsCombo(comicFormatsObjs);

	}, []);

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
							autocomplete="off"
							label=""
							placeholder="Title"
							onChange={(e) => setSearchTitle(e.target.value)}
						/>
						<Form.Field
							control={Select}
							placeholder="Select a format"
							options={formatsCombo}
							onChange={ (e, { value }) => setSelectedComicFormat(value) }
							onResultSelect={(e, data) => setSelectedComicFormat(data.result.id) }
						/> 
						<Form.Field
							control={Input}
							autocomplete="off"
							label=""
							placeholder="Issue number"
							onChange={(e) => setSearchIssueNumber(e.target.value)}
						/>
                        <Button
                            style={{ marginBottom: "12px" }}
                            primary
                            onClick={doSearchComics}
                        >
                            Search
                        </Button>
					</Form.Group>
				</Form>
			</Grid>
		</React.Fragment>
	);
}

export default ComicsSearchBar;
