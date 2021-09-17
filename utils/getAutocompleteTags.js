import axios from 'axios';

const getAutoCompleteTags = async (query) => {
    let cancel;
    try {
        const res = await axios.get(`https://api.datamuse.com/sug?s=${query}&max=5`, {
            cancelToken : new axios.CancelToken(c => cancel = c),
        });
        const data = res.data;
        return data;
    } catch(error) {
        if(axios.isCancel(error)) return;
        console.log(error);
    }
    cancel();
    
}

export default getAutoCompleteTags;