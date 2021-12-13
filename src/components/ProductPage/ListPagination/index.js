import React from 'react'
import { Pagination } from 'antd'
function ListPagination() {
  return (
    <div>
      <Pagination
        style={{ display: 'flex', justifyContent: 'center', paddingBottom: '50px' }}
        defaultCurrent={1}
        defaultPageSize={5}
        total={10}
        // onChange={changePage}
      />
    </div>
  )
}

export default ListPagination
