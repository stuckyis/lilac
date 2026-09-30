import { ArrowRightIcon, CodeIcon, MailIcon } from '@/components/ui/Icon'
import { INTRO, PROFILE } from '@/data/portfolio'
import { SECTION_ID } from '@/routes/const'
import { Fragment, type ReactNode } from 'react'
import HeroComposition from './HeroComposition'
import './styles.scss'

/**
 * 여러 줄 문장을 <br>로 나눠 그린다.
 * 줄 끝에 공백을 남겨서, 스크린리더가 줄바꿈 앞뒤 단어를 붙여 읽지 않게 한다.
 */
const renderLines = (lines: string[], renderLine: (line: string) => ReactNode = line => line) =>
  lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {renderLine(line)}
      {index < lines.length - 1 && ' '}
    </Fragment>
  ))

/** 큰 문장에서 강조 단어를 라일락 바탕(<mark>)으로 감싼다 */
const highlightWord = (line: string) => {
  const start = line.indexOf(INTRO.highlight)
  if (start === -1) return line

  return (
    <>
      {line.slice(0, start)}
      <mark className="hero__highlight">{INTRO.highlight}</mark>
      {line.slice(start + INTRO.highlight.length)}
    </>
  )
}

/** 첫 화면: 소개 문장과 버튼(왼쪽), 패널 조합(오른쪽), 현재 소속(아래) */
const Hero = () => {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__intro">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-mark" aria-hidden />
            {INTRO.role} · SINCE {PROFILE.since}
          </p>

          <h1 id="hero-title" className="hero__title">
            {renderLines(INTRO.headline, highlightWord)}
            <span className="hero__caret" aria-hidden>
              _
            </span>
          </h1>

          <p className="hero__lead">{renderLines(INTRO.lead)}</p>

          <div className="hero__actions">
            <a className="hero__button" href={`#${SECTION_ID.WORK}`}>
              대표 작업 보기
              <ArrowRightIcon size={18} />
            </a>
            {/* [숨김] 이력서 PDF 버튼. 다시 보이게 할 때 styles.scss·index.test.tsx의 [숨김] 주석도 함께 푼다.
            <a className="hero__button hero__button--outline" href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer">
              이력서 PDF <span className="visually-hidden">(새 창에서 열림)</span>
            </a>
            */}
            <a className="hero__icon-button" href={PROFILE.links.github} target="_blank" rel="noopener noreferrer">
              <CodeIcon />
              <span className="visually-hidden">GitHub (새 창에서 열림)</span>
            </a>
            <a className="hero__icon-button" href={`mailto:${PROFILE.email}`}>
              <MailIcon />
              <span className="visually-hidden">이메일 보내기</span>
            </a>
          </div>
        </div>

        <HeroComposition />

        <p className="hero__status">
          <span className="hero__status-mark" aria-hidden />
          현재 {PROFILE.current.company} · {PROFILE.current.role}
        </p>
      </div>
    </section>
  )
}

export default Hero
