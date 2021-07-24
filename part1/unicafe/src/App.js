import React, { useState } from 'react'

const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

const Content = ({text,value}) => {
  return (
    <p>{text}: {value}</p>
  )
}
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodsetbutton = (good) => {
    setGood(good)
  }
  const neutralsetbutton = (neutral) => {
    setNeutral(neutral)
  }
  const badsetbutton = (bad) => {
    setBad(bad)
  }
  return (
    <div>
      <Header title="Give Feedback"/>
      <Button handleClick={() => goodsetbutton(good+1)} text="good"/>
      <Button handleClick={() => neutralsetbutton(neutral+1)} text="neutral"/>
      <Button handleClick={() => badsetbutton(bad+1)} text="bad"/>
      <Header title="Statistics"/>
      <Content text="good" value = {good}/>
      <Content text="neutral" value = {neutral}/>
      <Content text="bad" value = {bad}/>

    </div>
  )
}

export default App