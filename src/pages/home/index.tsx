import Career from './sections/Career'
import Hero from './sections/Hero'
import ProductMarquee from './sections/ProductMarquee'
import Stats from './sections/Stats'
import Way from './sections/Way'
import Work from './sections/Work'

/** 홈: 섹션을 위에서 아래 순서로 놓는다. 각 섹션은 sections/<섹션>/에 있다 */
const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <ProductMarquee />
      <Work />
      <Way />
      <Career />
    </>
  )
}

export default Home
