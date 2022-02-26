import { useRef, useState } from "react";
import {
	Input,
	Container,
	Icon,
	InputGroup,
	InputRightElement,
	InputLeftElement,
	Button,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import { useLocation } from "wouter";
import fetchData from "../utils/fetchData";

// import Logo from "../logo.webp";

const LoginPage = () => {
	const [show, setShow] = useState(false);
	const [isLoggingIn, setLoggingIn] = useState(false);

	const [credentials, setCredentialsRaw] = useState({ roll: "", password: "" });
	const setCredentials = (type, value) => {
		setCredentialsRaw((prevCreds) => ({ ...prevCreds, [type]: value }));
	};

	const [pwError, setError] = useState(false);
	const pwRef = useRef(null);

	const [, setLocation] = useLocation();

	const logIn = async (e) => {
		setLoggingIn(true);
		e.preventDefault();
		e.stopPropagation();

		if (credentials.password === "" || credentials.email === "") {
			setError(true);
			return;
		}
		try {
			const resData = await fetchData("/login", "", credentials);

			if (resData.data) {
				if (resData.data.msg === "wrong_password") {
					setError(true);
				} else {
					setError(false);

					localStorage.setItem("DA_LOGGED_IN", "admin");
					localStorage.setItem("DA_AUTH_TOKEN", resData.data.signedToken);

					setLocation("/dashboard");
				}
			}
		} catch (error) {
			console.error(error.message, error.stack);
			setLoggingIn(false);
		} finally {
			setLoggingIn(false);
		}
	};
	return (
		<>
			<Container d="flex" flexDirection="column">
				{/* <Image
					w="80"
					alignSelf="center"
					src={Logo}
					filter={colorMode === "dark" && "invert(1)"}
				/> */}

				<InputGroup size="lg" pb="8">
					<Input
						ref={pwRef}
						pr="4.5rem"
						isRequired
						placeholder="Roll Number"
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
