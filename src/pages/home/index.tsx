import useActiveSection from '@/hooks/useActiveSection'
import { SECTION_IDS } from '@/routes/const'
import Behind from './sections/Behind'
import Career from './sections/Career'
import Contact from './sections/Contact'
import Hero from './sections/Hero'
import ProductMarquee from './sections/ProductMarquee'
import Stack from './sections/Stack'
import Stats from './sections/Stats'
import Way from './sections/Way'
import Work from './sections/Work'

/** 홈: 섹션을 위에서 아래 순서로 놓는다. 각 섹션은 sections/<섹션>/에 있다 */
const Home = () => {
  // 지금 보는 섹션을 헤더 메뉴에 표시한다
  useActiveSection(SECTION_IDS)

  return (
    <>
      <Hero />
      <Stats />
      <ProductMarquee />
      <Work />
      <Way />
      <Career />
      <Stack />
      <Behind />
      <Contact />
    </>
  )
}

export default Home
