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

/** 코드 괄호 `< >`. GitHub 링크에 쓴다 (시안과 같이 브랜드 로고 대신 선 아이콘) */
export const CodeIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </LineIcon>
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
