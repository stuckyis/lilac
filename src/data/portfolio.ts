import type { Intro, Profile } from './type'

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

export const INTRO: Intro = {
  role: 'FRONTEND ENGINEER',
  headline: ['화면 너머의', '구조까지 설계하는', '프론트엔드 엔지니어'],
  highlight: '구조',
  lead: [`안녕하세요, 10년 차 프론트엔드 개발자 ${PROFILE.name}입니다.`, '[어떤 제품을 어떤 방식으로 만들어 왔는지 한 문장]'],
  metric: '+[N]%',
}
