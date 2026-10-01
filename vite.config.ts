import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => {
  // 환경 변수 로드 (향후 env 기반 설정 시 사용)
  // const env = loadEnv(mode, process.cwd(), '')

  // 환경별 API 도메인
  const getApiDomain = () => {
    switch (mode) {
      case 'development':
        return ''
      default:
        return ''
    }
  }

  console.log('getApiDomain :: ', getApiDomain(), ' // mode :: ', mode)

  // 사이트 푸터의 "마지막 업데이트": 빌드(또는 개발 서버를 켠) 달을 서울 시각 기준 YYYY.MM으로 넣는다
  const SEOUL_OFFSET_MS = 9 * 60 * 60 * 1000
  const lastUpdated = new Date(Date.now() + SEOUL_OFFSET_MS).toISOString().slice(0, 7).replace('-', '.')

  return {
    define: {
      'import.meta.env.VITE_LAST_UPDATED': JSON.stringify(lastUpdated),
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *; @use "@/styles/mixins.scss" as *;`,
          api: 'modern-compiler',
        },
      },
    },
    server: {
      port: 5055,
      proxy: {
        // /api/v1로 시작하는 모든 요청을 API 서버로 프록시
        '/api/v1': {
          target: getApiDomain(),
          changeOrigin: true,
          secure: false,
          ws: true,
          headers: {
            Host: '',
            Origin: getApiDomain(),
          },
        },
      },
      cors: true,
    },
  }
})
