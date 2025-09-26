import { useState } from 'react'
import SecondChild from './SecondChild'

const AboutChild = () => {
  console.log('AboutChild')

  const [count, setCount] = useState(0)
  const [id, setId] = useState(0)
  return (
    <>
      <div onClick={() => setCount(count + 1)}>次数：{count}</div>
      <div onClick={() => setId(id + 1)}>id：{id}</div>
      <SecondChild id={id}></SecondChild>
      <SecondChild></SecondChild>
    </>
  )
}
export default AboutChild
