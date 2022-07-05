import React from 'react'
import ReactPaginate from 'react-paginate'
const Pagination = (props) => {
const handlePageClick = (data) => {
        props.setPageNum(data.selected)
}
  return (
    <div className='flex justify-center overflow-x-scroll'>
    <ReactPaginate
    previousLabel={'prev'}
    nextLabel={'next'}
    breakLabel={'...'}
    pageCount={props.totalPage}
    marginPagesDisplayed={2}
    pageRangeDisplayed={1}
    onPageChange={handlePageClick}
    containerClassName="flex"
    pageClassName='p-1 px-2 border'
    pageLinkClassName='text-black'
    previousClassName='p-1 border'
    breakClassName='p-1 border'
    nextClassName='p-1 border'
    activeClassName='bg-blue-500'
    />
    </div>

 
  )
}

export default Pagination;