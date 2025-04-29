import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

import ModalAdicionarTarefa from './components/ModalAdicionarTarefa'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const renderSVGThreeDots = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24"><g fill="none" stroke="currentColor" strokeLinecap="round" transform="translate(3 10)"><circle cx="2" cy="2" r="2"></circle><circle cx="9" cy="2" r="2"></circle><circle cx="16" cy="2" r="2"></circle></g></svg>
  )
}

const CustomToggle = React.forwardRef(({ onClick }, ref) => (
  <button className='btn-mais-acoes' onClick={(e) => {
    e.preventDefault();
    onClick(e);
  }}>
    {renderSVGThreeDots()}
  </button>
));

const getListTasks = async () => {
  try {
    const result = await axios.get('http://localhost:3000/task');
    console.log("RESULT >>> ", result.data)
    return result.data;
  } catch (err) {
    console.log('ERR >>>', err)
    throw err;
  }
}

const createTask = async (title) => {
  try {
    const data = {
      title: title
    }
    const result = await axios.post('http://localhost:3000/task', data);
    console.log("RESULT >>> ", result.data)
    return result.data;
  } catch (err) {
    console.log('ERR >>>', err)
    throw err;
  }
}

const deleteTask = async (taskId) => {
  try {
    const result = await axios.delete(`http://localhost:3000/task/${taskId}`);
    console.log("RESULT >>> ", result.data)
    return result.data;
  } catch (err) {
    console.log('ERR >>>', err)
    throw err;
  }
}

export function App() {
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);
  const [inputValueTask, setInputValueTask] = useState('');

  useEffect(() => {
    buscarTasks();
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputValueTask = (e) => {
    setInputValueTask(e.target.value)
  }

  const handleAddTask = async () => {
    await createTask(inputValueTask)
    await buscarTasks()
    handleClose()
    setInputValueTask('')
  }

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    await buscarTasks();
  }

  const buscarTasks = async () => {
    const result = await getListTasks()
    if(result.data.length) {
      setList(result.data)
    }
  }

  const renderToggle = (taskId, handleDeleteTask) => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{fontSize: 13}}>
          <Dropdown.Item eventKey="1">Editar</Dropdown.Item>
          <Dropdown.Item eventKey="2">Mover para...</Dropdown.Item>
          <Dropdown.Item eventKey="2">Duplicar</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="3">Arquivar</Dropdown.Item>
          <Dropdown.Item eventKey="1" style={{color: 'red'}} onClick={() => handleDeleteTask(taskId)}>Excluir</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  const renderList = () => {
    return(
      <>
        {
          list.map(task => {
            return (
              <div key={task.id} style={{position: 'relative'}}>
                <li style={{borderBottom: '1px solid #eee', listStyle: 'none', padding: '8px 0px', paddingRight: 40, fontSize: 14}}>{task.title}</li>
                <div style={{position: 'absolute', right: 0, top: 0, marginTop: 8}}>
                  {/* <button className='btn-mais-acoes'>{renderSVGThreeDots()}</button> */}
                  {renderToggle(task.id, handleDeleteTask)}
                </div>
              </div>
            )
          })
        }
      </>
    )
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={2} style={{height: '100vh', backgroundColor: '#fcfaf8'}}>
            <div onClick={handleShow}>Icon - Adicionar tarefas</div>
            <div onClick={buscarTasks}>Icon - Busca</div>
            <div>Icon - Filtros</div>
          </Col>
          <Col sm={10}>
            <div style={{maxWidth: 800, margin: '0 auto', marginTop: '5rem'}}>
              <div style={{borderBottom: '1px solid #eee', fontWeight: 700, paddingBottom: 6}}>Minhas tarefas <span style={{color: '#808080', marginLeft: 5, fontSize: 12, fontWeight: 500}}>{list.length}</span></div>
              {renderList()}
              <button>Adicionar tarefa</button>
            </div>
          </Col>
        </Row>
        <ModalAdicionarTarefa show={show} handleClose={handleAddTask} handleChange={handleInputValueTask} />
      </Container>
    </>
  );
}
