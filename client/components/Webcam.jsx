import { Component, PropTypes } from "react";
// import Webcam from "react-webcam";
import Webcam from "az-client/model/camera";
import { dropHandler } from "az-client/model/upload";

// Webcam component
class Cam extends Component {
	static get contextTypes() {
        return {
            router: PropTypes.object.isRequired,
        };
    }

    constructor(props) {
		super(props);
		this.state = {
			screenshot: "",
		};
	}

	render() {
		return (
			<div>
				<Webcam width="300" height="300" ref="webcam" />
				<div className="controls">
					<button onClick={() => this.screenshot()}>capture</button>
					<button type="button" onClick={() => this.context.router.push("/home")}>Dropzone</button>
				</div>
				{this.state.screenshot ? (
					<div>
						<img src={this.state.screenshot} />
						<button onClick={() => this.proceed()}>proceed</button>
					</div>
					) : null}
			</div>
		);
	}

    convertToFile(dataurl, filename) {
		const arr = dataurl.split(",");
		const mime = arr[0].match(/:(.*?);/)[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, { type: mime });
	}

	screenshot() {
        const screenshot = this.refs.webcam.getScreenshot();
        this.setState({ screenshot: screenshot });
    }

    proceed() {
        const file = [this.convertToFile(this.state.screenshot, "face.png")];
		file[0].preview = this.refs.webcam.state.src;
		dropHandler(file);
    }
}

export default Cam;
