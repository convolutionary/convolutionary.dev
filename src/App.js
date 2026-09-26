import React from "react";
import { createHashRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import "@fontsource-variable/eb-garamond";
import "@fontsource-variable/eb-garamond/wght-italic.css";
import Manual from "./manual/Manual";
import DesktopMode from "./components/DesktopMode";
import NotFound from "./components/NotFound";

const router = createHashRouter(
	createRoutesFromElements(
		<>
			<Route path="/desktop" element={<DesktopMode />} />
			<Route path="/:section?" element={<Manual />} />
			<Route path="*" element={<NotFound />} />
		</>
	)
);

const App = () => <RouterProvider router={router} />;

export default App;
