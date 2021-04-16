import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import { CartProvider, CartData } from '../contexts/CartContext'

import Buttons from '../components/Buttons'
import Cart from '../components/Cart'

import styles from '../styles/pages/index.module.scss'

interface IndexProps {
  cartData: {
    over: CartData[]
    bellow: CartData[]
  }
}

const Index: NextPage<IndexProps> = ({ cartData }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <CartProvider cartData={cartData.over}>
        <main className={styles.index}>
          <Buttons cartData={cartData} />
          <Cart />
        </main>
      </CartProvider>
    </>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async () => {
  const cartApi = process.env.CART_API || `http://localhost:3000/api/cart/`

  const response = await fetch(`${cartApi}`)
  const responseJson = await response.json()

  const dataOver = responseJson.over['items'].map((item) => {
    return {
      id: item['id'],
      name: item['name'],
      price: item['price'],
      sellingPrice: item['sellingPrice'],
      image: item['imageUrl'],
    }
  })

  const dataBellow = responseJson.bellow['items'].map((item) => {
    return {
      id: item['id'],
      name: item['name'],
      price: item['price'],
      sellingPrice: item['sellingPrice'],
      image: item['imageUrl'],
    }
  })

  return {
    props: {
      cartData: {
        over: dataOver,
        bellow: dataBellow,
      },
    },
  }
}
