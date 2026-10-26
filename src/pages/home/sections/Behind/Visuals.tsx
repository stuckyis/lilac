import BlockMark from '@/components/ui/BlockMark'
import { CHECK_COMMANDS, KEYBOARD_KEYS, TOKEN_CHIPS } from './const'

// "이 화면의 구조" 카드 그림. 설명 글이 내용을 전하므로 그림은 모두 장식이다(카드에서 aria-hidden).

/** 블록 마크 + 디자인 토큰 이름 칩 */
export const TokensVisual = () => (
  <div className="behind-visual behind-visual--tokens">
    <BlockMark size={56} />
    <ul className="behind-visual__chips">
      {TOKEN_CHIPS.map(token => (
        <li key={token} className="behind-visual__chip">
          {token}
        </li>
      ))}
    </ul>
  </div>
)

/** 키보드 자판 */
export const KeysVisual = () => (
  <div className="behind-visual behind-visual--keys">
    {KEYBOARD_KEYS.map(key => (
      <kbd key={key} className="behind-visual__key">
        {key}
      </kbd>
    ))}
  </div>
)

/** 검사 명령이 모두 통과한 터미널 창 */
export const ChecksVisual = () => (
  <div className="behind-visual behind-visual--checks">
    <div className="behind-visual__terminal">
      {CHECK_COMMANDS.map(command => (
        <p key={command} className="behind-visual__line">
          <span className="behind-visual__prompt">$</span>
          {command}
          <span className="behind-visual__ok">✓</span>
        </p>
      ))}
    </div>
  </div>
)
