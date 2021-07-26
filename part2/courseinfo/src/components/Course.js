import React from "react"

const Course = ({course}) => {
    const Reducer = (accumulator, currentValue) => accumulator + currentValue
    return(
      <div>
      <h1>{course.name}</h1>
      {course.parts.map(part =>
        <p key={part.id}>
          {part.name} {part.exercises}
          </p>
          )}
      <p>Total of <b>{course.parts.map(part => part.exercises).reduce(Reducer)}</b> exercises</p>
      </div>
    )
  }

export default Course