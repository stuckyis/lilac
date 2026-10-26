# Lilac

프론트엔드 엔지니어 포트폴리오 사이트입니다. 한 화면(홈)에서 작업, 일하는 방식, 경력, 기술을 짧게 볼 수 있습니다.

React 19 + TypeScript + Vite + pnpm 기반 SPA입니다.

## 기술 스택

| 영역          | 사용 기술                                        |
| ------------- | ------------------------------------------------ |
| UI            | React 19                                         |
| 언어          | TypeScript 6.0                                   |
| 빌드 도구     | Vite 8                                           |
| 패키지 매니저 | pnpm 12                                          |
| 라우팅        | React Router 8 (`react-router`)                  |
| 서버 상태     | TanStack Query 5                                 |
| HTTP 클라이언트 | Axios                                          |
| 전역 상태     | Zustand 5                                        |
| 스타일링      | SCSS (Sass) + clsx                               |
| 글꼴          | Pretendard, Bricolage Grotesque, JetBrains Mono  |
| 테스트        | Vitest 5 + Testing Library + jsdom               |
| 코드 품질     | ESLint 10 + Prettier 3                           |
| 기타          | vite-plugin-svgr (SVG를 React 컴포넌트로 import) |

## 시작하기

### 패키지 설치

Node.js 22.12 이상과 pnpm 12가 필요합니다. (Vitest 5가 Node.js 22.12 이상을 요구합니다.)

```bash
pnpm install
```

### 환경 변수

프로젝트 루트의 `.env` 파일에 API 서버 주소를 설정합니다.

```bash
VITE_API_BASE_URL=https://api.example.com
```

값이 비어 있으면 Axios가 상대 경로로 요청하며, 개발 환경에서는 Vite 프록시를 타게 됩니다.

### 개발 서버 실행

```bash
pnpm dev
```

개발 서버는 `http://localhost:5055`에서 실행됩니다. (`pnpm dev`는 `pnpm install`을 먼저 수행합니다.)

### 빌드 / 프리뷰

```bash
pnpm build     # tsc -b 후 vite build
pnpm preview   # 빌드 결과 미리보기
```

## 화면 구성

홈(`/`)은 위에서 아래로 다음 섹션을 차례로 보여줍니다. 섹션 코드는 `src/pages/home/sections/<폴더>/`에, 내용은 `src/data/portfolio.ts`에 있습니다.

| 순서 | 섹션           | 헤더 메뉴 (id)        | 폴더             | 내용 (`portfolio.ts`)                |
| ---- | -------------- | --------------------- | ---------------- | ------------------------------------ |
| 1    | 첫 화면        | -                     | `Hero`           | `PROFILE`, `INTRO`                   |
| 2    | 숫자 띠        | -                     | `Stats`          | `STATS`                              |
| 3    | 제품 로고 띠   | -                     | `ProductMarquee` | `PRODUCTS`                           |
| 4    | 대표 작업      | 작업 (`#work`)        | `Work`           | `WORKS`, `MORE_WORKS`                |
| 5    | 일하는 방식    | 일하는 방식 (`#way`)  | `Way`            | `PRINCIPLES`                         |
| 6    | 경력           | 경력 (`#career`)      | `Career`         | `CAREER_TITLE`, `CAREER`, `ARCHIVE`  |
| 7    | 기술 스택      | 기술 (`#stack`)       | `Stack`          | `STACK`                              |
| 8    | 이 화면의 구조 | 구조 (`#behind`)      | `Behind`         | `BEHIND_NOTES`                       |
| 9    | 연락 + 푸터    | - (`#contact`)        | `Contact`        | `PROFILE`(이메일, GitHub·LinkedIn)   |

