import type { Profile } from './type'

// 화면에 들어가는 내용을 모아 둔 파일이다. 내용을 바꿀 때는 이 파일만 고친다.
// 실제 내용을 받기 전까지는 시안의 자리표시자([이름], [YYYY] 등)를 쓴다.

export const PROFILE: Profile = {
  name: '[이름]',
  since: '[YYYY]',
  current: {
    company: '[회사명]',
    role: '[역할]',
  },
  email: '[이메일 주소]',
  resumeUrl: '#',
  links: {
    github: '#',
    linkedin: '#',
    blog: '#',
  },
}
