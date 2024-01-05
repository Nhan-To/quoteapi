import React, {useEffect, useState} from 'react'; 
import style from './Quote.css';

const QuoteComponent = () => {
    const [Quote, setQuote] = useState([]); 
    const [Author, setAuthor] = useState([]); 

    const getQuote = () => {
        setAuthor([]);
        const response = fetch('https://api.quotable.io/quotes')
        .then((response) => {
            return response.json()
        })
        .then((quoteList) => {
            const randomNum = Math.floor(Math.random() * quoteList.results.length);
            setQuote(quoteList.results[randomNum]);
        })
    };

    const displayTags = () => {
        if (Quote && Quote.tags) {
          return Quote.tags.join(', '); // Join tags with commas
        }
        return '';
    };

    const handleAuthorClick = () => {
        fetch(`https://api.quotable.io/quotes?author=${Quote.author}`)
            .then((response) => {
            return response.json();
            })
            .then((authorList) => {
            setAuthor(authorList.results);
            })
            .catch((error) => {
            console.error('Error fetching author quotes:', error);
            });
        };

    useEffect( () => {
        getQuote();
    }, []);

    return(
        <div className='quoteContainer center'>
            <h1>Random Quote Generator</h1>
            <p className="quotes">"{Quote.content}"</p>
            <p className='tags'>{displayTags()}</p>
            
            <div className='Author' onClick={handleAuthorClick}>
                <p>- {Quote.author}</p>
                {Author.length > 0 && (
                    <div>
                        <h2>All Quotes by {Quote.author}</h2>
                        <ul>
                        {Author.map((quoteData, index) => (
                            <li key={index}>{quoteData.content}</li>
                        ))}
                        </ul>
                    </div>
                )}
            </div>
            
            <button onClick={getQuote}>Get Another Quote</button>
        </div>
    );
};

export default QuoteComponent;