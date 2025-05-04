import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ToastContainer, toast } from 'react-toastify';

import { getListTasks, createTasks, updateTasks, deleteTasks, duplicateTasks } from './services/tasksService';

import ModalAdicionarTarefa from './components/ModalAdicionarTarefa';
import ModalAtualizarTarefa from './components/ModalAtualizarTarefa';
import SideBarList from './components/SideBarList';
import ListTasks from './components/ListTasks';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [list, setList] = useState([]);
  const [inputTitleTask, setInputTitleTask] = useState('');
  const [inputDescriptionTask, setInputDescriptionTask] = useState('');
  const [task, setTask] = useState({});

  useEffect(() => {
    buscarTasks();
  }, [])

  const handleClose = () => {
    setShow(false);
    setInputTitleTask('');
  }

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setInputTitleTask('');
  }

  const handleShow = () => setShow(true);

  const handleShowUpdateModal = (task) => {
    setShowUpdateModal(true);
    setTask(task);
  }

  const handleInputValueTask = (e) => {
    const { name, value } = e.target;
    switch(name) {
      case 'title':
        setInputTitleTask(value);
        break;
      case 'description':
        setInputDescriptionTask(value);
        break;
    }
  }

  const handleAddTask = async () => {
    try {
      await createTasks(inputTitleTask);
      await buscarTasks();
      handleClose();
    } catch (err) {
      console.error(err);
      if(err.response.data) {
        toast.error(err.response.data.message);
      }
    }
  }

  const handleDeleteTasks = async (taskId) => {
    await deleteTasks(taskId);
    await buscarTasks();
  }

  const handleUpdateTasks = async (taskId) => {
    await updateTasks(inputTitleTask, inputDescriptionTask, taskId);
    await buscarTasks();
    handleCloseUpdateModal();
  }

  const handleDuplicateTasks = async (taskId) => {
    await duplicateTasks(taskId);
    await buscarTasks();
  }

  const buscarTasks = async () => {
    const result = await getListTasks()
    if(result.data.length) {
      setList(result.data);
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
              <ListTasks items={list} handleShowUpdateModal={handleShowUpdateModal} handleDeleteTasks={handleDeleteTasks} duplicateTasks={handleDuplicateTasks} />
              <button>Adicionar tarefa</button>
            </div>
          </Col>
        </Row>
        <ModalAdicionarTarefa show={show} handleClose={handleClose} handleAddTask={handleAddTask} handleChange={handleInputValueTask} />
        <ModalAtualizarTarefa show={showUpdateModal} task={task} handleClose={handleCloseUpdateModal} handleAddTask={handleUpdateTasks} handleChange={handleInputValueTask} />
        <ToastContainer />
      </Container>
    </>
  );
}
