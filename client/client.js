import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/storage";
import routes from "./config/routes";

module.exports = {
	init() {
		render(<Provider store={store}>{routes}</Provider>, document.getElementById("app"));
	}
};
