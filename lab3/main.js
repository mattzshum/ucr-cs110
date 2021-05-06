// var intervalID = window.setInterval(fetchTweets, 5000);
var timer = new IntervalTimer(fetchTweets, 5000);

function fetchTweets(){
    const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather";

    fetch(url)
         .then(res => res.json()).then(data => {
             parseData(data);
         })
         .catch(err => {
             console.log(err);
         });
}

function parseData(data){
    console.log("parsing data package...")
    // console.log(data);
    // console.log(data.statuses[0].id)
    let listStatuses = data.statuses;
    for (i = 0; i < 10; ++i){
        console.log(data.statuses[i].id);
    }
    refreshTweets(data);
}

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

let searchString = "" // here we use a global variable

const handleSearch = event => {
    searchString = event.target.value.trim().toLowerCase();
    // you may want to update the displayed HTML here too
    console.log(searchString);
    fetchTweets();
}
document.getElementById("searchBar").addEventListener("input", handleSearch)

function doesContain(value){
    if (value.includes(searchString)){
        return value;
    }
    return;
}

const tweetContainer = document.getElementById('tweet-list');
function refreshTweets(tweets) {
    while (tweetContainer.firstChild) {
        tweetContainer.removeChild(tweetContainer.firstChild);
        console.log('deleting child');
    }

    console.log(tweets);

    // create an unordered list to hold the tweets
    const tweetList = document.createElement("ul");
    console.log(tweetList);
    console.log(tweetContainer);
    // append the tweetList to the tweetContainer
    tweetContainer.appendChild(tweetList);

    // all tweet objects (no duplicates) stored in tweets variable

    // filter on search text
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
    const filteredResult = tweets.filter(doesContain);
    console.log(filteredResult);
    // sort by date
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
    const sortedResult = filteredResult.sort();

    // execute the arrow function for each tweet
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
    sortedResult.forEach(tweetObject => {
        // create a container for individual tweet
        const tweet = document.createElement("li");

        // e.g. create a div holding tweet content
        const tweetContent = document.createElement("div");
        // create a text node "safely" with HTML characters escaped
        // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode}
        const tweetText = document.createTextNode(tweetObject.text);
        // append the text node to the div
        tweetContent.appendChild(tweetText);

        // you may want to put more stuff here like time, username...
        tweet.appendChild(tweetContent);

        // finally append your tweet into the tweet list
        tweetList.appendChild(tweet);
    });
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

/*
Access to fetch at 'http://twitterfeedserverrails-env.eba-xmqy8ybh.us-east-1.elasticbeanstalk.com/feed/random?q=weather'
 from origin 'null' has been blocked by CORS policy:
 No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response
 serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
*/