- **헤더**: 블록 로고(누르면 맨 위로)와 섹션 메뉴. 지금 보는 섹션의 메뉴가 어두운 알약으로 표시됩니다.
- **404**: 없는 주소로 들어오면 한 칸이 빠진 블록 마크와 "홈으로 돌아가기"를 보여줍니다.
- 화면 폭에 따라 세 가지로 보여줍니다. PC(1024px 이상, 1440px 기준), 태블릿(768~1023px), 모바일(768px 미만, 390px 기준. 320px까지 확인)
  - 1024px 미만: 헤더 메뉴가 메뉴 버튼 + 펼침 메뉴로, 대표 작업이 탭에서 아코디언으로, 경력이 세로 타임라인으로, "이 화면의 구조"가 1열 카드(태블릿은 그림이 왼쪽)로 바뀝니다.
  - 768px 미만: 섹션마다 모바일 시안의 크기·배치를 씁니다(카드 세로 쌓기 등). "그 밖의 작업"도 1열로 쌓습니다.
  - 가로로 넘기는 카드 줄은 두지 않습니다. 어느 폭에서나 페이지는 세로로만 스크롤됩니다.

## 콘텐츠 수정 방법

| 바꿀 것                       | 고칠 곳                                                                 |
| ----------------------------- | ----------------------------------------------------------------------- |
| 화면에 보이는 내용            | `src/data/portfolio.ts`                                                 |
| 브라우저 탭 제목, 검색·공유 미리보기 | `src/data/site.ts` (`title`, `description`, `url`)              |
| 사진·로고·작업 캡처           | `public/images/`에 파일을 넣고 `portfolio.ts`에 주소를 적는다           |
| 파비콘, 공유 미리보기 이미지  | `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `og-image.png` |

- **내용**: `portfolio.ts`만 고치면 화면에 반영됩니다. 지금은 `[이름]`, `[YYYY]` 같은 자리표시자가 들어 있습니다. 각 칸의 뜻과 예시는 `src/data/type.ts`의 주석에 있습니다.
- **사이트 정보**: `site.ts`의 제목·설명은 빌드할 때 `index.html`의 `<title>`, `description`, 공유 미리보기(Open Graph) 태그로 들어갑니다(`vite.config.ts`의 `siteMeta` 플러그인). 링크 미리보기를 만드는 크롤러는 JS를 실행하지 않아서 HTML에 미리 넣습니다.
  - `url`에 배포 주소(예: `https://example.com`)를 적으면 공유 이미지(`og-image.png`)와 주소 태그도 들어갑니다. 비워 두면 넣지 않습니다.
  - 이름을 바꾸면 `portfolio.ts`의 `PROFILE.name`과 `site.ts`를 함께 고칩니다.
- **이미지**: `public/images/profile.jpg`에 넣었다면 `'/images/profile.jpg'`처럼 적습니다. 비워 두면 색 칸(`tone`)이나 자리표시 원이 대신 보입니다.
  - 프로필 사진 `PROFILE.photoUrl`, 제품 로고 `PRODUCTS[].logoUrl`, 대표 작업 캡처 `WORKS[].imageUrl`, 그 밖의 작업 `MORE_WORKS[].imageUrl`
- **링크**: 케이스 스터디(`WORKS[].caseUrl`)와 그 밖의 작업(`MORE_WORKS[].url`)은 주소를 적었을 때만 버튼·링크가 됩니다.
- **색 칸**: `tone`에 `TONE.LILAC`처럼 색 이름을 적습니다(`src/data/const.ts`). 실제 색은 `src/styles/variables.scss`의 `$tones`에 있습니다.
- **마지막 업데이트**: 연락 섹션 아래의 날짜는 빌드한 달(서울 기준)이 자동으로 들어갑니다.

## 스크립트

| 명령어               | 설명                          |
| -------------------- | ----------------------------- |
| `pnpm dev`           | 개발 서버 실행 (포트 5055)    |
| `pnpm build`         | 타입 체크 후 프로덕션 빌드    |
| `pnpm preview`       | 빌드 결과 로컬 미리보기       |
| `pnpm lint`          | ESLint 검사                   |
| `pnpm lint:fix`      | ESLint 검사 및 자동 수정      |
| `pnpm format`        | Prettier 포맷팅               |
| `pnpm format:check`  | 포맷 검사만 수행              |
| `pnpm test`          | 테스트 실행 (watch 모드)      |
| `pnpm test:run`      | 테스트 1회 실행               |
| `pnpm test:ui`       | Vitest UI 모드                |
| `pnpm test:coverage` | 커버리지 측정                 |

## 프로젝트 구조

