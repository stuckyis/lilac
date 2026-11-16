// 사이트에서 쓰는 글꼴. npm 패키지에 들어 있는 파일을 그대로 제공해서 외부 CDN을 부르지 않는다.
// - Pretendard: 한글 본문·제목. dynamic subset이라 화면에 쓰인 글자 묶음만 내려받는다.
// - Bricolage Grotesque: 영문·숫자 강조 (굵기 축만 있는 가변 글꼴)
// - JetBrains Mono: 라벨·날짜·시각 (라틴 문자, 400·500)
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'
