import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export function AllCoursesTable({ courses }) {
	return (
		<Table variant="simple" size="sm">
			<Thead>
				<Tr>
					{["Code", "Title", "Category", "Credits", "Grades", "Attendance"].map(
						(column) => (
							<Th key={column}>{column}</Th>
						)
					)}
				</Tr>
			</Thead>
			<Tbody>
				{courses.map((course) => {
					return (
						<Tr key={course.code}>
							<Td>{course.code}</Td>
							<Td>{course.title}</Td>
							<Td>{course.category}</Td>
							<Td>{course.credit}</Td>
							<Td>{course.grade}</Td>
							<Td>{course.attendance}</Td>
						</Tr>
					);
				})}
			</Tbody>
		</Table>
	);
}
