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
├── components/            # 재사용 가능한 컴포넌트
│   ├── layout/            # Layout(Navigation + Outlet + Footer), Navigation
│   └── loading/           # Loading (spinner / pulse 타입)
├── hooks/                 # 커스텀 훅
│   └── useExample.ts      # TanStack Query 사용 예시
├── pages/                 # 페이지 컴포넌트
│   ├── index.ts           # lazy()로 페이지 일괄 export
│   ├── home/              # 홈
│   ├── login/             # 로그인 (index.tsx, loginApi.ts, type.ts)
│   ├── main/              # Outlet 래퍼
│   └── errorPage/         # 404
├── request/               # API 통신 레이어
│   ├── axios.ts           # axiosInstance, fetchApi 래퍼
│   ├── const.ts           # API_BASE_DOMAIN, HTTP_METHOD, API 엔드포인트
│   └── useIntercept.ts    # 응답 인터셉터 (401 처리)
├── routes/                # 라우팅 설정
│   ├── index.tsx          # Suspense + BrowserRouter + Routes
│   └── const.ts           # Menus 경로 상수
├── stores/                # Zustand 스토어
├── styles/                # 전역 스타일 및 변수
│   ├── global.scss
│   └── variables.scss
├── test/                  # 테스트 설정 및 모킹
└── utils/                 # 유틸리티 함수 (cookie, helpers)
```

## 라우트 구조

| 경로     | 컴포넌트     | 비고                     |
| -------- | ------------ | ------------------------ |
| `/`      | `Home`       | `Layout`으로 감싸짐      |
| `/login` | `Login`      | 레이아웃 없음            |
| `/*`     | `NotFound`   | 정의되지 않은 모든 경로  |

경로 문자열은 [`src/routes/const.ts`](src/routes/const.ts)의 `Menus` 상수로 관리합니다.

```tsx
export const Menus = {
  Home: '/',
  Login: '/login',
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
      <Route path={Menus.Login} element={<Pages.Login />} />
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

### SCSS 전역 변수

`variables.scss`는 Vite 설정의 `additionalData`로 모든 SCSS 파일에 자동 주입되므로 별도 import 없이 사용할 수 있습니다.

```scss
.my-component {
  color: $primary-color;
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

`request/const.ts`에 엔드포인트를 정의하고, `fetchApi` 래퍼와 TanStack Query를 조합합니다.

```ts
// src/pages/login/loginApi.ts
const useLoginApi = {
  login: ({ onSuccess, onError }) =>
    useMutation({
      mutationFn: (params: ILoginParams) => fetchApi({ method: HTTP_METHOD.POST, url: API.Auth.Login, data: params }),
      onSuccess: data => onSuccess(data.body),
      onError,
    }),
}
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

- **Navigation** — 상단 네비게이션 바
- **Main Content** — `<Outlet />`으로 렌더링되는 페이지 콘텐츠
- **Footer** — 하단 푸터

## 스타일 가이드

### 색상 팔레트

| 변수                 | 값        | 용도            |
| -------------------- | --------- | --------------- |
| `$primary-color`     | `#8b3fd9` | 주요 색상       |
| `$secondary-color`   | `#6b2fb9` | 보조 색상       |
| `$accent-color`      | `#a855f7` | 강조 색상       |
| `$text-color`        | `#1a1a1a` | 기본 텍스트     |
| `$text-secondary`    | `#666666` | 보조 텍스트     |
| `$background-color`  | `#ffffff` | 배경            |
| `$border-color`      | `#e5e5e5` | 테두리          |

### 간격 / 폰트 / 라운드

- `$spacing-xs` ~ `$spacing-xxl` — 간격 시스템
- `$font-size-xs` ~ `$font-size-xxl` — 폰트 크기
- `$border-radius-sm` ~ `$border-radius-xl` — 모서리 반경
- `$z-index-dropdown`, `$z-index-modal`, `$z-index-tooltip` — z-index 레이어

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

- **인증 플로우** — `Layout`이 마운트 시 무조건 `/login`으로 리다이렉트합니다. 토큰 검증 로직은 미구현 상태입니다.
- **응답 인터셉터** — `useIntercept`의 로그아웃 / 토큰 갱신 로직이 주석 처리되어 있으며, 훅 자체가 아직 호출되지 않습니다.
- **API 도메인** — `vite.config.ts`의 `getApiDomain()`이 모든 mode에서 빈 문자열을 반환합니다. 실제 서버 주소 설정이 필요합니다.
- **`src/pages/main`** — 어느 라우트에도 연결되어 있지 않습니다.
- `useExample.ts`, `useExampleStore.ts`는 참고용 예시 코드입니다.

## 관련 문서

- [DEVELOPMENT.md](DEVELOPMENT.md) — 개발 워크플로우, 코드 품질 도구, 테스트 가이드
- [PERFORMANCE_ANALYSIS.md](PERFORMANCE_ANALYSIS.md) — 성능 분석
