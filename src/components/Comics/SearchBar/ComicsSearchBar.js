import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Form, Input, Button, Select } from "semantic-ui-react";
import { setComicFilters, fetchComics } from "../../../redux/Comics/comicsActionCreators";

function ComicsSearchBar(props) {
	const [comicTitleFilter, setComicTitleFilter] = useState(null);
	const [comicFormatFilter, setComicFormatFilter] = useState(null);
	const [issueNumberFilter, setIssueNumberFilter] = useState(null);
	const [orderByIssueNumber, setOrderByIssueNumber] = useState(null);
	const [orderIssueNumberComboOpts, setOrderIssueNumberComboOpts] = useState([]);
	const [formatsCombo, setFormatsCombo] = useState([]);
	const comics = useSelector((state) => state.comics.comics);
	const pageNumber = useSelector((state) => state.comics.pageNumber);

	const dispatch = useDispatch();

	const doSearchComics = () => {
		let strComicTitleFilter = (comicTitleFilter === "" ? null : comicTitleFilter);
		let strComicFormatFilter = (comicFormatFilter === "" ? null : comicFormatFilter);
		let strIssueNumberFilter = (issueNumberFilter === "" ? null : issueNumberFilter);
		let strOrderByIssueNumber = (orderByIssueNumber === "" ? null : orderByIssueNumber);
		
		dispatch(setComicFilters(strComicTitleFilter, strComicFormatFilter, strIssueNumberFilter));
		dispatch(fetchComics(comics, pageNumber, strComicTitleFilter, strComicFormatFilter, strIssueNumberFilter, strOrderByIssueNumber, false));
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
				columns={1}
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
										placeholder="Title"
										onChange={(e) => setComicTitleFilter(e.target.value)}
									/>
								</Grid.Column>
								<Grid.Column>
									<Form.Field
										control={Select}
										placeholder="Select a format"
										options={formatsCombo}
										onChange={(e, { value }) => setComicFormatFilter(value)}
									/>
								</Grid.Column>
								<Grid.Column>
									<Form.Field
										control={Input}
										autoComplete="off"
										label=""
										placeholder="Issue number"
										onChange={(e) => setIssueNumberFilter(e.target.value)}
									/>
								</Grid.Column>
								<Grid.Column>
									<Form.Field
										control={Select}
										placeholder="Order by issue number"
										options={orderIssueNumberComboOpts}
										onChange={(e, { value }) => setOrderByIssueNumber(value)}
									/>
								</Grid.Column>
								<Grid.Column>
									<Button
										style={{  }}
										primary
										onClick={doSearchComics}
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

export default ComicsSearchBar;
