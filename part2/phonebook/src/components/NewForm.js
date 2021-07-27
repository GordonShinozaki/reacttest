import React from 'react'

const NewForm = ({name, namechange, number, numberchange, clickhandle}) => {
    return (
      <form>
        <div>name: <input value={name} onChange ={namechange}/></div>
        <div>number: <input value={number} onChange ={numberchange}/></div>
        <div><button type="submit" onClick = {clickhandle}>add</button> </div>
      </form>
    )
  }

export default NewForm