```
src/
├── index.tsx              # 진입점 (createRoot + StrictMode)
├── app.tsx                # QueryClientProvider, bfcache 복원 처리
├── assets/                # 이미지, SVG 등 정적 리소스
├── data/                  # 화면에 들어가는 내용
│   ├── const.ts           # 색 이름(TONE) 등 콘텐츠에서 쓰는 상수
│   ├── type.ts            # 콘텐츠 타입
│   ├── portfolio.ts       # 이력·프로젝트 등 내용 (지금은 자리표시자)
│   └── site.ts            # 사이트 제목·설명 (빌드할 때 index.html에 들어감)
├── components/            # 재사용 가능한 컴포넌트
│   ├── layout/            # Layout(본문 바로가기 + Header + Outlet), Header
│   ├── loading/           # Loading (spinner / pulse 타입)
│   └── ui/                # 여러 화면이 같이 쓰는 작은 조각 (BlockMark, Icon, SectionHeading)
├── hooks/                 # 커스텀 훅
│   ├── useActiveSection.ts # 지금 보는 섹션 찾기 (IntersectionObserver)
│   ├── useExample.ts      # TanStack Query 사용 예시
│   ├── useScrolled.ts     # 스크롤 여부 (헤더 모양 전환)
│   └── useSeoulTime.ts    # 서울 시각 HH:mm (지금은 쓰지 않음)
├── pages/                 # 페이지 컴포넌트
│   ├── index.ts           # lazy()로 페이지 일괄 export
│   ├── home/              # 홈 (첫 화면). 섹션은 sections/<섹션>/에 있다 (Hero 등)
│   └── errorPage/         # 404
├── request/               # API 통신 레이어
│   ├── axios.ts           # axiosInstance, fetchApi 래퍼
│   └── const.ts           # API_BASE_DOMAIN, HTTP_METHOD, API 엔드포인트
├── routes/                # 라우팅 설정
│   ├── index.tsx          # Suspense + BrowserRouter + Routes
│   └── const.ts           # Menus 경로 상수, SECTION_ID(홈 섹션 id)
├── stores/                # Zustand 스토어
│   ├── useExampleStore.ts # 사용 예시
│   └── useSectionStore.ts # 지금 보는 섹션 (홈이 쓰고 헤더가 읽음)
├── styles/                # 전역 스타일, 디자인 토큰, 글꼴
│   ├── fonts.ts           # 글꼴 불러오기
│   ├── global.scss        # 초기화, 기본 글꼴·색, 포커스, 스크롤 등장 효과, 움직임 줄이기
│   ├── mixins.scss        # 반복 스타일 (container, mono-label 등)
│   └── variables.scss     # 디자인 토큰 (색, 글꼴, 모서리, 그림자, 레이아웃)
├── test/                  # 테스트 설정 및 모킹
└── utils/                 # 유틸리티 함수 (helpers), 스크롤 등장 효과(reveal.ts)
```

## 라우트 구조

| 경로 | 컴포넌트   | 비고                         |
| ---- | ---------- | ---------------------------- |
| `/`  | `Home`     | 첫 화면, `Layout`으로 감싸짐 |
| `/*` | `NotFound` | 정의되지 않은 모든 경로      |

로그인·계정 기능이 없는 공개 사이트라서 모든 화면을 누구나 볼 수 있습니다.

경로 문자열은 [`src/routes/const.ts`](src/routes/const.ts)의 `Menus` 상수로 관리합니다. 홈 화면의 섹션 id(`#work` 등)는 같은 파일의 `SECTION_ID`로 관리하고, 헤더 메뉴와 각 섹션이 함께 씁니다.

```tsx
export const Menus = {
  Home: '/',
} as const
```

## 주요 기능

### 라우팅

`react-router`의 선언적 `<Routes>` 방식을 사용하며, 페이지는 `lazy()`로 코드 스플리팅됩니다.
로딩 중에는 `<Suspense>`의 fallback으로 `Loading` 컴포넌트가 표시됩니다.

```tsx
// src/routes/index.tsx
<Suspense fallback={<Loading />}>
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path={Menus.Home} element={<Pages.Home />} />
      </Route>
      <Route path="*" element={<Pages.NotFound />} />
    </Routes>
  </BrowserRouter>
</Suspense>
```

