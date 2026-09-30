# 개발 가이드

기술 스택과 `src` 디렉토리 구조, 주요 기능 사용법은 [README.md](README.md)를 참고하세요.
이 문서는 개발 워크플로우와 코드 품질 도구, 컨벤션을 다룹니다.

## 루트 설정 파일

```
Lilac/
├── .cursor/rules/       # Cursor AI 코딩 규칙
├── .vscode/             # VS Code 워크스페이스 설정
├── public/              # 정적 파일 (favicon, robots.txt)
├── src/                 # 소스 코드 (구조는 README.md 참고)
├── .editorconfig        # 에디터 공통 설정 (LF, 2 space, UTF-8)
├── .env                 # 환경 변수 (VITE_API_BASE_URL)
├── .prettierrc          # Prettier 설정
├── .prettierignore      # Prettier 제외 대상
├── eslint.config.js     # ESLint 설정 (flat config)
├── index.html           # Vite 진입 HTML
├── vite.config.ts       # Vite 빌드 / 개발 서버 설정
├── vitest.config.ts     # Vitest 테스트 설정
├── tsconfig.json        # TypeScript 공통 설정 (path alias 포함)
├── tsconfig.app.json    # 앱 빌드용 설정
├── tsconfig.node.json   # Node(설정 파일)용 설정
├── pnpm-workspace.yaml  # pnpm 워크스페이스 설정
└── package.json         # 의존성 및 스크립트
```

## 개발 워크플로우

### 1. 개발 서버 시작

```bash
pnpm dev
```

개발 서버는 `http://localhost:5055`에서 실행됩니다. (`dev` 스크립트가 `pnpm install`을 먼저 수행합니다.)

#### API 프록시 설정

- `/api/v1`로 시작하는 요청은 Vite 개발 서버가 API 서버로 프록시합니다. (`vite.config.ts`의 `server.proxy`)
- 프록시 타겟은 `vite.config.ts`의 `getApiDomain()`이 mode에 따라 반환합니다.
  현재는 모든 mode에서 빈 문자열을 반환하므로, 실제 서버 주소를 채워야 프록시가 동작합니다.
- Axios의 `baseURL`은 `.env`의 `VITE_API_BASE_URL` 값을 사용합니다. (`src/request/const.ts`)
  비워두면 상대 경로로 요청하여 개발 시 프록시를 타게 됩니다.

```ts
// 엔드포인트는 src/request/const.ts의 API 상수에 추가해서 사용합니다 (예: API.Example.List)
fetchApi({ method: HTTP_METHOD.GET, url: API.Example.List })
```

### 2. 코드 작성

