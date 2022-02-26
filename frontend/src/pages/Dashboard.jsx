import {
	Box,
	Divider,
	Grid,
	Heading,
	HStack,
	Spinner,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "../utils/toast";
import { AllCoursesTable } from "./AllCourses";
import { SemesterWiseAccordion } from "./SemesterWiseAccordion";

const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [user, setData] = useState({});

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				if (localStorage.DA_LOGGED_IN) {
					const resData = await api("/details");
					setData(resData);
					setLoading(false);
				}
			} catch (error) {
				toast({
					status: "error",
					title: "An Error occurred",
					description: error.message,
				});
			} finally {
				setLoading(false);
			}
		};
		fetchDetails();
	}, []);

	if (loading) {
		return <Spinner />;
	}

	return (
		<Grid width={{ base: "100%", md: "60%" }}>
			<HStack justify="space-between" pb={6}>
				<Box>
					<Heading>{user.name}</Heading>
					<Heading>{user.roll.toUpperCase()}</Heading>
				</Box>
				<Box>
					<Heading>CGPA: {user.cgpa}</Heading>
					<Heading>
						Total Credits:{" "}
						{user.semesters.reduce((acc, { creditsEarned }) => acc + creditsEarned, 0)}
					</Heading>
				</Box>
			</HStack>
			<Divider />
			<Tabs isFitted variant="enclosed-colored">
				<TabList>
					<Tab>All Courses</Tab>
					<Tab>Semester Wise</Tab>
				</TabList>
				<TabPanels>
					<TabPanel px={0}>
						<AllCoursesTable
							courses={user.semesters.flatMap(({ courses }) => courses)}
						/>
					</TabPanel>
					<TabPanel px={0}>
						<SemesterWiseAccordion semesters={user.semesters} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Grid>
	);
};

export default Dashboard;
