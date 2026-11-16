/** DESIGN 그림에 보여줄 실제 디자인 토큰 이름 (src/styles/variables.scss) */
export const TOKEN_CHIPS = ['$color-accent', '$radius-xl', '$ease-soft'] as const

/** ACCESSIBILITY 그림의 자판 */
export const KEYBOARD_KEYS = ['Tab', '↑', '↓', 'Enter'] as const

/** QUALITY 그림의 터미널: 화면을 만들 때마다 실제로 돌리는 검사 명령 */
export const CHECK_COMMANDS = ['pnpm lint', 'pnpm build', 'pnpm test:run'] as const
