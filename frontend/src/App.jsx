import { Redirect, Route, Switch, useLocation } from "wouter";

import { VStack, Grid, Button, Box, Spacer, Flex, Heading } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./utils/ColorModeSwitcher";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import getLocalToken from "./utils/getLocalToken";
import { useState } from "react";
import fetchData from "./utils/fetchData";

export default function App() {
	const [isLoggingOut, setLoggingOut] = useState(false);

	const [location, setLocation] = useLocation();
	document.title = location === "/login" ? "Login" : "Panel";

	const handleLogout = async () => {
		setLoggingOut(true);
		try {
			await fetchData("/logout", getLocalToken("authtoken"));
			setLoggingOut(false);

			localStorage.clear();
			setLocation("/login");
		} catch (error) {
			setLoggingOut(false);
			console.log(error);
		}
	};
	return (
		<Grid minH="100vh" p={4}>
			<Flex p="2" mb="4">
				<Box>
					<Heading size="lg">Panel</Heading>
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
			<VStack spacing={8}>
				<Switch>
					<Route
						path="/login"
						component={() => {
							if (getLocalToken()) {
								return <Redirect to="/dashboard" />;
							} else {
								return <LoginPage />;
							}
						}}
					/>
					<Route
						path="/dashboard"
						component={() => {
							if (!getLocalToken()) {
								return <Redirect to="/login" />;
							} else {
								return <Dashboard />;
							}
						}}
					/>
					<Route component={() => <Redirect to="/login" />} />
				</Switch>
			</VStack>
		</Grid>
	);
}
