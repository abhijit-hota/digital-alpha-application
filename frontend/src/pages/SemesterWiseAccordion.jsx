import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";

export function SemesterWiseAccordion({ semesters }) {
	return (
		<Accordion defaultIndex={0}>
			{[...semesters].reverse().map((semester) => {
				return (
					<AccordionItem key={semester.rank}>
						<h2>
							<AccordionButton>
								<Box flex="1" textAlign="left">
									{semester.title}
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							<Table variant="simple" size="sm">
								<Thead>
									<Tr>
										{[
											"Code",
											"Title",
											"Category",
											"Credits",
											"Grades",
											"Attendance",
										].map((column) => (
											<Th key={column}>{column}</Th>
										))}
									</Tr>
								</Thead>
								<Tbody>
									{semester.courses.map((course) => (
										<Tr key={course.code}>
											<Td>{course.code}</Td>
											<Td>{course.title}</Td>
											<Td>{course.category}</Td>
											<Td>{course.credit}</Td>
											<Td>{course.grade}</Td>
											<Td>{course.attendance}</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</AccordionPanel>
					</AccordionItem>
				);
			})}
		</Accordion>
	);
}
