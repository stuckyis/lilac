import BlockMark from '@/components/ui/BlockMark'
import { BLOCK_MARK_VARIANT } from '@/components/ui/BlockMark/const'
import { Menus } from '@/routes/const'
import { Link } from 'react-router'
import './styles.scss'

/** 없는 주소로 들어왔을 때 보여주는 화면. 헤더 없이 홈으로 돌아가는 길만 둔다 */
const NotFoundPage = () => {
  return (
    <main className="not-found">
      <BlockMark size={120} variant={BLOCK_MARK_VARIANT.MISSING} className="not-found__mark" />
      {/* 라벨은 제목과 같은 뜻의 장식이라 스크린리더는 제목만 읽는다 */}
      <p className="not-found__label" aria-hidden>
        <span className="not-found__label-mark" />
        404 — NOT FOUND
      </p>
      <h1 className="not-found__title">페이지를 찾을 수 없어요</h1>
      <p className="not-found__lead">주소가 바뀌었거나 없는 페이지예요. 홈에서 다시 둘러봐 주세요.</p>
      <Link to={Menus.Home} className="not-found__home">
        홈으로 돌아가기
      </Link>
    </main>
  )
}

export default NotFoundPage
