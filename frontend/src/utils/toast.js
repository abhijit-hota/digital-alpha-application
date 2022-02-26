import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast({
	defaultOptions: {
		variant: "subtle",
		position: "bottom-right",
	},
});
export default toast;
