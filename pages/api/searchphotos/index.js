import axios from "axios";

export default async function searchphotos(req, res) {
    const { pageNumber, pageSize } = req.query;
    
    // if(pageNumber === undefined || pageSize === undefined || tag === undefined) return;

    //console.log("Server's output : ", pageNumber, pageSize, tag);

    try {
        const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&page=${pageNumber}&page_size=${pageSize}&q=beautiful`;
        const result = await axios.get(url);
        const data = result.data
        // console.log(data);
        res.status(200).send(data);
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }

}