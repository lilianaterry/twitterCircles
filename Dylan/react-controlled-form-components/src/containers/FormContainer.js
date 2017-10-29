import React, {Component} from 'react';
import SingleInput from '../components/SingleInput';

class FormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ownerName: '',
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
		this.handleFullNameChange = this.handleFullNameChange.bind(this);
	}
	componentDidMount() {
		fetch('./fake_db.json')
			.then(res => res.json())
			.then(data => {
				this.setState({
					ownerName: data.ownerName,
				});
			});
	}
	handleFullNameChange(e) {
		this.setState({ ownerName: e.target.value }, () => console.log('name:', this.state.ownerName));
	}
	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			ownerName: '',
		});
	}
	handleFormSubmit(e) {
		e.preventDefault();

		const formPayload = {
			ownerName: this.state.ownerName,
		};

		console.log('Send this in a POST request:', formPayload);
		this.handleClearForm(e);
	}
	render() {
		return (
			<form className="container" onSubmit={this.handleFormSubmit}>
				<h5></h5>
				<SingleInput
					inputType={'text'}
					title={'Enter Your Twitter Handle'}
					name={'name'}
					controlFunc={this.handleFullNameChange}
					content={this.state.ownerName}
					placeholder={'@example'} />
				<input
					type="submit"
					className="btn btn-primary float-right"
					value="Submit"/>
				<button
					className="btn btn-link float-left"
					onClick={this.handleClearForm}>Clear form</button>
			</form>
		);
	}
}

export default FormContainer;
