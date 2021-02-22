import React, { useRef, useState } from 'react';
import './App.css';
import { fetchGifs, GiphyResponseType } from './utils';
import { GiphyGrid } from './Components/GiphyGrid/GiphyGrid';
import { Pagination } from './Components/Pagination/Pagination';

const giphyResponseDefault = {
  data: [],
  pagination: { offset: 0 }
};

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [giphyResponse, setGiphyResponse] = useState<GiphyResponseType>(giphyResponseDefault);
  const [cache, setCache] = useState<Record<string, GiphyResponseType>>({});
  const [paginationOffset, setPaginationOffset] = useState(0);
  const [lastFetchedInputVal, setLastFetchedInputVal] = useState('');
  const dataFetchSize = 50; // default of giphy request - used for fetching with pagination and search

  function handleDataFetching(offset: number) {
    const inputValue = inputRef?.current?.value || lastFetchedInputVal;

    if (inputValue) {
      const cacheKey = inputValue + offset;

      // This is our caching logic, we maintain a key/value pair
      // the key being what we've searched for (including offset)
      // and the value is the response from the fetch
      if (cache[cacheKey]) {
        setGiphyResponse(cache[cacheKey]);
      } else {
        (async () => { // IIFE for simplicity
          const giphyResponse = await fetchGifs(inputValue, offset);
  
          // Store response in cache
          setCache({
            ...cache,
            [cacheKey]: giphyResponse
          });

          // Store results and set the last input value so when we paginate
          // it makes use of the same functionality and only the offset changes
          setGiphyResponse(giphyResponse);
          setLastFetchedInputVal(inputValue);
        })();
      }
    }
  }

  // Used for initial/new searches
  function handleSearchClick() {
    handleDataFetching(0);
    setPaginationOffset(0);
  }

  return (
    <div id='app-container'>
      <div id='search-container'>
        <input id='input-search' type='search' placeholder='Search Giphy here' ref={inputRef} />
        <button id='add-filter-button' type='submit' onClick={handleSearchClick}>Search</button>
      </div>
      {
        giphyResponse.data.length > 0 &&
        <Pagination
          fetchNextPagination={handleDataFetching}
          paginationOffset={paginationOffset}
          setPaginationOffset={setPaginationOffset}
          paginationSize={dataFetchSize}
        />
      }
      <div>
        {
          giphyResponse.data.length === 0
            ?
              <div>No Results</div>
            :
              <GiphyGrid giphyResponse={giphyResponse} />
        }
      </div>
    </div>
  );
}

export default App;
