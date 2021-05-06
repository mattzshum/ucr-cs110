# Lab 3 - Updated Server Endpoint

## Removing duplicates
Our implementation removes duplicates by mapping the tweet id's into a dict, then converting it into a sorted array.

## Pausing and unpausing the feed
* Page starts off with an initial 10 tweets
* Will fetch 10 more tweets every 5 seconds after pressing the play button
* Pause the feed with the same button to stop fetching
* Refreshing starts the page off again at 10 new tweets

## Search

## Sorting and displaying the tweets
The page displays 10 initial tweets as a starting point to view the main fetch instruction of the lab. They should already be sorted newest to oldest, and is logged onto the console. View them from items[1].created_at. Every time the page refreshes or adds more tweets, they will all be sorted automatically. The dict is turned into a sorted array every time more tweets are appended to it, and the innerHTML is reset to empty before displaying the entire array with new tweets.

***

> Accounts with outdated profile picture links will not show a photo but instead display its alt="Avatar"
