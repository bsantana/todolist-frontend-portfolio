import React from 'react';
import Dropdw from 'react-bootstrap/Dropdown';

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

const Dropdown = ({ taskId, handleDeleteTasks }) => {
  return (
    <Dropdw>
      <Dropdw.Toggle as={CustomToggle}>
      </Dropdw.Toggle>

      <Dropdw.Menu style={{fontSize: 13}}>
        <Dropdw.Item eventKey="1">Editar</Dropdw.Item>
        <Dropdw.Item eventKey="2">Mover para...</Dropdw.Item>
        <Dropdw.Item eventKey="2">Duplicar</Dropdw.Item>
        <Dropdw.Divider />
        <Dropdw.Item eventKey="3">Arquivar</Dropdw.Item>
        <Dropdw.Item eventKey="1" style={{color: 'red'}} onClick={() => handleDeleteTasks(taskId)}>Excluir</Dropdw.Item>
      </Dropdw.Menu>
    </Dropdw>
  )
}

export default Dropdown;