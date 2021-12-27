import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import agent from '../../../agent'
import { store } from '../../../store'
import { SELECTED_NEWS, LIST_NEWS_TAGS } from '../../../constants/ActionType'
import { Image, Spin } from 'antd'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
import { decodeHTMLContent } from '../../../utils'
import NewsTagsSlider from '../NewsTagsSlider/index'
import './News.css'
const NewsImage = ({ src }) => {
  return <Image className="news-thumbnail" src={src} fallback={defaultNewsImage} preview={false} />
}
export default function News() {
  const { slug } = useParams()
  const news = useSelector(state => state.newsdetail.newsdetail)
  const { listnews, total } = useSelector(state => state.news)
  useEffect(() => {
    const fetchNewsTags = async () => {
      try {
        const tags = await news.tags.toString()
        const payload = await agent.News.getAll(0, { tags })
        store.dispatch({ type: LIST_NEWS_TAGS, payload })
      } catch (error) {
        // console.log(error)
      }
    }
    fetchNewsTags()
  }, [news])
  useEffect(() => {
    const fetchNewsDetail = async () => {
      const result = await agent.News.getBySlug(slug)
      const payload = result.data.news
      store.dispatch({ type: SELECTED_NEWS, payload })
    }
    fetchNewsDetail()
  }, [slug])
  return (
    <div>
      {news ? (
        <article className="news-detail">
          <h1 className="news-title">{news.title}</h1>
          <div className="news-thumbnail">
            <NewsImage src={news.thumbnail} />
          </div>
          <div className="news-content" dangerouslySetInnerHTML={{ __html: decodeHTMLContent(news.content) }}></div>
          <div style={{ float: 'right' }}>
            {new Date(news.modifiedDate).toLocaleDateString()}, by{' '}
            <span style={{ fontStyle: 'italic', fontWeight: '700' }}>{news.author}</span>
          </div>
        </article>
      ) : (
        <Spin
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}
          size="large"
        />
      )}
      <div></div>
      <NewsTagsSlider listnewstags={listnews} total={total} />
    </div>
  )
}
