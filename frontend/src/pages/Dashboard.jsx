import { Badge, Box, Button, Divider, Flex, Grid, Heading, Spinner, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData';
import getLocalToken from '../utils/getLocalToken';
import { SubmissionModal } from './SubmissionModal';

const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});
	const [submission, setSubmission] = useState({});
	const [teamName, setTeamName] = useState('');
	const { isOpen, onClose, onOpen } = useDisclosure();
	useEffect(() => {
		const fetchTeams = async () => {
			try {
				const resData = await fetchData('/all-teams-details', getLocalToken('authtoken'));

				setData(resData);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};
		fetchTeams();
	}, []);

	console.debug(1);

	return (
		<Grid>
			<SubmissionModal modalProps={{ isOpen, onClose }} submission={submission} teamName={teamName} />
			{loading ? (
				<Spinner />
			) : (
				<>
					<Heading>Total Teams: {data.length}</Heading>
					{data.map((team) => (
						<Flex key={team.leaderEmail} p="2" wrap="wrap">
							<Heading size="md">{team.teamName}</Heading>
							<Divider marginBottom="2" mt="1" />
							{team.teamMemberDetails.map((member) => (
								<Box
									mr="4"
									mt="4"
									mb="4"
									minW="xs"
									flex="1"
									borderWidth="1px"
									borderRadius="lg"
									overflow="hidden"
									key={member.email}>
									<Box p="6">
										<Box
											d="flex"
											alignItems="baseline"
											fontWeight="semibold"
											justifyContent="space-between"
											as="h3"
											mb="1"
											lineHeight="tight">
											{member.name}

											{team.leaderEmail === member.email && (
												<Badge borderRadius="full" px="2" colorScheme="teal">
													Team Leader
												</Badge>
											)}
										</Box>
										<Box>
											<Box as="span" fontWeight="semibold" color="gray.400">
												Email
											</Box>
											<br />
											{member.email}
										</Box>
										<Box pt="2">
											<Box as="span" fontWeight="semibold" color="gray.400">
												Class
											</Box>
											<br />
											{member.class}
										</Box>

										<Box pt="2">
											<Box as="span" fontWeight="semibold" color="gray.400">
												Phone
											</Box>
											<br />
											{member.phone}
										</Box>
										<Box pt="2">
											<Box as="span" fontWeight="semibold" color="gray.400">
												School
											</Box>
											<br />
											{member.schoolName}, {member.schoolCity}, {member.schoolState}
										</Box>
										<Box pt="2">
											<Button
												onClick={() => {
													setTeamName(team.teamName);
													setSubmission(team.submission);
													onOpen();
												}}>
												Show Submission
											</Button>
										</Box>
									</Box>
								</Box>
							))}
						</Flex>
					))}
				</>
			)}
		</Grid>
	);
};

export default Dashboard;
