import React, { useState, useEffect } from "react";
import colorArr from './colorsArr'
import './App.css'

const quoteUrl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const App = () => {
  const [quotesArr, setQuotesArr] = useState(null)
  const [randomNumber, setRandomNumber] = useState(0)
  const [quotes, setQuotes] = useState(null)
  const [color, setColor] = useState(colorArr[Math.floor(Math.random() * colorArr.length)])
  const handleNewQuote = () => {
    setRandomNumber(Math.floor(Math.random() * quotesArr.length))
    setQuotes(quotesArr[randomNumber])
    setColor(colorArr[Math.floor(Math.random() * colorArr.length)])
  }
  const fetchQuotes = async (url) => {
    await fetch(url).then(res => res.json()).then(data => {
      setQuotesArr(data.quotes)
      setRandomNumber(Math.floor(Math.random() * data.quotes.length))
      setQuotes(data.quotes[randomNumber])
    })
  }
  useEffect(() => {
    fetchQuotes(quoteUrl)
  }, [quoteUrl])
  return (
    <div className="App" style={{background: color}}>
      <div className="App-header">
        <div id="quote-box" style={{color}} className="shadow text-center">
          <div className="quote-text">
            <i className="fa fa-quote-left"> </i>
            <span id="text">{quotes?.quote}</span>
          </div>
          <div className="quote-author">- <span id="author">{quotes?.author}</span></div>
          <div className="buttons">
              <a
                href={encodeURI(`http://www.twitter.com/intent/tweet?text="${quotes?.quote}" -${quotes?.author}`)}
                className="btn text-light button"
                id="tweet-quote"
                title="Tweet this quote!"
                target="_top" style={{ background: color }}
              >
                <i className="fa fa-twitter" />
              </a>
            <button className="btn text-light button" style={{ background: color }} id="new-quote" onClick={handleNewQuote}>New quote</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
