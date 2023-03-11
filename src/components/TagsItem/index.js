import './index.css'

const TagItem = props => {
  const {eachList, onChangeTag, isActive} = props
  const {displayText, optionId} = eachList
  const changeTag = () => {
    onChangeTag(optionId)
  }
  return (
    <li className="list-item-container">
      <button
        className={`tag-buttons ${isActive && 'active-button'}`}
        type="button"
        onClick={changeTag}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
