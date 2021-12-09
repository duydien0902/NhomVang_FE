import React, { useEffect } from 'react'
import NewsPreview from '../components/NewsPage/NewsPreview/index'
import agent from '../agent'
import { store } from '../store'
import { LIST_NEWS } from '../constants/ActionType'
import NewBar from '../components/NewsPage/NewsBar'
export default function NewsPage() {
  useEffect(() => {
    async function fetchData() {
      const result = await agent.News.getAll()
      const payload = await result.data.newsList
      store.dispatch({ type: LIST_NEWS, payload })
    }
    fetchData()
  }, [])
  return (
    <div style={{ paddingTop: '80px' }}>
      <NewsPreview />
      <NewBar />
    </div>
  )
}
