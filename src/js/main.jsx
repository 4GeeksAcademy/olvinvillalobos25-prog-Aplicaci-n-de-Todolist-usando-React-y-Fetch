import React from "react";
import ReactDOM from "react-dom/client";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// css
import "../styles/index.css";

// component
import Home from "./components/Home";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Home />
	</React.StrictMode>
);