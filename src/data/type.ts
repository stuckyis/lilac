/** 외부 프로필 링크 */
export interface SocialLinks {
  github: string
  linkedin: string
  blog: string
}

/** 기본 정보. 헤더, 첫 화면, 연락 섹션에서 같이 쓴다. */
export interface Profile {
  name: string
  /** 경력을 시작한 연도 (예: '2016') */
  since: string
  /** 지금 일하는 곳 */
  current: {
    company: string
    role: string
  }
  email: string
  /** 이력서 PDF 주소 */
  resumeUrl: string
  links: SocialLinks
}
