import { Component, PropTypes } from "react";
import Dropzone from "react-dropzone";
import { dropHandler } from "az-client/model/upload";

// Home component
class Drop extends Component {
	static get contextTypes() {
        return {
            router: PropTypes.object.isRequired,
        };
    }

	constructor(props) {
		super(props);
		this.state = {
			files: "",
		};
	}

	onDrop(files) {
		this.setState({
			files: files
		});
	}

	onOpenClick() {
		this.refs.dropzone.open();
	}

	render() {
		return (
			<div>
				<div style={ { cursor: "pointer" } }>
					<Dropzone ref="dropzone" multiple={false} accept={"image/*"} onDrop={(file) => this.onDrop(file)}>
						<div> Drop a photo, or click to add. </div>
					</Dropzone>
					<button type="button" onClick={() => this.context.router.push("/cam")}>Photo</button>
					<button type="button" onClick={() => this.onOpenClick()}>
						Click to add
					</button>
				</div>
				{this.state.files ? (
					<div>
						<div>
							<img src={this.state.files[0].preview} />
							<button onClick={() => this.proceed()}>proceed</button>
						</div>
					</div>
				) : null}
			</div>
		);
	}

	proceed() {
		dropHandler(this.state.files);
    }
}

export default Drop;
