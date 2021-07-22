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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
      name: 'Fundamentals of React',
      exercises: 10
      },
      {
      name: 'Using props to pass data',
      exercises: 7
      },
      {
      name: 'State of a component',
      exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course = {course.name}/>
      <Content part1={course.parts[0].name} exercises1 = {course.parts[0].exercises} part2 = {course.parts[1].name} exercises2 = {course.parts[1].exercises} part3 = {course.parts[2].name} exercises3 = {course.parts[2].exercises}/>
      <Total age = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

export default App