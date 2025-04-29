import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ModalAdicionarTarefa = ({ show, handleClose, handleChange }) => {
	return (
		<>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Control
								type="email"
								placeholder="Digite o nome da tarefa"
								onChange={handleChange}
								autoFocus
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleClose}>
						Adicionar tarefa
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default ModalAdicionarTarefa;