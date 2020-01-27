import React from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { ADD_RECIPE, GET_ALL_RECIPES } from "../../queries";
import Error from "../Error";

const initialState = {
	name: "",
	instructions: "",
	category: "Breakfast",
	description: "",
	username: ""
};

class AddRecipe extends React.Component {
	state = { ...initialState };

	clearState = () => {
		this.setState({ ...initialState });
	};

	componentDidMount() {
		this.setState({
			username: this.props.session.getCurrentUser.username
		});
	}

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	validateForm = () => {
		const { name, category, instructions, description } = this.state;
		const isInvalid = !name || !category || !description || !instructions;
		return isInvalid;
	};

	handleSubmit = (event, addRecipe) => {
		event.preventDefault();
		addRecipe().then(({ data }) => {
			console.log(data);
            this.clearState();
            this.props.history.push('/');
		});
	};

	updateCache = (cache, data) => {
		const { getAllRecipes } = cache.readQuery({ query: 
		GET_ALL_RECIPES })
		console.log('read query', getAllRecipes)
	}

	render() {
		const {
			name,
			category,
			instructions,
			description,
			username
		} = this.state;

		return (
			<Mutation
				mutation={ADD_RECIPE}
				variables={{
					name,
					category,
					instructions,
					description,
					username
				}}
				update={this.updateCache}
			>
				{(addRecipe, { data, loading, error }) => {
					return (
						<div className="App">
							<h2>Add Recipe</h2>
							<form
								className="form"
								onSubmit={event =>
									this.handleSubmit(event, addRecipe)
								}
							>
								<input
									type="text"
									name="name"
									placeholder="Recipe name"
									onChange={this.handleChange}
									value={name}
								/>
								<select
									name="category"
									onChange={this.handleChange}
									value={category}
								>
									<option value="Breakfast">Breakfast</option>
									<option value="Lunch">Lunch</option>
									<option value="Dinner">Dinner</option>
									<option value="Snack">Snack</option>
								</select>
								<input
									type="text"
									name="description"
									placeholder="Add description"
									onChange={this.handleChange}
									value={description}
								/>
								<textarea
									name="instructions"
									placeholder="Add instructions"
									onChange={this.handleChange}
									value={instructions}
								></textarea>
								<button
									disabled={loading || this.validateForm()}
									type="submit"
									className="button-primary"
								>
									Submit
								</button>
								{error && <Error error={error} />}
							</form>
						</div>
					);
				}}
			</Mutation>
		);
	}
}

export default withRouter(AddRecipe);
