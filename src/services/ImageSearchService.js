import axios from 'axios';

const GET_URL = "https://images-api.nasa.gov";

export async function searchImages(filterVal, page) {

     return await axios.get(GET_URL + "/search", {
        params: {
            q: filterVal,
            media_type: 'image',
            page: page
        }})

}