페이지를 추가할 때는 `src/pages/index.ts`에 `lazy()` 항목을 등록하고, `Menus`에 경로를 추가한 뒤 `<Route>`를 연결합니다.

### 헤더 메뉴 (지금 보는 섹션)

헤더 메뉴는 `#work` 같은 섹션 id로 이동합니다. 지금 보는 섹션은 다음처럼 표시합니다.

1. 홈이 `useActiveSection`으로 섹션들을 지켜봅니다. `IntersectionObserver`로 화면 위에서 40% 지점의 얇은 띠에 걸친 섹션을 찾습니다.
2. 찾은 id를 Zustand 스토어 `useSectionStore`에 넣습니다. 띠에 걸친 섹션이 없으면(첫 화면 등) `null`입니다.
3. 헤더가 스토어 값을 읽어 해당 메뉴에 `aria-current="true"`와 어두운 알약 모양을 붙입니다.

헤더는 `Layout`에, 섹션은 `<Outlet />`(홈)에 있어서 props로 이어지지 않기 때문에 스토어로 연결합니다.

```tsx
// src/pages/home/index.tsx — 섹션을 가진 쪽이 지켜본다
useActiveSection(SECTION_IDS)

// src/components/layout/Header/index.tsx — 메뉴는 값만 읽는다
const activeId = useSectionStore(state => state.activeId)
```

### Path Alias

`@` 별칭으로 `src` 폴더를 참조합니다. (`vite.config.ts`, `tsconfig.json`에 설정)

```tsx
import Loading from '@/components/loading'
import { useExampleStore } from '@/stores/useExampleStore'
import { API } from '@/request/const'
```

### SCSS 전역 변수 · 믹스인

`variables.scss`와 `mixins.scss`는 Vite 설정의 `additionalData`로 모든 SCSS 파일에 자동 주입되므로 별도 import 없이 사용할 수 있습니다.

```scss
.my-component {
  @include container;
  color: $color-accent;
  border-radius: $radius-xl;
}
```

### SVG Import

`?react` 쿼리로 SVG를 React 컴포넌트처럼 사용할 수 있습니다.

```tsx
import Logo from '@/assets/example.svg?react'

const Component = () => <Logo className="icon" />
```

### API 호출

`request/const.ts`의 `API` 객체에 엔드포인트를 정의하고, `fetchApi` 래퍼와 TanStack Query를 조합합니다.

```ts
// 예시: src/request/const.ts에 엔드포인트 추가
export const API = {
  Example: {
    List: `${API_BASE_PATH}/examples`,
  },
}

// 예시: 사용하는 쪽
const useExampleList = () =>
  useQuery({
    queryKey: ['examples'],
    queryFn: () => fetchApi({ method: HTTP_METHOD.GET, url: API.Example.List }),
  })
```

`axiosInstance`를 직접 사용하는 예시는 [`src/hooks/useExample.ts`](src/hooks/useExample.ts)를 참고하세요.

개발 환경에서는 `/api/v1`로 시작하는 요청이 Vite 프록시를 통해 API 서버로 전달됩니다. (`vite.config.ts`의 `server.proxy`)

### 상태 관리

Zustand로 여러 화면이 함께 쓰는 상태를 관리합니다. `devtools` 미들웨어를 붙여 개발 중에 Redux DevTools로 값을 볼 수 있습니다(`useSectionStore`는 개발 모드에서만 켜짐). 컴포넌트에서는 selector로 필요한 값만 구독합니다(다른 값이 바뀌어도 다시 그리지 않습니다).

```tsx
import { useSectionStore } from '@/stores/useSectionStore'

const Component = () => {
  const activeId = useSectionStore(state => state.activeId)

  return <p>지금 보는 섹션: {activeId ?? '없음'}</p>
}
```

`src/stores/useExampleStore.ts`는 참고용 예시입니다.

### 로딩 컴포넌트

`spinner`(기본)와 `pulse` 두 가지 타입을 지원합니다.

```tsx
import Loading from '@/components/loading'
import { LOADING_TYPE } from '@/components/loading/const'

<Loading />
<Loading type={LOADING_TYPE.PULSE} />
```

