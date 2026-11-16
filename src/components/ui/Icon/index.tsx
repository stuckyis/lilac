import type { PropsWithChildren } from 'react'

interface IconProps {
  /** 한 변의 길이(px) */
  size?: number
  className?: string
}

/** 선으로 그린 24×24 아이콘의 공통 틀. 장식이라 스크린리더는 읽지 않는다(이름은 버튼·링크에 붙인다). */
const LineIcon = ({ size = 20, className, children }: PropsWithChildren<IconProps>) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    focusable="false"
  >
    {children}
  </svg>
)

export const ArrowRightIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </LineIcon>
)

/** 아래 화살표. 같은 페이지의 아래 섹션으로 내려가는 버튼에 쓴다 */
export const ArrowDownIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M12 5v14" />
    <path d="M6 13l6 6 6-6" />
  </LineIcon>
)

/** GitHub 마크 (채운 모양, Octicons `mark-github`). 첫 화면 GitHub 링크에 쓴다 */
export const GithubIcon = ({ size = 20, className }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden focusable="false">
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
  </svg>
)

export const MailIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M3 7l9 6 9-6" />
  </LineIcon>
)

/** 네 칸 중 두 칸이 채워진 격자. 레이아웃 바꾸기 버튼에 쓴다 */
export const LayoutIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <rect x="3" y="3" width="8" height="8" rx="2" />
    <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" stroke="none" />
    <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" stroke="none" />
    <rect x="13" y="13" width="8" height="8" rx="2" />
  </LineIcon>
)

export const PauseIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <rect x="7" y="5" width="3" height="14" rx="1" fill="currentColor" stroke="none" />
    <rect x="14" y="5" width="3" height="14" rx="1" fill="currentColor" stroke="none" />
  </LineIcon>
)

export const PlayIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none" />
  </LineIcon>
)

/** 두 줄. 펼침 메뉴를 여는 버튼에 쓴다 */
export const MenuIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M4 8h16" />
    <path d="M4 16h16" />
  </LineIcon>
)

export const CloseIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </LineIcon>
)

export const ChevronDownIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M6 9l6 6 6-6" />
  </LineIcon>
)
