/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  /** 마지막으로 빌드한 달 (YYYY.MM). vite.config.ts의 define이 넣는다. 테스트 환경에는 없다 */
  readonly VITE_LAST_UPDATED?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
