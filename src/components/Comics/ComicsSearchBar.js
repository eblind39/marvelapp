import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Form, Input, Button, Select } from "semantic-ui-react";
import { setComicFilters, fetchComics } from "../../redux/Comics/comicsActionCreators";

function ComicsSearchBar(props) {
	const [searchTitle, setSearchTitle] = useState("");
	const [formatsCombo, setFormatsCombo] = useState([]);
	const [searchIssueNumber, setSearchIssueNumber] = useState("");
	const [selectedComicFormat, setSelectedComicFormat] = useState("");
	const [orderIssueNumberComboOpts, setOrderIssueNumberComboOpts] = useState([]);
	const [selectedOrderDir, setSelectedOrderDir] = useState(null);
	const pageNumber = useSelector((state) => state.comics.pageNumber);

	const dispatch = useDispatch();

	const doSearchComics = () => {
		let strSearchTitle = (searchTitle === "" ? null : searchTitle);
		let strSelectedComicFormat = (selectedComicFormat === "" ? null : selectedComicFormat);
		let strSelectedIssueNumber = (searchIssueNumber === "" ? null : searchIssueNumber);
		let strSelectedOrderDir = (selectedOrderDir === "" ? null : selectedOrderDir);
		console.log('doSearchComics', strSearchTitle, strSelectedComicFormat);
		dispatch(setComicFilters(strSearchTitle, strSelectedComicFormat, strSelectedIssueNumber));
		dispatch(fetchComics(pageNumber, strSearchTitle, strSelectedComicFormat, strSelectedIssueNumber, strSelectedOrderDir, false));
	};

	useEffect(() => {
		let comicFormats = ['', 'comic', 'collection'];
		let comicFormatsObjs = comicFormats.map(format => ({
			key: format,
			value: format,
			text: format			
		}));
		setFormatsCombo(comicFormatsObjs);

		setOrderIssueNumberComboOpts([
			{ key: '', value: '', text: '' },
			{ key: 'issueNumber', value: 'issueNumber', text: 'Ascending' },
			{ key: '-issueNumber', value: '-issueNumber', text: 'Descending' }
		]);

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
							autoComplete="off"
							label=""
							placeholder="Title"
							onChange={(e) => setSearchTitle(e.target.value)}
						/>
						<Form.Field
							control={Select}
							placeholder="Select a format"
							options={formatsCombo}
							onChange={ (e, { value }) => setSelectedComicFormat(value) }
						/> 
						<Form.Field
							control={Input}
							autoComplete="off"
							label=""
							placeholder="Issue number"
							onChange={(e) => setSearchIssueNumber(e.target.value)}
						/>
						<Form.Field
							control={Select}
							placeholder="Order by issue number"
							options={orderIssueNumberComboOpts}
							onChange={ (e, { value }) => setSelectedOrderDir(value) }
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
