import React from 'react';
import './pagination.css';

export function Pagination(
    {
        fetchNextPagination,
        paginationOffset,
        paginationSize,
        setPaginationOffset
    }: 
    {
        fetchNextPagination: (index: number) => void;
        paginationOffset: number;
        paginationSize: number;
        setPaginationOffset: React.Dispatch<React.SetStateAction<number>>
    }
) {
    // Previous and Next handlers to fetch new data 
    function handlePreviousClick() {
        setPaginationOffset(paginationOffset - paginationSize);
        fetchNextPagination(paginationOffset - paginationSize);
    }
    function handleNextClick() {
        setPaginationOffset(paginationOffset + paginationSize);
        fetchNextPagination(paginationOffset + paginationSize);
    }

    return (
        <div id='pagination-button'>
            <button
                id='pagination-button'
                disabled={paginationOffset === 0}
                onClick={handlePreviousClick}
            >
                Prev
            </button>
            <button
                onClick={handleNextClick}
            >
                Next
            </button>
        </div>
    )
}