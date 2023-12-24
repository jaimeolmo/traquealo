'use client'
import Stack from '@mui/joy/Stack'
import { useRouter } from 'next/navigation'
import ReactPaginate from 'react-paginate'

type ComponentProps = {
  totalPages: number
}
export function Pagination({ totalPages }: ComponentProps) {
  const router = useRouter()

  const handlePageClick = (event: { selected: number }) => {
    router.push(`/dashboard?p=${event.selected + 1}`)
  }

  return (
    <>
      <Stack direction={'row'}>
        <ReactPaginate
          previousClassName={'paginationNavButtons'}
          nextClassName={'paginationNavButtons'}
          containerClassName={'pageContainerStyle'}
          pageClassName={'pageStyle'}
          breakClassName={'paginationBreak'}
          breakLabel="..."
          nextLabel="siguiente >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< anterior"
          renderOnZeroPageCount={null}
        />
      </Stack>
    </>
  )
}
