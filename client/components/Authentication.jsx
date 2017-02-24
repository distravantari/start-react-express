import { Component, PropTypes } from "react";

// Home component
class Authentication extends Component {
	static get contextTypes() {
        return {
            router: PropTypes.object.isRequired,
        };
    }

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
				{ this.state.account ? <Login account={ this.state.account } clickit={ () => this.clickAcc() } context={ this.context } /> : <Register account={ this.state.account } clickit={ () => this.clickAcc() } context={ this.context } /> }
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
const Login = ({ account, clickit, context }) => {
	console.log("user has account? ", account);
	return (
		<div>
			please login <br />
			Username: <input type="text" /> <br />
			password: <input type="password" /> <br />
			<button type="button" onClick={() => context.router.push("/home")}>Login</button>
			tidak memiliki account? <a onClick={ () => clickit() }> register </a>
		</div>
		);
};

// Register component
const Register = ({ account, clickit, context }) => {
	console.log("user has account? ", account);
	return (
		<div>
			please register <br />
			Username: <input type="text" /> <br />
			password: <input type="password" /> <br />
			<button type="button" onClick={() => context.router.push("/home")}>Register</button>
			sudah memiliki account? <a onClick={ () => clickit() }> login </a>
		</div>
		);
};

export default Authentication;
