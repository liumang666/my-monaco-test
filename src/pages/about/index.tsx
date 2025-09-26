import { useEffect, useState } from 'react'
import MonacoDiffEditor from '@/pages/components/MonacoDiffEditor'

const About = () => {
  const [originalValue, setOriginalValue] = useState('')
  const [modifiedValue, setModifiedValue] = useState('')

  const getValue = async () => {
    const originalValue = (await import(`@/assets/diff-sample/original.txt?raw`)).default
    const modifiedValue = (await import(`@/assets/diff-sample/modified.txt?raw`)).default
    setOriginalValue(originalValue)
    setModifiedValue(modifiedValue)
  }

  useEffect(() => {
    getValue()
  }, [])

  return (
    <div
      style={{
        height: '400px',
      }}
    >
      <MonacoDiffEditor
        originalValue={originalValue}
        modifiedValue={modifiedValue}
        language="typescript"
      ></MonacoDiffEditor>
    </div>
  )
}
export default About
