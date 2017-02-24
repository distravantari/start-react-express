import { Component } from "react";
import Recognition from "az-client/model/recognition";

// Webcam component
class Face extends Component {
	render() {
		return (
			<div>
				{ Recognition }
			</div>
		);
	}
}

export default Face;
