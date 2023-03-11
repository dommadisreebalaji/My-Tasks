import {Component} from 'react'

import {v4} from 'uuid'

import TagItem from '../TagsItem'
import TasksItem from '../TaskItem'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    inputVal: '',
    selectInput: '',
    tasksData: [],
    activeTag: '',
  }

  onChangeInput = event => {
    this.setState({inputVal: event.target.value})
  }

  onChangeOption = event => {
    this.setState({selectInput: event.target.value})
  }

  onChangeTag = id => {
    const {activeTag} = this.state

    if (activeTag === id) {
      this.setState({activeTag: ''})
    } else {
      this.setState({activeTag: id})
    }
  }

  addTasks = event => {
    event.preventDefault()
    const {inputVal, selectInput, tasksData} = this.state

    const newData = {
      id: v4(),
      taskName: inputVal,
      taskTag: selectInput,
      selectedId: selectInput.toUpperCase(),
    }

    this.setState({tasksData: [...tasksData, newData], inputVal: ''})
  }

  getFilteredTask = () => {
    const {activeTag, tasksData} = this.state
    if (activeTag === '') {
      return tasksData
    }
    const filteredData = tasksData.filter(
      eachItem => eachItem.selectedId === activeTag,
    )

    return filteredData
  }

  renderNoTaskView = () => (
    <div className="no-task-view-container">
      <p className="no-task-view-heading">No Tasks Added Yet</p>
    </div>
  )

  render() {
    const {inputVal, activeTag, selectInput} = this.state
    const filteredTasks = this.getFilteredTask()
    const isEmpty = filteredTasks.length === 0
    return (
      <div className="page-bg-container">
        <div className="add-task-container">
          <form className="from-container" onSubmit={this.addTasks}>
            <h1 className="form-heading">Create a task!</h1>
            <label htmlFor="TaskInput" className="label-text">
              Task
            </label>
            <input
              id="TaskInput"
              type="text"
              className="task-input"
              placeholder="Enter the task here"
              onChange={this.onChangeInput}
              value={inputVal}
            />
            <label htmlFor="TagsInput" className="label-text">
              Tags
            </label>
            <select
              id="TagsInput"
              className="task-input"
              onChange={this.onChangeOption}
              value={selectInput}
            >
              {tagsList.map(eachTag => (
                <option value={eachTag.optionId} key={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
            <button className="add-task-btn" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="tasks-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tags-container">
            {tagsList.map(eachList => (
              <TagItem
                key={eachList.optionId}
                eachList={eachList}
                onChangeTag={this.onChangeTag}
                isActive={activeTag === eachList.optionId}
              />
            ))}
          </ul>
          <h1 className="tags-heading">Tasks</h1>
          <ul className="tasks-list-container">
            {filteredTasks.map(eachList => (
              <TasksItem key={eachList.id} eachList={eachList} />
            ))}
          </ul>
          {isEmpty && this.renderNoTaskView()}
        </div>
      </div>
    )
  }
}
export default MyTasks
