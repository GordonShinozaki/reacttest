import React, { useState } from 'react'
import Filter from './components/Filter'
import NewForm from './components/NewForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newfilter, setNewFilter] = useState('')
  const [ results, setResults] = useState(persons)

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const handleNamechange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberchange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const addPerson = (event) => { //addname is called via an event 
    event.preventDefault() //stops page from automatically submitting shit 
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).includes(nameObject.name)){
      window.alert(`${nameObject.name} is already added to phonebook`)
    } else {
    setPersons(persons.concat(nameObject))
    setResults(results.concat(nameObject))
    setNewName('')
    setNewNumber('') //reset button states
    }
  }

  const filterimp = (event) =>{
    event.preventDefault()
    const perstoshow = persons.filter(person => person.name.toLowerCase().includes(newfilter.toLowerCase()))
    setResults(perstoshow)
    setNewFilter('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newfilter={newfilter} handleFilter = {handleFilter} filterimp = {filterimp} />
      <h2>Add a New</h2>
      <NewForm name = {newName} namechange = {handleNamechange} number = {newNumber} numberchange = {handleNumberchange} clickhandle = {addPerson}/>
      <h2>Numbers</h2>
      <Numbers listofthings = {results} />
    </div>
  )
}

export default App