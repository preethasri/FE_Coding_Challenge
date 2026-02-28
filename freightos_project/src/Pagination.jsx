import React from 'react'

const Pagination = ({totalCount,paginationLength=0,setPage,handlePageChange,page}) => {
    console.log(paginationLength)
  return (
     <div className="pagination-container">
          {totalCount > 0 && (
            <>
              <button
                onClick={() => {
                  setPage((page) => page - 1);
                }}
              >
                {"<"}
              </button>
              {Array.from({ length: paginationLength }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    className={page === pageNum ? "active" : ""}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  setPage((page) => page + 1);
                }}
              >
                {">"}
              </button>
            </>
          )}
        </div>
  )
}

export default Pagination