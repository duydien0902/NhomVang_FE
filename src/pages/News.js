import React, { useEffect } from 'react'
import NewsPreview from '../components/NewsPreview/index'
import agent from '../agent'
import { store } from '../store'
import { LIST_NEWS } from '../constants/ActionType'
export default function News() {
  useEffect(() => {
    async function fetchData() {
      const result = await agent.News.getnews()
      const payload = await result.data.newsList
      store.dispatch({ type: LIST_NEWS, payload })
    }
    fetchData()
  }, [])
  return (
    <div style={{ paddingTop: '80px' }}>
      <NewsPreview />
    </div>
  )
}
