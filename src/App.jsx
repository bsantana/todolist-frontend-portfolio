import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ToastContainer, toast } from 'react-toastify';

import { getListTasks, createTasks, deleteTasks } from './services/tasksService';

import ModalAdicionarTarefa from './components/ModalAdicionarTarefa';
import SideBarList from './components/SideBarList';
import List from './components/List';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);
  const [inputValueTask, setInputValueTask] = useState('');

  useEffect(() => {
    buscarTasks();
  }, [])

  const handleClose = () => {
    setShow(false);
    setInputValueTask('');
  }

  const handleShow = () => setShow(true);

  const handleInputValueTask = (e) => {
    setInputValueTask(e.target.value)
  }

  const handleAddTask = async () => {
    try {
      await createTasks(inputValueTask)
      await buscarTasks()
      handleClose()
    } catch (err) {
      console.error(err)
      if(err.response.data) {
        toast.error(err.response.data.message);
      }
    }
    
  }

  const handleDeleteTasks = async (taskId) => {
    await deleteTasks(taskId);
    await buscarTasks();
  }

  const buscarTasks = async () => {
    const result = await getListTasks()
    if(result.data.length) {
      setList(result.data)
    }
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={2} style={{height: '100vh', backgroundColor: '#fcfaf8', position: 'fixed'}}>
            <SideBarList buscarTasks={buscarTasks} handleShow={handleShow} />
          </Col>
          <Col sm={10} style={{marginLeft: 'auto'}}>
            <div style={{maxWidth: 800, margin: '0 auto', marginTop: '5rem'}}>
              <div style={{borderBottom: '1px solid #eee', fontWeight: 700, paddingBottom: 6}}>Minhas tarefas <span style={{color: '#808080', marginLeft: 5, fontSize: 12, fontWeight: 500}}>{list.length}</span></div>
              <List items={list} handleDeleteTasks={handleDeleteTasks} />
              <button>Adicionar tarefa</button>
            </div>
          </Col>
        </Row>
        <ModalAdicionarTarefa show={show} handleClose={handleClose} handleAddTask={handleAddTask} handleChange={handleInputValueTask} />
        <ToastContainer />
      </Container>
    </>
  );
}
