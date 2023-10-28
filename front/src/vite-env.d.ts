/// <reference types="vite/client" />

type ImportMetaEnv = Record<string, string>

interface ImportMeta {
  readonly env: ImportMetaEnv
}
