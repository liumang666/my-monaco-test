export interface QueryType {
  id: string
}

export const TestType = {
  Key: 'Key',
  Value: 'Value',
  Map: 'Map',
} as const

export type TestType = (typeof TestType)[keyof typeof TestType]
