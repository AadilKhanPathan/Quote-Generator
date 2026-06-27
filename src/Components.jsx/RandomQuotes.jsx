import React, { useState } from "react";
import { useEffect } from "react";
import refreshIcon from "../assets/refresh-icon.png";
import twitter from "../assets/twitter.png";

function RandomQuotes() {
  const [quote, setQuote] = useState({
    text: "Do the best you can until you know better. Then when you know better, do better",
    author: "maya angelou",
  });

  async function getRandomQuote() {
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
    }
  }
  useEffect(() => {
    getRandomQuote();
  }, []);

  function opentwitter(){
    const tweetText = `${quote.text}  - ${quote.author}`;
    
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText )}`, 
    "tweet Window", 
    "width=600, height=600")

    
  }

  return (
    <div className="container">
      <div className="quote">{quote.text}</div>
      <div className="bottom">
        <div className="nameOfAuthor"> - {quote.author}</div>
        <div className="icons">
          <img src={refreshIcon} onClick={getRandomQuote} alt="" />
          <img src={twitter} onClick={opentwitter} alt="" />
        </div>
      </div>
    </div>
  );
}

export default RandomQuotes;
