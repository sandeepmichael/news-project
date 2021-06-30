 import axios from 'axios'
import router from 'next/router'
import Head from 'next/head'
 import styles from '../../styles/feed.module.css'
 import { useRouter } from 'next/router'
 import Routes from '../../components/routes.js'

export const Feed = ({pageNumber, articles}) => {
    const router = useRouter()
    return (
        <div className='page-container'>
            <Routes />
        <div className={styles.main}>
           {articles.map((article, index) => (
               <div key={index} className={styles.post}>
                   <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
                   <p>{article.description}</p>
                      <img src={article.urlToImage} alt="NewImage"/>
               </div>
           ))}
        </div>

        <div className={styles.paginator}>
            <div onClick={() => {
                if(pageNumber > 1) {
                    router.push(`/feed/${pageNumber - 1}`).then(()=> window.scrollTo(0,0))
                }
            }} className={pageNumber === 1 ? styles.disabled : styles.active}>Previous Page</div>
        
        <div>#{pageNumber}</div>

            <div onClick={() => {
                if(pageNumber < 5) {
                    router.push(`/feed/${pageNumber + 1}`).then(()=> window.scrollTo(0,0))
                }
            }} className={pageNumber === 5 ? styles.disabled : styles.active}>Next Page</div>
        
         </div>
        </div>

    )
    }
    

export const getServerSideProps = async pageContext => {
const pageNumber = pageContext.query.id
 if(!pageNumber || pageNumber < 1 || pageNumber > 5) {
     return {
      
     

     props : {
         articles :[],
       pageNumber:1
      }
    }
 }
 const Response = await axios.get(`https://newsapi.org/v2/top-headlines?q=india&pageSize=5&page=${pageNumber}`, {
     headers : {
         Authorization : `Bearer ${process.env.API_KEY}`
     }
 })
 //const apiJson = await Response.json();
 const {articles} = Response.data
 return {
     props:{
         articles,
         pageNumber:Number.parseInt(pageNumber)
     }
 }
}
export default Feed
