import React, { useEffect, useState } from 'react'
import LayoutPagination from './index'
import { Pagination } from 'antd'
import agent from '../../../agent'
import { useSelector } from 'react-redux'
import { LIST_NEWS } from '../../../constants/ActionType'
import { store } from '../../../store'
function ListPagination() {
  const [show, setShow] = useState([])
  const { listnews, total } = useSelector(state => state.news)
  useEffect(() => {
    async function fetchData() {
      try {
        const payload = await agent.News.getAll()
        const result = payload.data.newsList
        setShow(result.slice(0, 5))
        store.dispatch({ type: LIST_NEWS, payload })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  const changePage = (page, pageSize) => {
    let start = (page - 1) * pageSize
    let end = page * pageSize
    setShow(listnews.slice(start, end))
  }
  return (
    <div style={{ paddingTop: '150px', width: '100%', backgroundColor: '#DCDCDC' }}>
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
