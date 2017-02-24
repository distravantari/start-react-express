import { Component } from "react";

// Home component
class Index extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{ this.props.children }
			</div>
		);
	}
}

export default Index;
