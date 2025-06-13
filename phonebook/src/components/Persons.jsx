const Person = props => {
    const { person, onDeletePerson } = props
    return (
        <p>{person.name} {person.number}
            <button onClick={onDeletePerson}>Delete</button>
        </p>
    )
}

const Persons = props => {
    const { persons, deletePerson } = props
    return (
        <div>
            {props.persons.map(p => <Person key={p.id} person={p} onDeletePerson={()=>deletePerson(p.id)}/>)}
        </div>
    )
}

export default Persons