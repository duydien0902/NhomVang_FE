import React, { useEffect, useState } from 'react'
import LayoutPagination from './index'
import { Pagination } from 'antd'
import agent from '../../../agent'
import { useSelector } from 'react-redux'
import { LIST_NEWS } from '../../../constants/ActionType'
import { store } from '../../../store'
function ListPagination() {
  const [show, setShow] = useState([])
  const result = useSelector(state => state.news.listnews)
  const total = useSelector(state => state.news.total)

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await agent.News.getAll()
        const payload = result.data.newsList
        setShow(payload.slice(0, 5))
        const total = result.data.total
        store.dispatch({ type: LIST_NEWS, payload, total })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  const changePage = (page, pageSize) => {
    let start = (page - 1) * pageSize
    let end = page * pageSize
    setShow(result.slice(start, end))
  }
  return (
    <div style={{ backgroundColor: '#F9FCFB' }}>
      <LayoutPagination Newslist={show} />
      <Pagination
        style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px', paddingBottom: '50px' }}
        defaultCurrent={1}
        defaultPageSize={5}
        total={total}
        onChange={changePage}
      />
    </div>
  )
}

export default ListPagination