## 레이아웃 구조

`Layout`으로 감싸진 페이지는 다음 요소를 포함합니다.

- **본문 바로가기** — 키보드 사용자가 메뉴를 건너뛰는 링크. 포커스를 받을 때만 보입니다
- **Header** — 화면 위에 고정된 헤더 (블록 로고, 섹션 메뉴). 스크롤하면 반투명 블록 모양으로 바뀝니다
- **Main Content** — `<Outlet />`으로 렌더링되는 페이지 콘텐츠

사이트 푸터(연도, 마지막 업데이트, 만든 기술)는 따로 두지 않고 홈의 연락 섹션 아래쪽에 넣었습니다.

## 스타일 가이드

디자인 토큰은 `src/styles/variables.scss`에 있습니다. 미색 바탕에 라일락·민트·버터·복숭아 파스텔을 쓰고, 강조색은 `#6b4fd8`입니다.

### 색상

| 변수                                               | 값        | 용도                                    |
| -------------------------------------------------- | --------- | --------------------------------------- |
| `$color-bg`                                        | `#faf7f1` | 미색 바탕                               |
| `$color-surface`                                   | `#ffffff` | 카드 바탕                               |
| `$color-ink`                                       | `#1f1b2d` | 본문 글자                               |
| `$color-muted`                                     | `#5e5870` | 보조 글자                               |
| `$color-accent`                                    | `#6b4fd8` | 강조: 라벨, 링크, 포커스                |
| `$color-accent-soft`                               | `#f3effc` | 강조색 연한 바탕                        |
| `$color-lilac-100` ~ `$color-peach-200`            |           | 파스텔 4종. 100은 넓은 면, 200은 작은 조각 |
| `$color-mint-ink`, `$color-butter-ink`             |           | 파스텔 바탕 위 글자                     |
| `$color-line-100` ~ `$color-line-300`              |           | 카드 테두리, 목록 구분선, 버튼 테두리   |
| `$color-dark`, `$color-on-dark`, `$color-on-dark-muted` |      | 어두운 영역과 그 위 글자                |

### 글꼴

| 변수            | 글꼴                | 용도           |
| --------------- | ------------------- | -------------- |
| `$font-sans`    | Pretendard          | 한글 본문·제목 |
| `$font-display` | Bricolage Grotesque | 영문·숫자 강조 |
| `$font-mono`    | JetBrains Mono      | 라벨·날짜·시각 |

글꼴 파일은 npm 패키지에서 불러와(`src/styles/fonts.ts`) 사이트가 직접 제공합니다. 외부 CDN을 부르지 않습니다. 세 글꼴 모두 SIL Open Font License 1.1입니다.

### 모서리 / 그림자 / 움직임 / 레이아웃

- `$radius-sm` ~ `$radius-4xl`, `$radius-pill` — 모서리 반경
- `$shadow-sm` ~ `$shadow-lg` — 그림자
- `$ease-soft` — 등장·전환 곡선
- `$content-max-width`(1200px), `$page-gutter`(40px), `$section-padding-y`(90px), `$header-offset`(20px) — 레이아웃
- `$z-index-header`, `$z-index-dropdown`, `$z-index-modal`, `$z-index-tooltip` — z-index 레이어

글자 크기와 간격은 섹션마다 시안의 값을 그대로 씁니다.

### 믹스인

| 믹스인            | 용도                                                  |
| ----------------- | ----------------------------------------------------- |
| `container`       | 콘텐츠를 가운데 정렬하고 최대 폭(1200px)을 제한       |
| `mono-label`      | 모노 라벨 (예: `01 — WORK`)                           |
| `visually-hidden` | 화면에는 숨기고 스크린리더만 읽게 함                  |
| `reduced-motion`  | 움직임 줄이기 설정을 켠 사용자에게만 적용             |
| `tone-modifiers`  | 색 이름(`$tones`)마다 `--lilac` 같은 바탕색 수정자 생성 |
| `dot-grid`        | 점 격자 배경 (첫 화면, 404)                           |
| `tablet`, `mobile` | 1024px 미만, 768px 미만에서만 적용 (`below($breakpoint)`로 직접 지정도 가능) |
| `hover`           | 마우스로 올려 둘 수 있는 기기에서만 `:hover` 적용      |

