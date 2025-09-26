import { useRef, useEffect } from 'react'
import { editor } from 'monaco-editor'
import CreateDiffEditor from './CreateDiffEditor'

export interface HomeType {
  language?: string
  originalValue: string
  modifiedValue: string
}

const MonacoEditor: React.FC<HomeType> = ({ language = 'plaintext', originalValue = '', modifiedValue = '' }) => {
  const originalModel = useRef<editor.ITextModel>(null)
  if (!originalModel.current) {
    originalModel.current = editor.createModel(originalValue, language)
  }
  const modifiedModel = useRef<editor.ITextModel>(null)
  if (!modifiedModel.current) {
    modifiedModel.current = editor.createModel(modifiedValue, language)
  }

  useEffect(() => {
    // 更新模型值
    if (originalModel.current!.getValue() !== originalValue) {
      originalModel.current!.setValue(originalValue)
    }

    if (modifiedModel.current!.getValue() !== modifiedValue) {
      modifiedModel.current!.setValue(modifiedValue)
    }

    // 更新语言
    const originalLanguage = originalModel.current!.getLanguageId()
    if (originalLanguage !== language) {
      editor.setModelLanguage(originalModel.current!, language)
    }

    const modifiedLanguage = modifiedModel.current!.getLanguageId()
    if (modifiedLanguage !== language) {
      editor.setModelLanguage(modifiedModel.current!, language)
    }
  }, [language, originalValue, modifiedValue])

  return (
    <CreateDiffEditor
      originalModel={originalModel.current}
      modifiedModel={modifiedModel.current}
    ></CreateDiffEditor>
  )
}
export default MonacoEditor
