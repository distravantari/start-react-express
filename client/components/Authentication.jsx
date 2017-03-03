import { Component, PropTypes } from "react";
import { login } from "az-client/model/action";

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
class Login extends Component {
	render() {
		console.log("user has account? ", this.props.account);
		return (
			<div>
				please login <br />
				Username: <input type="text" ref={(ref) => this.usernameRef = ref} /> <br />
				password: <input type="password" ref={(ref) => this.passwordRef = ref} /> <br />
				<button type="button" onClick={() => this.auth()}>Login</button>
				tidak memiliki account? <a onClick={ () => this.props.clickit() }> register </a>
			</div>
		);
	}


	auth() {
		if (!this.usernameRef.value) alert('please insert username');
		else if (!this.passwordRef.value) alert('please insert password');
		else {
			login(this.usernameRef.value, this.passwordRef.value)
			.then((response) => {
				console.log(response);
				if (response.text === "success") this.props.context.router.push("/home");
				else alert("err .. username or password not found");
			})
			.catch((err) => {
				console.log(err);
			});
		}
	}
}

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
