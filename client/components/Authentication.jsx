import { Component } from "react";

// Home component
class Authentication extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// user has account? true -> login, else -> register
			account: true
		};
	}

	render() {
		return (
			<div>
				{ this.state.account ? <Login account={ this.state.account } clickit={ () => this.clickAcc() } /> : <Register account={ this.state.account } clickit={ () => this.clickAcc() }/> }
			</div>
		);
	}

	clickAcc() {
		this.setState({
			account: !this.state.account
		});
	}
}

// Login component
const Login = ({ account, clickit }) => {
	console.log("user has account? ", account);
	return (
		<div>
			please login <br />
			Username: <input type="text" /> <br />
			password: <input type="password" /> <br />
			tidak memiliki account? <a onClick={ () => clickit() }> register </a>
		</div>
		);
};

// Register component
const Register = ({ account, clickit }) => {
	console.log("user has account? ", account);
	return (
		<div>
			please register <br />
			Username: <input type="text" /> <br />
			password: <input type="password" /> <br />
			sudah memiliki account? <a onClick={ () => clickit() }> login </a>
		</div>
		);
};

export default Authentication;
