import { Redirect, Route, Switch } from "wouter";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { PageHeader } from "./PageHeader";
import { VStack } from "@chakra-ui/react";

export default function App() {
	return (
		<div minH="100vh" style={{ padding: "2em" }}>
			<PageHeader />
			<VStack>
				<Switch>
					<Route
						path="/login"
						component={() => {
							if (localStorage["DA_LOGGED_IN"]) {
								return <Redirect to="/dashboard" />;
							} else {
								return <LoginPage />;
							}
						}}
					/>
					<Route
						path="/dashboard"
						component={() => {
							if (!localStorage["DA_LOGGED_IN"]) {
								return <Redirect to="/login" />;
							} else {
								return <Dashboard />;
							}
						}}
					/>
					<Route component={() => <Redirect to="/login" />} />
				</Switch>
			</VStack>
		</div>
	);
}
