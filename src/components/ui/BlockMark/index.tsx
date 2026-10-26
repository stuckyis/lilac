import clsx from 'clsx'
import { memo } from 'react'
import { BLOCK_MARK_CELLS, BLOCK_MARK_VARIANT, type BlockMarkVariant } from './const'
import './styles.scss'

interface BlockMarkProps {
  /** 한 변의 길이(px) */
  size?: number
  variant?: BlockMarkVariant
  className?: string
}

/** 네 칸 블록 로고. 화면을 이루는 컴포넌트를 뜻하는 사이트의 기본 모티프다. 장식이라 스크린리더는 읽지 않는다. */
const BlockMark = ({ size = 28, variant = BLOCK_MARK_VARIANT.DEFAULT, className }: BlockMarkProps) => {
  return (
    <svg
      className={clsx('block-mark', `block-mark--${variant}`, className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
    >
      {BLOCK_MARK_CELLS.map(cell => (
        <rect key={cell.tone} className={`block-mark__cell block-mark__cell--${cell.tone}`} x={cell.x} y={cell.y} width="9" height="9" rx="2.5" />
      ))}
    </svg>
  )
}

export default memo(BlockMark)
