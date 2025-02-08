import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../components/QuoteDisplay.css';

const QuoteDisplay = () => {
    const [quote, setQuote]= useState('');
    const [error, setError]= useState(null);
    const [loading, setLoading] = useState(false);
    const apiKey = 'HfcPBOrBnxR63JSp7XYyrw==UDwIvc9mwFxd0w26';
    useEffect(()=> {
        fetchQuote();
    }, []);
const fetchQuote = async () => {
    setLoading (true);
    setError (null);
    try{
        const response = await axios.get('https://api.api-ninjas.com/v1/quotes',{
            headers:{
                'X-API-Key': apiKey,
            },
        });
        if (response.data && response.data.length > 0 ){
            setQuote(response.data[0].quote);
        }else{
            setError('No quote available');
        }
    }catch(err){
        setError('Failed to fetch quote');
    }finally{
        setLoading(false);
    }
};
return(
    <div className="quote-container">
        <h1>Random Quote</h1>
        {loading ? (
            <p>Loading...</p>
        ) : error ?(
            <p>{error}</p>
        ) : (
            <p>{quote}</p>
        )}
        <button onClick={fetchQuote}>Fetch New Quote </button>
        </div>
);
};
export default QuoteDisplay;