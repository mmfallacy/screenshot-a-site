import axios from 'axios';
import API_KEY from '../apikey'
class Screenshot{
    url: string;
    timeout: number;
    constructor(url: string,timeout: number=30000){
        this.url = url
        this.timeout = timeout
    }
    async capture(){
        let URL_TEMPLATE = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${encodeURI(this.url)}&full_page=true&scroll_page=true&format=png&response_type=image
            `;
        let {status, data} = await axios.get(URL_TEMPLATE,{timeout:this.timeout,responseType:'blob'}) 
        if(status!==200) throw new Error('STATUS CODE NOT 200')
        return URL.createObjectURL(data)  
    }
}

export default Screenshot;