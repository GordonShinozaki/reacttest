import React, { useState } from 'react'

const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

const Content = ({text,value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Body = (props) =>{
  if (props.all === 0) {
    return (
      <div>
        No Feedback Given
      </div>
    )
  }
  return(
  <table>
    <Content text={props.text0} value = {props.value0}/>
    <Content text={props.text1} value = {props.value1}/>
    <Content text={props.text2} value = {props.value2}/>
    <Content text= {props.alltext} value = {props.valueall} />
    <Content text= {props.avgtext} value = {props.valueavg} />
  </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = () => good+neutral+bad
  const average = () => ((good - bad)/all())
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
      <Body text0="good" value0= {good} text1="neutral" value1= {neutral} text2="bad" value2= {bad} alltext = "all" valueall = {all()} avgtext = "average" valueavg = {average()} />
    </div>
  )
}

export default App