### 반응형 디자인

기본 스타일은 PC이고, 좁은 화면 스타일을 믹스인으로 덧씌웁니다(`src/styles/mixins.scss`).

```scss
.my-section {
  padding: 90px 0;

  @include tablet {
    // 1024px 미만 (태블릿·모바일)
    padding: 72px 0 56px;
  }

  @include mobile {
    // 768px 미만 (모바일)
    padding: 56px 0 40px;
  }

  // 마우스로 올려 둘 수 있는 기기에서만 (터치 화면은 누른 뒤 효과가 남지 않게)
  @include hover {
    color: $color-accent;
  }
}
```

화면 폭에 따라 컴포넌트 자체를 바꿀 때는 같은 구간을 TS에서 씁니다(`src/styles/breakpoints.ts`).

```tsx
const isCompact = useMediaQuery(MEDIA_QUERY.TABLET) // 1024px 미만이면 true

return isCompact ? <WorkAccordion /> : <WorkTabs />
```

- 브레이크포인트: `$breakpoint-mobile`(480px), `$breakpoint-tablet`(768px), `$breakpoint-desktop`(1024px), `$breakpoint-wide`(1280px). 값을 바꾸면 `breakpoints.ts`의 `BREAKPOINT`도 같이 고칩니다.
- 화면 가장자리 여백은 CSS 변수 `--page-gutter`입니다(PC 40px, 1024px 미만 32px, 768px 미만 20px). `container` 믹스인이 씁니다.
- 페이지가 옆으로 밀리지 않게 `.layout`이 화면 밖으로 넘친 부분을 자릅니다(`overflow-x: clip`, `src/components/layout/Layout.scss`). 넘침을 가리기만 하므로, 새 화면을 만들면 이 설정을 잠시 끄고 넘치는 요소가 없는지 확인합니다.

### 스크롤 등장 효과

화면에 들어올 때 32px 아래에서 흐릿하게 올라오게 하려면 요소의 `ref`에 `reveal`을 넘깁니다(`src/utils/reveal.ts`).

```tsx
import { reveal } from '@/utils/reveal'

<li ref={reveal} className="way__card">...</li>
```

- 아래로 내릴 때도, 위로 올릴 때도 나옵니다. 화면 밖으로 충분히 나가면 다시 숨겼다가, 들어오면 또 올라옵니다.
- 한 번에 여러 개가 들어오면(PC의 카드 한 줄 등) 왼쪽부터 0.09초씩 늦게 시작합니다.
- 키보드로 포커스가 들어가면 바로 보입니다. 움직임 줄이기 설정을 켠 사용자와 인쇄에서는 처음부터 보입니다.
- 메뉴가 가리키는 섹션(`section[id]`) 자체에는 붙이지 않고 안쪽 덩어리에 붙입니다. 섹션이 움직이면 메뉴로 이동하는 위치가 어긋납니다.
- 첫 화면(Hero)은 자체 등장 효과가 있어서 쓰지 않습니다.

## 현재 구현 상태

- **홈 화면** — PC(1024px 이상)·태블릿(768~1023px)·모바일(320px까지) 화면을 완성했습니다.
- **내용** — `src/data/portfolio.ts`와 `src/data/site.ts`의 내용은 아직 자리표시자(`[이름]` 등)입니다.
- **잠시 숨긴 기능** — 헤더의 서울 시각·이력서 버튼, 첫 화면의 이력서 버튼은 지우지 않고 `[숨김]` 주석으로 남겨 두었습니다.
- **API 도메인** — `vite.config.ts`의 `getApiDomain()`이 모든 mode에서 빈 문자열을 반환합니다. 서버 데이터를 쓰게 되면 실제 서버 주소 설정이 필요합니다.
- `useExample.ts`, `useExampleStore.ts`는 참고용 예시 코드입니다.

## 관련 문서

- [DEVELOPMENT.md](DEVELOPMENT.md) — 개발 워크플로우, 코드 품질 도구, 테스트 가이드
- [PERFORMANCE_ANALYSIS.md](PERFORMANCE_ANALYSIS.md) — 성능 분석
