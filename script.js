// fetch("https://timshim-quotes-v1.p.rapidapi.com/quotes", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "23dde46b9dmshed3f363ede0bb32p127bb6jsn5cf894d52a53",
// 		"x-rapidapi-host": "timshim-quotes-v1.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });

const quoteContainer=document.getElementById("quote-container");
const quoteText=document.getElementById("quote");
const authorText=document.getElementById("author");
const twitterBtn=document.getElementById("twitter");
const newQuoteBtn=document.getElementById("new-quote");
const loader= document.getElementById('loader');


//show oading
function loading(){
    // quoteContainer.classList.add('hiddingquote');
    loader.hidden=false
    quoteContainer.hidden=true;
}
function complete(){
    // quoteContainer.classList.add('hiddingquote');
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
        
    }
    
}


async function getQuote(){
    loading();
   const proxyApi="https://infinite-eyrie-93305.herokuapp.com/" 
const apiUrl="https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
try{
const resp= await fetch(proxyApi + apiUrl);
const answer= await resp.json();
// quoteContainer.classList.remove('hiddingquote');
console.log(answer)
if(answer.quoteAuthor === ""){
    authorText.innerText="Anonymous"
}else{
    authorText.innerText=answer.quoteAuthor;
}
if(answer.quoteText.length>120){
    quoteText.classList.add('long-quote')
}else{
    quoteText.classList.remove('long-quote')
}
quoteText.innerText=answer.quoteText
 complete()
}
catch(err){
    // getQuote()
    console.log("woops",err)
}
}
function tweetQuote(){
    const quote =quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl,"_blank");
}
//event listener
newQuoteBtn.addEventListener("click",getQuote)
twitterBtn.addEventListener("click",tweetQuote)

getQuote()
// loading()