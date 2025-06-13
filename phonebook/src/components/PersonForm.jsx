const PersonForm = props => {

    const { onSavePerson, newName, onNewName, newNumber, onNewNumber } = props

    return (
        <form onSubmit={onSavePerson}>
        <div>
            name: <input value={newName} onChange={onNewName} />
        </div>
        <div>
            number: <input value={newNumber} onChange={onNewNumber} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )
}

export default PersonForm