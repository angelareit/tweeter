/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  renderTweets(data);


})
 
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

function createTweetElement(data) {
  const element =
    `<article class="tweet-block">
     <header>
       <img src="${data.user.avatars}" alt="avatar" />
       <h2>${data.user.name}</h2>
       <h5>${data.user.hanle}</h5>
     </header>
     <p>${data.content.text}</p>
     <hr>
     <footer>
       <h6>${data.created_at}</h6>
       <div class="interactions">
         <i class="icon fa-solid fa-flag"></i>
         <i class="icon fa-solid fa-retweet" ></i>
         <i class="icon fa-solid fa-heart"></i>
       </div>
     </footer>
    </article>`;
  return element;
}

const renderTweets = function(tweets) {
  // loops through tweets
  tweets.forEach(tweet => {
    // calls createTweetElement for each tweet
    const element = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweet-container').append(element);
  });
}