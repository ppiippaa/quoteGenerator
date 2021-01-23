const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitter = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Loader Functionality
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get quote from API (with asynchronous Fetch Function)
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://shrouded-springs-59378.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // In case author is blank:
        if (data.quoteAuthor === "") {
            authorText.innerText = "Unknown"
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // authorText.innerText = data.quoteAuthor; <-- no longer needed as part of if statement error control
        // Reduce font size if quote > 120 characters:
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        console.log(data);
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
        console.log("whoops, no quote", error);
    }
}
    // Tweet quote
    function tweetQuote() {
        const quote = quoteText.innerText;
        const author = authorText.innerText;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
        window.open(twitterUrl, '_blank');
    }

    //Event listeners
    newQuoteBtn.addEventListener('click', getQuote);
    twitter.addEventListener('click', tweetQuote);

//On load
getQuote();
