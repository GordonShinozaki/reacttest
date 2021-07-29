import React from 'react'

const Filter = ({newfilter, handleFilter, filterimp}) => {
    return (
    <form>
    <div>Filter: <input value={newfilter} onChange ={handleFilter}/></div>
    <div><button type="submit" onClick = {filterimp}>add</button> </div>
  </form>
    )
  }

export default Filter