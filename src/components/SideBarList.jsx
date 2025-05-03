import { MdOutlineAddCircle } from "react-icons/md";
import { CiSearch, CiGrid41 } from "react-icons/ci";

import './SideBarList.css';

const SideBarList = ({ buscarTasks, handleShow }) => {
  return (
    <>
      <div onClick={handleShow} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: 14 }} className='sidebar-list-item'>
        <button style={{ border: 'none', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', padding: '6px 5px', color: '#dc4c3e' }}>
          <div style={{ display: 'flex', marginRight: 6 }}>
            <MdOutlineAddCircle color='#dc4c3e' size='1.5rem' />
          </div>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Adicionar tarefa</span>
        </button>
      </div>
      <div style={{ padding: '6px 0' }}>
        <div onClick={buscarTasks} className="sidebar-list-item">
          <button style={{ border: 'none', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', padding: '6px 5px' }}>
            <div style={{ display: 'flex', marginRight: 6 }}>
              <CiSearch size='1.35rem' />
            </div>
            <span style={{ fontSize: 14 }}>Buscar</span>
          </button>
        </div>
        <div className="sidebar-list-item">
          <button style={{ border: 'none', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', padding: '6px 5px' }}>
            <div style={{ display: 'flex', marginRight: 6 }}>
              <CiGrid41 size='1.35rem' />
            </div>
            <span style={{ fontSize: 14 }}>Filtros</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default SideBarList;