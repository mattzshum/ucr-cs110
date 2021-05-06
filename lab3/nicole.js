var timer = new IntervalTimer(fetchTweets, 5000);
const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather";
const tweetContainer = document.getElementById('contentCenter');
let dict = {};

const pauseUnpause = clickedButton => {
  let currText = document.getElementById("timer-button").innerHTML;
  if (currText == "resume feed") {
      timer.resume();
      document.getElementById("timer-button").innerHTML = "pause feed";
      console.log("success-1");
  }
  else if (currText == "pause feed") {
      timer.pause();
      document.getElementById("timer-button").innerHTML = "resume feed";
      console.log("success-2");
  }
  else {
      timer.timeoutCallback();
      console.log("fail");
  }
  console.log(currText);
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
fetch(url)
  .then(res => res.json())
  .then(data => {
    data.statuses.map(tweet => {
      console.log(tweet);
      dict[tweet.user.id] = tweet;
      tweetContainer.innerHTML += `<div class="tweetBlock">
      <div class="d-flex">
        <img src="${tweet.user.profile_image_url}" alt="Avatar" class="avatar">
        <div class="nextToAvatar d-flex flex-column">
          <div class="twoLine d-flex">
            <p><b>${tweet.user.name}</b></p>
            <p class="tweetInfo">@${tweet.user.screen_name} ${date(tweet.created_at)}</p>  
          </div>
          <p>${tweet.text}</p>
        </div>
      </div>
    </div>`
    });
    // for (let i = 0; i < 10; i++) {
    // document.getElementById('tweetInfo').innerText= "@" + data.statuses[i].user.screen_name;
    // // console.log(data.statuses[i].user.screen_name);
    // }
  })
  .catch(err => {
    // error catching
    console.log(err);
  })
}

function IntervalTimer(callback, interval) {
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