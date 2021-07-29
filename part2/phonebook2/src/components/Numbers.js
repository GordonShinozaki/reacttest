import React from 'react'

const Numbers = ({listofthings}) => {
    return (
    <ul>
    {listofthings.map(person =>
      <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
    )
  }

export default Numbers