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
	}

	render() {
		return (
			<div>
				<Login clickit={ () => this.clickAcc() }/>
			</div>
		);
	}

	clickAcc() {
		this.context.router.push("/home");
	}
}

// Login component
class Login extends Component {
	render() {
		return (
			<div>
				please login <br />
				Username: <input type="text" ref={(ref) => this.usernameRef = ref} /> <br />
				password: <input type="password" ref={(ref) => this.passwordRef = ref} /> <br />
				<button type="button" onClick={() => this.auth()}>Login</button>
				dont have the account? <a onClick={ () => this.props.clickit() }> click here </a>
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

export default Authentication;
