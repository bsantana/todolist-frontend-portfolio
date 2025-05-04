import Dropdown from './Dropdown';

const ListTasks = ({ items, handleShowUpdateModal, handleDeleteTasks, duplicateTasks }) => {
  return(
    <>
      {
        items.map(task => {
          return (
            <div key={task.id} style={{position: 'relative', cursor: 'pointer'}}>
              <li onClick={() => handleShowUpdateModal(task)} style={{borderBottom: '1px solid #eee', listStyle: 'none', padding: '8px 0px', paddingRight: 40, fontSize: 14}}>
                <div>{task.title}</div>
                <span style={{fontSize: 12, color: '#666'}}>{task.description}</span>
              </li>
              <div style={{position: 'absolute', right: 0, top: 0, marginTop: 8}}>
                <Dropdown taskId={task.id} handleDeleteTasks={handleDeleteTasks} duplicateTasks={duplicateTasks} />
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default ListTasks;