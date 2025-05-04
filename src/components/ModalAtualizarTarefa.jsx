import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ModalAtualizarTarefa = ({ show, task, handleClose, handleAddTask, handleChange }) => {
	return (
		<>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
				</Modal.Header>
				<Modal.Body style={{paddingLeft: '1.25rem', paddingRight: '1.25rem'}}>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Control
                as="textarea"
                name="title"
								placeholder="Digite o nome da tarefa"
								onChange={handleChange}
                defaultValue={task.title}
                className='update-title'
                style={{resize: 'none', fieldSizing: 'content', height: 'auto', fontSize: 18, fontWeight: 500, lineHeight: '24px'}}
							/>
						</Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Control
                as="textarea"
                name="description"
								placeholder="Adicione uma descrição mais detalhada..."
								onChange={handleChange}
                defaultValue={task.description}
                style={{resize: 'none', fieldSizing: 'content', height: 'auto', lineHeight: '24px', minHeight: 60, fontSize: 14}}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer style={{paddingLeft: '1.25rem', paddingRight: '1.25rem'}}>
          <Button variant="secondary" size="sm" onClick={() => handleClose()}>
						Cancelar
					</Button>
					<Button variant="primary" size="sm" onClick={() => handleAddTask(task.id)}>
						Salvar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default ModalAtualizarTarefa;