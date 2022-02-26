import { useCallback, useRef, useState } from "react";
import {
	Input,
	Container,
	Icon,
	InputGroup,
	InputRightElement,
	InputLeftElement,
	Button,
	Image,
	Heading,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import { useLocation } from "wouter";
import api from "../utils/api";
import toast from "../utils/toast";

import Logo from "../assets/logos.png";

const LoginPage = () => {
	const [show, setShow] = useState(false);
	const [isLoggingIn, setLoggingIn] = useState(false);

	const [credentials, setCredentialsRaw] = useState({ roll: "", password: "" });
	const setCredentials = useCallback((type, value) => {
		setCredentialsRaw((prevState) => ({ ...prevState, [type]: value }));
	});

	const [pwError, setError] = useState(false);
	const pwRef = useRef(null);

	const [, setLocation] = useLocation();

	const logIn = async (e) => {
		try {
			setLoggingIn(true);
			e.preventDefault();
			e.stopPropagation();
			setError(false);

			if (credentials.password === "" || credentials.email === "") {
				setError(true);
				return;
			}
			await api("/login", credentials);
			localStorage.setItem("DA_LOGGED_IN", true);
			setLocation("/dashboard");
		} catch (error) {
			setError(true);
			toast({
				status: "error",
				title: "An Error occurred",
				description: error.message,
			});
		} finally {
			setLoggingIn(false);
		}
	};
	return (
		<>
			<Container d="flex" flexDirection="column">
				<Image w="80" alignSelf="center" src={Logo} pb="6" />
				<Heading textAlign="center" pb="6">
					Log In
				</Heading>
				<InputGroup size="lg" pb="8">
					<Input
						ref={pwRef}
						pr="4.5rem"
						isRequired
						placeholder="Roll Number"
						variant="filled"
						value={credentials.roll}
						onChange={(e) => setCredentials("roll", e.target.value)}
					/>
					<InputLeftElement pointerEvents="none">
						<Icon as={LockIcon} />{" "}
					</InputLeftElement>
				</InputGroup>
				<InputGroup size="lg" pb="8">
					<Input
						ref={pwRef}
						pr="4.5rem"
						isRequired
						isInvalid={pwError}
						type={show ? "text" : "password"}
						variant="filled"
						placeholder="LDAP Password"
						value={credentials.password}
						onChange={(e) => setCredentials("password", e.target.value)}
					/>
					<InputLeftElement pointerEvents="none">
						<Icon as={LockIcon} />{" "}
					</InputLeftElement>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={() => setShow((show) => !show)}>
							{show ? "Hide" : "Show"}
						</Button>
					</InputRightElement>
				</InputGroup>
				<Button
					type="submit"
					alignSelf="center"
					isLoading={isLoggingIn}
					loadingText="Logging In.."
					onClick={logIn}
				>
					Log In
				</Button>
			</Container>
		</>
	);
};

export default LoginPage;
