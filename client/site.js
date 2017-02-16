import $ from "jquery";

import "az-styles";
import "bootstrap";

// Initialize React
import { init } from "./client";

$(document).ready(function () {
	if ($("#app").length > 0) {
		init();
	}
});
