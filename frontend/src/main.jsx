import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	initialColorMode: "dark",
	useSystemColorMode: false,
});

ReactDOM.render(
	<React.StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
