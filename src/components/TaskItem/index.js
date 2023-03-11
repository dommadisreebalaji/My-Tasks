import './index.css'

const TasksItem = props => {
  const {eachList} = props
  const {taskName, taskTag} = eachList
  return (
    <li className="task-item-container">
      <p className="task-name">{taskName}</p>
      <p className="task-tag-text">{taskTag}</p>
    </li>
  )
}

export default TasksItem
