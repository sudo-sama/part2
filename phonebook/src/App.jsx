import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const displayMessage = (msg, error) => {
    setMessage({msg: msg, error: error})
    setTimeout(()=>setMessage(null), 5000)
  }


  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])


  const onSavePerson = event => {
    event.preventDefault()

    const personExists = persons.find(p => p.name === newName)

    if (personExists) {
      alert(`${newName} already exists!`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(personObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
        displayMessage(`Added ${createdPerson.name}`, true)
      })
  }

  const onNewName = event => {
    setNewName(event.target.value)
  }

  const onNewNumber = event => {
    setNewNumber(event.target.value)
  }

  const onFilter = event => {
    setFilter(event.target.value)
  }

  const deletePerson = id => {

    const person = persons.find(p => p.id === id)

    if (confirm(`You want to delete ${person.name}?`))
      personsService
        .remove(id)
        .then(removedPerson => {
          setPersons(persons.filter(p => p.id !== id))
          displayMessage(`Info about ${person.name} has been removed`, false)
        })
        .catch(error => {
          displayMessage(`Info about ${person.name} has been already removed`, true)
          setPersons(persons.filter(p => p.id !== id))
        })
  }

  if (!persons) return null

  const personsToShow = persons.filter(p => p.name.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filter={filter} onFilter={onFilter} />
      <h2>Add a new</h2>
      <PersonForm
        onSavePerson={onSavePerson}
        onNewName={onNewName} newName={newName}
        onNewNumber={onNewNumber} newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App