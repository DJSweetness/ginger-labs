export type GiphyResponseType = {
    data: {
        images: {
            original: {
                url: string;
            };
        };
        type: string;
        title: string;
    }[];
    pagination: {
        offset: number;
    }
};

export async function fetchGifs(inputValue: string, paginationOffset: number): Promise<GiphyResponseType> {
    const apiKey = 'brXMsD0cTFgrd7yQh6u17ilSMIhDz2t9';
    const endpoint = 'https://api.giphy.com/v1/gifs/search';
    const fullEndpoint = `${endpoint}?q=${inputValue}&api_key=${apiKey}&offset=${paginationOffset}`;
    const response = await fetch(fullEndpoint);
    const { data, pagination }: GiphyResponseType  = await response.json();
    
    return {
        data,
        pagination
    };
}