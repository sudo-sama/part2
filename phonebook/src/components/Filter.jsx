const Filter = props => {
    const { filter, onFilter } = props
    return (
        <div>
          show with filter: <input value={filter} onChange={onFilter}/>
        </div>
    )
}

export default Filter