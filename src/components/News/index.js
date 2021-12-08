import React, { useEffect } from 'react'
import './News.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import agent from '../../agent'
import { store } from '../../store'
import { SELECTED_NEWS } from '../../constants/ActionType'
import { Spin, Image } from 'antd'
import defaultNewsImage from '../../assets/defaultNewsImage.png'
const NewsImage = ({ src }) => {
  return <Image className="news-thumbnail" src={src} fallback={defaultNewsImage} preview={false} />
}
export default function News() {
  const { slug } = useParams()
  const news = useSelector(state => state.newsdetail.newsdetail)

  const encodeContent = () => {
    const content = news.content
    const encode = new DOMParser().parseFromString(content, 'text/html')
    const rendercontent = encode.documentElement.textContent
    return { __html: rendercontent }
  }
  useEffect(() => {
    async function fetchNewsDetail() {
      const result = await agent.News.newsslug(slug)
      const payload = result.data.news
      store.dispatch({ type: SELECTED_NEWS, payload })
    }
    fetchNewsDetail()
  }, [slug])
  return news ? (
    <article className="news-detail">
      <div className="news-thumbnail">
        <NewsImage src={news.thumbnail} />
      </div>
      <div className="news-body" dangerouslySetInnerHTML={encodeContent()}></div>
      <div style={{ float: 'right' }}>
        {new Date(news.modifiedDate).toLocaleDateString()}, by{' '}
        <span style={{ fontStyle: 'italic', fontWeight: '700' }}>{news.author}</span>
      </div>
    </article>
  ) : (
    // <div style={{ paddingTop: '160px'}}>
    //   <div className="container-NewsDetail">
    //     <div>
    //       <h1>{news.title}</h1>
    //     </div>
    //     <div className="container-img-description">
    //       <div className="container-NewsDetail-img">
    //         <img src={news.thumbnail} alt="" />
    //       </div>
    //       <div>
    //         <span>{news.description}</span>
    //         <hr />
    //       </div>
    //     </div>
    //     <div
    //       dangerouslySetInnerHTML={encodeContent()}
    //       style={{
    //         wordWrap: 'break-word',
    //         marginTop: '20px',
    //         paddingBottom: '50px',
    //       }}
    //     ></div>

    //   </div>
    // </div>
    <Spin style={{ display: 'flex', justifyContent: 'center', paddingTop: '160px' }} />
  )
}
