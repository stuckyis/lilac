import { MailIcon } from '@/components/ui/Icon'
import { PROFILE } from '@/data/portfolio'
import { SECTION_ID } from '@/routes/const'
import { reveal } from '@/utils/reveal'
import { SOCIAL_LINKS } from './const'
import './styles.scss'

const CURRENT_YEAR = new Date().getFullYear()

/** 연락: 어두운 마무리 블록(큰 문장, 이메일, 링크)과 사이트 푸터 */
const Contact = () => {
  return (
    <section id={SECTION_ID.CONTACT} className="contact" aria-labelledby="contact-title">
      {/* 메뉴·지금 보는 섹션 표시의 기준인 섹션은 그대로 두고 안쪽 내용만 올라온다 */}
      <div ref={reveal} className="contact__inner">
        <p className="contact__label" aria-hidden>
          <span className="contact__mark" />
          05 — CONTACT
        </p>
        <h2 id="contact-title" className="contact__title" lang="en">
          Let&apos;s build the next one.
        </h2>
        <p className="contact__lead">다음 제품, 함께 만들어요. 편하게 연락 주세요.</p>

        <a className="contact__email" href={`mailto:${PROFILE.email}`}>
          <MailIcon size={22} />
          {PROFILE.email}
        </a>

        <ul className="contact__links" role="list">
          {SOCIAL_LINKS.map(link => (
            <li key={link.label}>
              <a className="contact__link" href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} <span className="visually-hidden">(새 창에서 열림)</span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="contact__footer">
          <p lang="en">
            © {CURRENT_YEAR} {PROFILE.nameEn}
          </p>
        </footer>
      </div>
    </section>
  )
}

export default Contact
