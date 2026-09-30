# Lilac

React 19 + TypeScript + Vite + pnpm 기반 SPA 프로젝트

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
│   └── portfolio.ts       # 이력·프로젝트 등 내용 (지금은 자리표시자)
├── components/            # 재사용 가능한 컴포넌트
│   ├── layout/            # Layout(본문 바로가기 + Header + Outlet + Footer), Header
│   ├── loading/           # Loading (spinner / pulse 타입)
│   └── ui/                # 여러 화면이 같이 쓰는 작은 조각 (BlockMark, Icon, SectionHeading)
├── hooks/                 # 커스텀 훅
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
├── styles/                # 전역 스타일, 디자인 토큰, 글꼴
│   ├── fonts.ts           # 글꼴 불러오기
│   ├── global.scss        # 초기화, 기본 글꼴·색, 포커스, 움직임 줄이기
│   ├── mixins.scss        # 반복 스타일 (container, mono-label 등)
│   └── variables.scss     # 디자인 토큰 (색, 글꼴, 모서리, 그림자, 레이아웃)
├── test/                  # 테스트 설정 및 모킹
└── utils/                 # 유틸리티 함수 (helpers)
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

### 네비게이션

`NavLink`를 사용한 활성 링크 스타일링:

```tsx
<NavLink to={Menus.Home} className={({ isActive }) => (isActive ? 'active' : '')} end>
  홈
</NavLink>
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
  padding: $spacing-md;
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

Zustand로 전역 상태를 관리하며, `devtools` 미들웨어가 적용되어 있습니다.

```tsx
import { useExampleStore } from '@/stores/useExampleStore'

const Component = () => {
  const { count, increment } = useExampleStore()

  return <button onClick={increment}>{count}</button>
}
```

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
- **Footer** — 하단 푸터

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

기존 색 변수(`$primary-color` 등)는 새 토큰을 가리키도록 남겨 두었습니다. 404·로딩 화면을 새 디자인으로 바꾸면서 정리합니다.

### 글꼴

| 변수            | 글꼴                | 용도           |
| --------------- | ------------------- | -------------- |
| `$font-sans`    | Pretendard          | 한글 본문·제목 |
| `$font-display` | Bricolage Grotesque | 영문·숫자 강조 |
| `$font-mono`    | JetBrains Mono      | 라벨·날짜·시각 |

글꼴 파일은 npm 패키지에서 불러와(`src/styles/fonts.ts`) 사이트가 직접 제공합니다. 외부 CDN을 부르지 않습니다. 세 글꼴 모두 SIL Open Font License 1.1입니다.

### 간격 / 모서리 / 그림자 / 레이아웃

- `$spacing-xs` ~ `$spacing-xxl` — 간격
- `$font-size-xs` ~ `$font-size-xxl` — 글자 크기
- `$radius-sm` ~ `$radius-2xl`, `$radius-pill` — 모서리 반경 (`$border-radius-*`는 기존 값)
- `$shadow-sm` ~ `$shadow-lg` — 그림자
- `$content-max-width`(1200px), `$page-gutter`(40px), `$section-padding-y`(90px) — 레이아웃
- `$z-index-dropdown`, `$z-index-modal`, `$z-index-tooltip` — z-index 레이어

### 믹스인

| 믹스인            | 용도                                                  |
| ----------------- | ----------------------------------------------------- |
| `container`       | 콘텐츠를 가운데 정렬하고 최대 폭(1200px)을 제한       |
| `mono-label`      | 모노 라벨 (예: `01 — WORK`)                           |
| `visually-hidden` | 화면에는 숨기고 스크린리더만 읽게 함                  |
| `reduced-motion`  | 움직임 줄이기 설정을 켠 사용자에게만 적용             |
| `tone-modifiers`  | 색 이름(`$tones`)마다 `--lilac` 같은 바탕색 수정자 생성 |

### 반응형 디자인

```scss
@media (max-width: $breakpoint-tablet) {
  // 768px 이하
}

@media (max-width: $breakpoint-mobile) {
  // 480px 이하
}
```

브레이크포인트: `$breakpoint-mobile`(480px), `$breakpoint-tablet`(768px), `$breakpoint-desktop`(1024px), `$breakpoint-wide`(1280px)

## 현재 구현 상태

초기 세팅 단계로, 다음 항목은 아직 미완성입니다.

- **홈 화면** — 첫 화면(`/`)으로 연결되어 있지만 아직 내용이 비어 있습니다.
- **API 도메인** — `vite.config.ts`의 `getApiDomain()`이 모든 mode에서 빈 문자열을 반환합니다. 서버 데이터를 쓰게 되면 실제 서버 주소 설정이 필요합니다.
- `useExample.ts`, `useExampleStore.ts`는 참고용 예시 코드입니다.

## 관련 문서

- [DEVELOPMENT.md](DEVELOPMENT.md) — 개발 워크플로우, 코드 품질 도구, 테스트 가이드
- [PERFORMANCE_ANALYSIS.md](PERFORMANCE_ANALYSIS.md) — 성능 분석
