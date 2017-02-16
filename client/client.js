import { render } from "react-dom";
// import App from "az-client/components/App";
import { Provider } from "react-redux";
import store from "./store/storage";
import routes from "./config/routes";

module.exports = {
	init() {
		// render(<App/>, document.getElementById("app"));
		render(<Provider store={store}>{routes}</Provider>, document.getElementById("app"));
	}
};
