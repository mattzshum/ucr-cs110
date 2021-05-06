var timer = new IntervalTimer(fetchTweets, 5000);
// const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather";
const tweetContainer = document.getElementById('contentCenter');
let dict = {};

const pauseUnpause = clickedButton => {
  let currText = document.getElementById("timer-button").innerHTML;
  if (currText == `<span class="fas fa-play" aria-hidden="true"></span>`) {
      timer.resume();
      document.getElementById("timer-button").innerHTML = `<span class="fas fa-pause" aria-hidden="true"></span>`;
      console.log("success-1");
  }
  else if (currText == `<span class="fas fa-pause" aria-hidden="true"></span>`) {
      timer.pause();
      document.getElementById("timer-button").innerHTML = `<span class="fas fa-play" aria-hidden="true"></span>`;
      console.log("success-2");
  }
  else {
      timer.timeoutCallback();
      console.log("fail");
  }
  console.log(currText);
}

let searchString = "" // here we use a global variable

const handleSearch = event => {
    searchString = event.target.value.trim().toLowerCase();
    // you may want to update the displayed HTML here too
    console.log(searchString);
    refreshPage();
}
document.getElementById("searchBar").addEventListener("input", handleSearch)

function refreshPage(){
  while(tweetContainer.firstChild){
    tweetContainer.removeChild(tweetContainer.firstChild);
  }
  for (const [key, value] of Object.entries(dict)){
    if(value.text.includes(searchString)){
        tweetContainer.innerHTML += `<div class="tweetBlock">
        <div class="d-flex">
          <img src="${value.user.profile_image_url}" alt="Avatar" class="avatar">
          <div class="nextToAvatar d-flex flex-column">
            <div class="twoLine d-flex">
              <p><b>${value.user.name}</b></p>
              <p class="tweetInfo">@${value.user.screen_name} ${date(value.created_at)}</p>  
            </div>
            <p>${value.text}</p>
          </div>
        </div>
      </div>`
    }
  }
}

const date = (given) => {
  let t = new Date(given);
  let month = t.getMonth();
  let day = t.getDate();

  switch(month) {
    case 1:
      return 'Jan ' + day;
    case 2: 
      return 'Feb ' + day;
    case 3:
      return 'Mar ' + day;
    case 4:
      return 'Apr ' + day;
    case 5:
      return 'May ' + day;
    case 6: 
      return 'Jun ' + day;
    case 7:
      return 'Jul ' + day;
    case 8:
      return 'Aug ' + day;
    case 9: 
      return 'Sep ' + day;
    case 10:
      return 'Oct ' + day;
    case 11: 
      return 'Nov ' + day;
    case 12:
      return 'Dec ' + day;
    default:
  }
  // return month + ' ' + day;
}

function fetchTweets(){
  const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.statuses.map(tweet => {
        console.log(tweet);
        dict[tweet.id] = tweet;
      })

      let items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
      });

      items.sort(function(first, second) {
        if (first[1].created_at < second[1].created_at) return 1;
        if (first[1].created_at > second[1].created_at) return -1;

        return 0;
      });

      console.log(items);
      return items;
    })
    .then(items => {
      // console.log(items);

      tweetContainer.innerHTML = "";

      items.map(tweet => {
        tweetContainer.innerHTML += `<div class="tweetBlock">
        <div class="d-flex">
          <img src="${tweet[1].user.profile_image_url}" alt="Avatar" class="avatar">
          <div class="nextToAvatar d-flex flex-column">
            <div class="twoLine d-flex">
              <p><b>${tweet[1].user.name}</b></p>
              <p class="tweetInfo">@${tweet[1].user.screen_name} ${date(tweet[1].created_at)}</p>  
            </div>
            <p>${tweet[1].text}</p>
          </div>
        </div>
      </div>`;
      })

      
    })
    .catch(err => {
      // error catching
      console.log(err);
  })
}

function tweetContains(tweet){
  /*
  function takes tweet object as input. if tweet contains searchString, return true, meaning that the tweet SHOULD be displayed
  */
 console.log("filtering...")
  if (tweet.text.includes(searchString)){
    return true;
  }
  return false;
}


function IntervalTimer(callback, interval) {
  fetchTweets();
  var timerId, startTime, remaining = 0;
  var state = 2; //start on resumed
  //0=idle
  //1=running
  //2=paused
  //3=resumed

  this.pause = function () {
      console.log(state, ": pausing");
      if (state != 1) return;

      remaining = interval - (new Date() - startTime);
      window.clearInterval(timerId);
      state = 2;
  };

  this.resume = function() {
      console.log(state, ": resuming");
      if (state != 2) return;

      state = 3;
      window.setTimeout(this.timeoutCallback, remaining);
  };

  this.timeoutCallback = function() {
      if (state != 3) return;

      callback();
      startTime = new Date();
      timerId = window.setInterval(callback, interval);
      state = 1;
  };

}

// const search = (str) => {

// }

// var searchInput = document.getElementById("searchBar");

// searchInput.addEventListener("keyup", function(event)) {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     search()
//   }
// }