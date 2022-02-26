import { useLocation } from "wouter";
import { Button, Box, Spacer, Flex, Heading } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./utils/ColorModeSwitcher";
import { useState } from "react";
import api from "./utils/api";

export function PageHeader() {
	const [isLoggingOut, setLoggingOut] = useState(false);

	const [location, setLocation] = useLocation();
	document.title = location === "/login" ? "Login" : "Courses List";

	const handleLogout = async () => {
		try {
			setLoggingOut(true);
			await api("/logout");
			localStorage.removeItem("DA_LOGGED_IN");

			setLocation("/login");
		} catch (error) {
			console.log(error);
		} finally {
			setLoggingOut(false);
		}
	};
	return (
		<Flex p="2" mb="4">
			<Box>
				<Heading size="lg">View Grades Panel</Heading>
			</Box>
			<Spacer />
			{location === "/dashboard" && (
				<Box>
					<Button
						isLoading={isLoggingOut}
						loadingText="Logging Out.."
						onClick={handleLogout}
					>
						Log Out
					</Button>
				</Box>
			)}
			<Box>
				<ColorModeSwitcher />
			</Box>
		</Flex>
	);
}
