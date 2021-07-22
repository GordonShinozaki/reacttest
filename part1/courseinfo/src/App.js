import React from 'react'

const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
      {props.name} {props.exercise}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name = {props.part1} exercise = {props.exercise1}/>
      <Part name = {props.part2} exercise = {props.exercise2}/>
      <Part name = {props.part3} exercise = {props.exercise3}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.age}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header course = {course}/>
      <Content part1={part1.name} exercises1 = {part1.exercises} part2 = {part2.name} exercises2 = {part2.exercises} part3 = {part3.name} exercises3 = {part3.exercises}/>
      <Total age = {part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App