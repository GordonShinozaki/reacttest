import React, { useState } from 'react'

const Header = () => (
  <h1>
    Anecdote of the day
  </h1>
)

const Subheader = () => (
  <h1>
    Anecdote with most votes
  </h1>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Anecdote = ({ anecdote }) => <p>{anecdote}</p>
const Votedisplay = ({votes}) => <p>has {votes} votes</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setpoints] = useState(new Array(anecdotes.length).fill(0))
  
  const randomAnecdote = () => {
    let randomNumber = Math.floor(Math.random() * 7);
    setSelected(randomNumber);
  }

  const newpoints = () => {
    const copy = [...points]
    copy[selected] += 1
    setpoints(copy)
  }
  const highestvotes = Math.max(...points)
  return (
    <div>
      <Header />
      <Anecdote anecdote = {anecdotes[selected]} />
      <Votedisplay votes = {points[selected]}/>
      <Button handleClick = {newpoints} text = "vote"/>
      <Button handleClick = {randomAnecdote} text = "next anecdote"/>
      <Subheader />
      <Anecdote anecdote = {anecdotes[points.indexOf(highestvotes)]} />
    </div>
  )
}

export default App