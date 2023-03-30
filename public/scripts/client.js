/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  loadTweets();

  //detect scroll
  $(window).scroll(function() {

    var height = $(window).scrollTop();

    if (height > 350) {
      console.log('peekaboo');
      $("nav").fadeOut(200);
      $("#back-top").fadeIn(200, function() { });
    }
    else {
      $("nav").fadeIn(200);
      $("#back-top").fadeOut(200, function() { });
    }

  });

  $("#back-top").click(function(event) {
    event.preventDefault();

    window.scrollTo(0, 0);


  });


  //catch clicks on write tweet button
  $(".write-new-tweet").click(function(event) {
    event.preventDefault();

   // $("h2").effect("bounce", { times: 3 }, 300);
    $(".new-tweet").toggle(200, function() {});

  });


  //event listener for the new tweet form
  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();

    //convert data into query string
    let input = $(this).serialize();

    $(".err-popup").slideUp(100, function() { });

    //access the target element for more accurate comparison
    let tweetVal = $("#tweet-text").val();
    if (tweetVal.length <= 140 && tweetVal.length > 0) {
      //submit (ajax) jquery post request to send data to the server
      $.post('/tweets', input)
        .then(() => {
          console.log('tweet saved');
          getNewTweet();
        });

    }
    else {
      $(".err-popup").slideDown(200, function() {
        $(this)
          .css("visibility", "visible")
          .val('OVERRIDE')
        //$( ".popup" ).css( "visibility", "hidden" );
      });
      //alert('NO, TRY AGAIN');
    }

  });

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
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

function createTweetElement(data) {
  const time = timeago.format(data.created_at, 'en_US');

  const element =
    `<article class="tweet-block">
     <header>
       <img src="${data.user.avatars}" alt="avatar" />
       <h2>${data.user.name}</h2>
       <h5>${data.user.handle}</h5>
     </header>
     <p>${safeText(data.content.text)}</p>
     <hr>
     <footer>
       <h6>${time}</h6>
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
    // takes return value and adds it on top of the tweets container
    $('#tweet-container').prepend(element);
  });
}

const loadTweets = function() {
  //pull data from server and display them with the format
  $.get('/tweets')
    .then(data => {
      renderTweets(data);
    });
}

//inserts the new tweet block in the container
const displayNewTweet = function(data) {
  const element = createTweetElement(data);
  $('#tweet-container').prepend(element);
}

const getNewTweet = function() {
  //reset textarea in the HTML and counter
  const textArea = $("#tweet-text");
  textArea.val('');
  const counter = textArea.next().find('output');
  counter.val(140);

  //display recent post at the top
  $.get('/tweets')
    .then(data => {
      console.log(data[data.length - 1]);
      displayNewTweet(data[data.length - 1]);
    });
}

const safeText = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};