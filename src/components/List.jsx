import Dropdown from './Dropdown';

const List = ({ items, handleDeleteTasks }) => {
  return(
    <>
      {
        items.map(task => {
          return (
            <div key={task.id} style={{position: 'relative'}}>
              <li style={{borderBottom: '1px solid #eee', listStyle: 'none', padding: '8px 0px', paddingRight: 40, fontSize: 14}}>{task.title}</li>
              <div style={{position: 'absolute', right: 0, top: 0, marginTop: 8}}>
                <Dropdown taskId={task.id} handleDeleteTasks={handleDeleteTasks} />
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default List;