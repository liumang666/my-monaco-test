import React from 'react'

const SecondChild: React.FC<{ id?: number }> = ({ id }) => {
  console.log('SecondChild', id)

  return (
    <>
      <div>SecondChild:{id}</div>
    </>
  )
}
export default React.memo(SecondChild)
