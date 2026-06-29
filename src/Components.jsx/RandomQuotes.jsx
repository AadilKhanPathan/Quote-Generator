import React, { useState, useEffect } from "react";
import refreshIcon from "../assets/refresh.png";
import twitter from "../assets/twitter.png";

function RandomQuotes() {
  const [isLoading, setisLoading] = useState(false);
  const [quote, setQuote] = useState({
    text: "",
    author: "",
  });

  async function getRandomQuote() {
    setisLoading(true)
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const data = await response.json();

      setQuote({
        text: data.quote,
        author: data.author,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false)
    }
  }
  useEffect(() => {
    getRandomQuote();
  }, []);

  function openTwitter(){
    const tweetText = `${quote.text}  - ${quote.author}`;
    
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText )}`, 
    "tweet Window", 
    "width=600, height=600")
  }

  return (
    <div className="container">
      <div className="quote">{isLoading ? "fetching wisdom" : quote.text}</div>
      <div className="bottom">
        <div className="nameOfAuthor"> {isLoading ? "..." : `- ${quote.author}`}</div>
        <div className="icons">
          <img src={refreshIcon} onClick={getRandomQuote} alt="Refresh quote" style={{ opacity: isLoading ? 0.5 : 1, cursor: isLoading ? 'default' : 'pointer' }} />
          <img src={twitter} onClick={openTwitter} alt="Share on Twitter" />
        </div>
      </div>
    </div>
  );
}

export default RandomQuotes;
