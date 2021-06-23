import Head from 'next/head'
//import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Routes from '../components/routes.js'


export default function Home() {
  return (
    <div className='page-container'>
      
    <Routes />
      <div className={styles.main}>
        <h1>NextJs News App</h1>

        <h3>Latest articles</h3>

      </div>
    </div>
  )
}
