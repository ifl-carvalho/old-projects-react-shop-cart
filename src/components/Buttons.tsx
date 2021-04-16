import { NextPage } from 'next'
import { CartData } from '../contexts/CartContext'

import styles from '../styles/components/buttons.module.scss'
import { useCart } from '../hooks/useCart'

interface ButtonsProps {
  cartData: {
    over: CartData[]
    bellow: CartData[]
  }
}

const Buttons: NextPage<ButtonsProps> = ({ cartData }) => {
  const { setCartData } = useCart()

  return (
    <div className={styles.buttons}>
      <button onClick={() => setCartData(cartData.over)}>Mais de 10 Reais</button>
      <button onClick={() => setCartData(cartData.bellow)}>Menos de 10 Reais</button>
    </div>
  )
}

export default Buttons
