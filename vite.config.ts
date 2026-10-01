import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import svgr from 'vite-plugin-svgr'
import { SITE } from './src/data/site.ts'

/** 링크 공유 미리보기 이미지 (public/og-image.png) */
const OG_IMAGE = { path: '/og-image.png', width: 1200, height: 630 } as const

/** HTML 글자에 넣을 수 있게 특수 문자를 바꾼다 (태그 속성은 Vite가 바꿔 준다) */
const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * index.html의 제목 자리(`%SITE_TITLE%`)를 채우고, 설명·공유 미리보기(Open Graph) 태그를 넣는다. 내용은 src/data/site.ts에 있다.
 * 링크 미리보기를 만드는 크롤러(카카오톡, 슬랙 등)는 JS를 실행하지 않아서 HTML에 미리 들어 있어야 한다.
 */
const siteMeta = (): Plugin => ({
  name: 'site-meta',
  transformIndexHtml(html) {
    const meta = (key: 'name' | 'property', value: string, content: string): HtmlTagDescriptor => ({
      tag: 'meta',
      attrs: { [key]: value, content },
      injectTo: 'head',
    })
    const tags = [
      meta('name', 'description', SITE.description),
      meta('property', 'og:type', 'website'),
      meta('property', 'og:locale', 'ko_KR'),
      meta('property', 'og:title', SITE.title),
      meta('property', 'og:description', SITE.description),
    ]

    // 주소와 이미지는 절대 주소여야 해서, 배포 주소를 적었을 때만 넣는다
    if (SITE.url) {
      const home = `${SITE.url.replace(/\/+$/, '')}/`
      tags.push(
        { tag: 'link', attrs: { rel: 'canonical', href: home }, injectTo: 'head' },
        meta('property', 'og:url', home),
        meta('property', 'og:image', new URL(OG_IMAGE.path, home).href),
        meta('property', 'og:image:width', String(OG_IMAGE.width)),
        meta('property', 'og:image:height', String(OG_IMAGE.height)),
        meta('name', 'twitter:card', 'summary_large_image'),
      )
    }

    return { html: html.replaceAll('%SITE_TITLE%', escapeHtml(SITE.title)), tags }
  },
})

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
      siteMeta(),
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
