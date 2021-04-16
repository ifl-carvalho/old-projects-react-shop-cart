import { NextPage } from 'next'
import Image from 'next/image'

import { CartData } from '../contexts/CartContext'
import { useCart } from '../hooks/useCart'

import styles from '../styles/components/cart.module.scss'

interface CartItemProps {
  item: CartData
}

const Cart: NextPage = () => {
  const cartItems = useCart().cartData

  const displayItems = []

  const priceTotal =
    typeof cartItems !== 'undefined' && cartItems.length > 0
      ? cartItems
          .map((item) => item.sellingPrice)
          .reduce((sum, itemSellingPrice) => sum + itemSellingPrice)
      : null

  for (let i = 0; i < cartItems.length; i++) {
    displayItems.push(<CartItem item={cartItems[i]} key={cartItems[i].id} />)
  }

  return (
    <div className={styles.cart}>
      <div className={styles.header}>
        <h2>Meu Carrinho</h2>
      </div>
      <div className={styles.listContainer}>
        <ul>{displayItems}</ul>
      </div>
      <div className={styles.priceContainer}>
        <span>Total</span>
        <span>
          {`R$ ${(priceTotal * 0.01).toLocaleString('pt-BR', {
            useGrouping: false,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
        </span>
        {priceTotal > 1000 ? <p>Parabéns, sua compra tem frete grátis !</p> : null}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={() => alert('Compra realizada!')}>Finalizar compra</button>
      </div>
    </div>
  )
}

export default Cart

const CartItem: NextPage<CartItemProps> = ({ item }) => {
  const { id, name, price, sellingPrice, image } = item
  const { cartData, setCartData } = useCart()

  return (
    <li className={styles.item}>
      <div className={styles.itemImage}>
        <Image src={image} width={105} height={105} layout="fixed" objectFit="cover" />
      </div>
      <div className={styles.itemInfo}>
        <h3>{name}</h3>
        <p className={styles.itemPrice}>
          {`R$ ${(price * 0.01).toLocaleString('pt-BR', {
            useGrouping: false,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
        </p>
        <p className={styles.itemSellingPrice}>
          {`R$ ${(sellingPrice * 0.01).toLocaleString('pt-BR', {
            useGrouping: false,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
        </p>
      </div>
      <div className={styles.itemButtons}>
        <button onClick={() => setCartData(cartData.filter((item) => item.id != id))}>
          <Image
            src="/icons/close.svg"
            alt="close"
            height={17}
            width={17}
            layout="fixed"
            objectFit="cover"
          />
        </button>
      </div>
    </li>
  )
}
