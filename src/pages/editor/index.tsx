import { useState } from 'react'
import { Select } from 'antd'
import MonacoEditor from '@/pages/components/MonacoEditor'
import { languages as monacoLanguages } from 'monaco-editor'

interface OptionItem {
  value: string
  label: string
}
const themes: OptionItem[] = [
  {
    label: 'Visual Studio',
    value: 'vs',
  },
  {
    label: 'Visual Studio Dark',
    value: 'vs-dark',
  },
  {
    label: 'High Contrast Dark',
    value: 'hc-black',
  },
]
const languages: OptionItem[] = monacoLanguages.getLanguages().map((item) => {
  return {
    label: item.id,
    value: item.id,
  }
})
console.log(2345)
export interface HomeType {
  language: string
  value: string
  theme: 'vs' | 'vs-dark' | 'hc-black'
}

const Home = () => {
  const [language, setLanguage] = useState<string | undefined>()
  const [theme, setTheme] = useState<string | undefined>(themes[0].value)
  const [value, setValue] = useState('')

  const handleLanguageChange = async (languageId: string) => {
    setLanguage(languageId)
    const result = (await import(`./home-samples/sample.${languageId}.txt?raw`)).default
    setValue(result)
  }

  return (
    <>
      <div style={{ margin: '20px 20px 0' }}>
        <Select
          value={theme}
          options={themes}
          style={{ width: '200px' }}
          onChange={setTheme}
        ></Select>
        <Select
          value={language}
          options={languages}
          style={{ width: '200px' }}
          onChange={handleLanguageChange}
        ></Select>

        <div
          style={{
            height: '400px',
            border: '1px solid #eee',
            marginTop: '20px',
          }}
        >
          <MonacoEditor
            language={language}
            value={value}
            theme={theme}
            onDidValueChange={(val) => setValue(val)}
            options={{
              minimap: {
                enabled: false,
              },
            }}
          ></MonacoEditor>
        </div>
      </div>
    </>
  )
}
export default Home
