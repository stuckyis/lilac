// 브라우저 탭 제목과 검색 결과·링크 공유 미리보기에 나오는 사이트 정보다.
// 빌드할 때 vite.config.ts가 index.html에 넣는다. 이 파일을 고치면 개발 서버가 다시 켜진다.
// 화면에 보이는 내용(이름, 경력 등)은 portfolio.ts에 있다. 이름을 바꾸면 여기 제목·설명도 같이 고친다.
// vite.config.ts가 불러오는 파일이라 다른 파일을 import하지 않는다 (타입도 이 파일에 둔다).

interface Site {
  /** 브라우저 탭과 검색 결과·공유 미리보기의 제목 */
  title: string
  /** 검색 결과·공유 미리보기의 설명 한 줄 */
  description: string
  /** 배포한 주소 (예: 'https://example.com'). 비워 두면 공유 미리보기의 이미지·주소 태그를 넣지 않는다 */
  url: string
}

export const SITE: Site = {
  title: '[이름] · 프론트엔드 엔지니어',
  description: '화면 너머의 구조까지 설계하는 프론트엔드 엔지니어 [이름]의 포트폴리오입니다.',
  url: '',
}
