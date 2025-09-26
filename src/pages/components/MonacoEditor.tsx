import { useRef, useEffect } from 'react'
import { editor, type IDisposable } from 'monaco-editor'
import CreateEditor from './CreateEditor'

export interface HomeType {
  language?: string
  value: string
  theme?: string
  options?: editor.IEditorOptions & editor.IGlobalEditorOptions
  onDidValueChange?: (value: string) => void
}

const MonacoEditor: React.FC<HomeType> = ({
  language = 'plaintext',
  value = '',
  theme = 'vs',
  onDidValueChange,
  options,
}) => {
  const lastSubscriptionRef = useRef<IDisposable>(null)

  const modelRef = useRef<editor.ITextModel>(null)
  if (!modelRef.current) {
    modelRef.current = editor.createModel(value, language)
  }

  // const modelRef = useRef(editor.createModel(value, language))

  useEffect(() => {
    // 更新模型值
    if (modelRef.current!.getValue() !== value) {
      modelRef.current!.setValue(value)
    }

    // 更新语言
    const currentLanguage = modelRef.current!.getLanguageId()
    if (currentLanguage !== language) {
      editor.setModelLanguage(modelRef.current!, language)
    }
  }, [language, value])

  // 处理 onDidValueChange 事件订阅
  useEffect(() => {
    if (lastSubscriptionRef.current) {
      lastSubscriptionRef.current.dispose()
      lastSubscriptionRef.current = null
    }

    if (onDidValueChange) {
      lastSubscriptionRef.current = modelRef.current!.onDidChangeContent(() => {
        onDidValueChange(modelRef.current!.getValue())
      })
    }

    // 清理函数
    return () => {
      lastSubscriptionRef.current?.dispose()
    }
  }, [onDidValueChange])

  return (
    <CreateEditor
      readOnly={!onDidValueChange}
      model={modelRef.current}
      theme={theme}
      options={options}
    ></CreateEditor>
  )
}
export default MonacoEditor
