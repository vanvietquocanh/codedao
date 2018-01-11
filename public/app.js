import React from "react";
import { render} from "react-dom";
import Application from "./components/Application";
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}
render(
		<div>
			<Application
			/>
		</div>,
		document.getElementById("app-admin")
);
