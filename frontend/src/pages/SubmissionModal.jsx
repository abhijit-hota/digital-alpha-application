import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Box,
} from '@chakra-ui/react';

export function SubmissionModal({ teamName, submission, modalProps }) {
	return (
		<Modal size="4xl" {...modalProps}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{teamName}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{Object.entries(submission).map(([question, answer]) => (
						<Box pt="2">
							<Box as="span" fontWeight="semibold" color="gray.400">
								{question}
							</Box>
							<br />

							{question === 'mindmap' ? (
								<a href={answer} target="_blank" rel="noreferrer">
									{' '}
									{answer}
								</a>
							) : (
								answer
							)}
						</Box>
					))}
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={modalProps.onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