- 함수형 컴포넌트 + TypeScript, ES6+ 문법 사용
- `@` 별칭으로 `src` 참조 (`import Loading from '@/components/loading'`)
- 상세 컨벤션은 아래 [코딩 컨벤션](#코딩-컨벤션) 참고

### 3. 코드 검증

```bash
pnpm lint:fix    # Lint 검사 및 자동 수정
pnpm format      # 포맷팅
pnpm test:run    # 테스트 실행
```

### 4. 빌드

```bash
pnpm build       # tsc -b 후 프로덕션 빌드
pnpm preview     # 빌드 결과 미리보기
```

## 코드 품질 도구

### ESLint

flat config(`eslint.config.js`) 방식이며 `dist`는 검사에서 제외됩니다.

```bash
pnpm lint        # Lint 검사
pnpm lint:fix    # Lint 검사 및 자동 수정
```

적용된 주요 규칙:

| 규칙                                        | 설정                        | 설명                                              |
| ------------------------------------------- | --------------------------- | ------------------------------------------------- |
| `prettier/prettier`                         | `error`                     | 포맷 위반을 Lint 에러로 처리                      |
| `@typescript-eslint/consistent-type-imports` | `error` (inline)            | 타입 import는 `import { type Foo }` 형태로 통일   |
| `react-refresh/only-export-components`      | `warn`                      | 상수 export는 허용                                |
| `react-hooks/rules-of-hooks`                | `off`                       | 비활성화됨                                        |
| `react-hooks/exhaustive-deps`               | `off`                       | 의존성 배열은 직접 관리                           |

> `react-hooks` 규칙이 꺼져 있으므로 훅 의존성 배열은 도구가 잡아주지 않습니다. 직접 확인해 주세요.

### Prettier

```bash
pnpm format        # 코드 포맷팅
pnpm format:check  # 포맷 검사만 수행
```

`.prettierrc` 설정 요약:

- 세미콜론 없음 (`semi: false`)
- 싱글 쿼트 (`singleQuote: true`)
- 들여쓰기 2칸 스페이스 (`tabWidth: 2`, `useTabs: false`)
- 줄 길이 150자 (`printWidth: 150`)
- 후행 쉼표 항상 (`trailingComma: "all"`)
- 화살표 함수 단일 인자 괄호 생략 (`arrowParens: "avoid"`)

> `format` 스크립트의 대상은 `src/**/*.{ts,tsx,css,scss,json}`입니다. 루트 설정 파일이나 마크다운은 포함되지 않습니다.

### 에디터 설정

- `.editorconfig` — LF 개행, UTF-8, 2칸 들여쓰기, 마지막 줄 개행
- `.vscode/settings.json` — 저장 시 Prettier 포맷 + ESLint 자동 수정 + import 정리
  - VS Code 사용 시 [Prettier 확장](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)이 필요합니다.

## 테스트

### Vitest

jsdom 환경에서 React Testing Library와 함께 실행됩니다. `globals: true`이므로 `describe`/`it`/`expect`를 import 없이 쓸 수 있지만, 현재 코드는 명시적 import를 사용합니다.

```bash
pnpm test           # watch 모드
pnpm test:run       # 1회 실행
pnpm test:ui        # UI 모드
pnpm test:coverage  # 커버리지 측정
```

> `test:coverage`는 `@vitest/coverage-v8` 패키지가 필요합니다. 설치되어 있지 않아 최초 실행 시 설치 안내가 표시됩니다.

### 설정 파일

- `vitest.config.ts` — jsdom 환경, `@` 별칭, SCSS 전역 변수 주입 설정
- `src/test/setup.ts` — `@testing-library/jest-dom/vitest` 로드(`toBeInTheDocument` 등 matcher와 타입) 및 SVG 모킹
- `src/test/mocks/svgMock.tsx` — SVG 컴포넌트 모의 구현

### 테스트 작성 가이드

1. 파일명: `*.test.ts` 또는 `*.test.tsx`
2. 위치: 테스트 대상 파일과 같은 디렉토리 (예: `src/utils/helpers/helpers.test.ts`)
3. 예제:

```typescript
import { describe, expect, it } from 'vitest'
import { formatNumber } from './helpers'

describe('formatNumber', () => {
  it('숫자를 천 단위로 구분하여 포맷팅해야 합니다', () => {
    expect(formatNumber(1000)).toBe('1,000')
  })
})
```

## 코딩 컨벤션

`.cursor/rules/`에 정의된 규칙이 있으며, 아래는 그 요약입니다.

### TypeScript

- 명시적 타입 정의 사용, `any` 지양
- 타입 import는 인라인 형태로 (`import { type AxiosError } from 'axios'`)
- 상수는 `as const` 객체로 정의하고 값 타입을 파생시킵니다

```ts
export const LOADING_TYPE = {
  PULSE: 'pulse',
  SPINNER: 'spinner',
} as const

export type LoadingType = (typeof LOADING_TYPE)[keyof typeof LOADING_TYPE]
```

### React

- 함수형 컴포넌트만 사용, Props 타입 명시
- 복잡한 로직/상호작용은 별도 컴포넌트나 훅으로 분리
- 조건에 따라 크게 달라지는 UI는 별도 컴포넌트로 분리
- 중첩 삼항 연산자 대신 `if`/`else` 또는 명명된 변수 사용
- 복잡한 불리언 조건은 의미가 드러나는 변수명에 할당

```tsx
// 권장
const isPulse = type === LOADING_TYPE.PULSE
return <div>{isPulse ? <PulseDots /> : <Spinner />}</div>
```

- 라우트 경로, API 엔드포인트 등 상수는 `const.ts`로 분리 (`routes/const.ts`, `request/const.ts`)
- setter 함수는 안정적이므로 의존성 배열에 넣지 않습니다

### 스타일링

- SCSS 사용, 컴포넌트별 스타일 파일 분리 (`styles.scss` 또는 `컴포넌트명.scss`)
- 디자인 토큰은 `src/styles/variables.scss`, 반복 스타일은 `src/styles/mixins.scss`에 정의하며, Vite 설정으로 자동 주입되므로 `@use` 없이 사용 가능합니다
- 조건부 className은 `clsx` 사용

## Git 커밋 메시지

`[태그] 한글 설명` 형식을 사용합니다.

```
[Feat] 로딩바 추가, route 경로 수정
[Fix] 로그인 실패 시 에러 메시지 미표시 수정
[Chore] 불필요 코드 제거
[Perf] 패키지 버전 최신화
[Refactor] 인터셉터 로직 분리
[Docs] README 수정
[Style] 코드 포맷팅
[Test] helpers 테스트 추가
```

## 트러블슈팅

### ESLint / Prettier 충돌

`prettier/prettier`가 `error`로 설정되어 있어 포맷 위반이 Lint 에러로 잡힙니다.

```bash
pnpm lint:fix && pnpm format
```

### SCSS 변수·믹스인을 찾을 수 없음

`variables.scss`와 `mixins.scss`는 `vite.config.ts`와 `vitest.config.ts` 양쪽의 `additionalData`로 주입됩니다.
새 빌드/테스트 설정을 추가할 때 이 옵션이 빠지면 변수를 인식하지 못합니다.

### `@` 별칭 인식 실패

경로 별칭은 `tsconfig.json`(타입 체크), `vite.config.ts`(빌드), `vitest.config.ts`(테스트) 세 곳에 각각 설정되어 있습니다. 한 곳만 수정하면 다른 쪽에서 깨집니다.

### 테스트 실패

1. 테스트 파일과 모킹이 올바른지 확인
2. `src/test/setup.ts`에서 전역 설정 확인
3. SVG import(`?react`) 관련 실패는 `src/test/mocks/svgMock.tsx` 확인

## 유용한 링크

- [Vite 문서](https://vite.dev/)
- [Vitest 문서](https://vitest.dev/)
- [React Router 문서](https://reactrouter.com/)
- [TanStack Query 문서](https://tanstack.com/query/latest)
- [Zustand 문서](https://zustand.docs.pmnd.rs/)
- [React Testing Library](https://testing-library.com/react)
- [ESLint 규칙](https://eslint.org/docs/rules/)
- [Prettier 옵션](https://prettier.io/docs/en/options.html)
