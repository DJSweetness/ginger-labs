import { GiphyResponseType } from './../../utils';
import './giphy-grid.css';

function filterGifs(array: GiphyResponseType['data'], type = 'gif'): GiphyResponseType['data'] {
    return array.filter(item => item.type === type);
}


export function GiphyGrid({
    giphyResponse
}: {
    giphyResponse: GiphyResponseType
}) {
    const giphyDataArray = giphyResponse.data;
    const gifDataArr = filterGifs(giphyDataArray);

    // Simply iterates over the data from giphy and let's css handle the formatting
    return (
        <div className='gallery'>
            {
                
                gifDataArr.map((gifData, index) => 
                    <img
                        key={`${gifData.title}-${index}`}
                        className='gif-image'
                        src={gifData.images.original.url}
                        alt={gifData.title}
                    />
                )
            }
        </div>
    )
}