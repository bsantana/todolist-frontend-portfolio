import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ModalAdicionarTarefa = ({ show, handleClose, handleAddTask, handleChange }) => {
	return (
		<>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Control
							placeholder="Digite o nome da tarefa"
							onChange={handleChange}
							name="title"
							autoFocus
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleAddTask}>
						Adicionar tarefa
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default ModalAdicionarTarefa;