import { PauseIcon, PlayIcon } from '@/components/ui/Icon'
import { PRODUCTS } from '@/data/portfolio'
import { reveal } from '@/utils/reveal'
import clsx from 'clsx'
import { useState } from 'react'
import { MARQUEE_COPIES } from './const'
import './styles.scss'

const ProductList = ({ isCopy }: { isCopy: boolean }) => (
  <ul className="product-marquee__list" role="list" aria-hidden={isCopy || undefined}>
    {PRODUCTS.map(product => (
      <li key={product.name} className="product-marquee__item">
        {product.logoUrl ? (
          <img className="product-marquee__logo" src={product.logoUrl} alt="" />
        ) : (
          <span className={clsx('product-marquee__logo', `product-marquee__logo--${product.tone}`)} />
        )}
        {product.name}
      </li>
    ))}
  </ul>
)

/**
 * 제품 로고 띠: 출시에 참여한 제품이 오른쪽에서 왼쪽으로 끊김 없이 흐른다.
 * 마우스를 올리거나 멈춤 버튼을 누르면 멈춘다. 움직임 줄이기를 켜면 흐르지 않고 여러 줄로 모두 보인다.
 */
const ProductMarquee = () => {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <section className={clsx('product-marquee', isPaused && 'product-marquee--paused')} aria-labelledby="products-title">
      <div ref={reveal} className="product-marquee__head">
        <h2 id="products-title" className="product-marquee__title">
          <span className="product-marquee__title-mark" aria-hidden />
          출시에 참여한 제품들
        </h2>
        <button type="button" className="product-marquee__toggle" aria-pressed={isPaused} onClick={() => setIsPaused(prev => !prev)}>
          {isPaused ? <PlayIcon size={16} /> : <PauseIcon size={16} />}
          <span className="visually-hidden">움직임 멈추기</span>
        </button>
      </div>

      <div ref={reveal} className="product-marquee__viewport">
        <div className="product-marquee__track">
          {Array.from({ length: MARQUEE_COPIES }, (_, copy) => (
            <ProductList key={copy} isCopy={copy > 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductMarquee
