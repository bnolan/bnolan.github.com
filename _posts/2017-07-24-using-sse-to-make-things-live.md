---
layout: post
title: "Using SSE to make things live"
---
 
Last week I stayed up late on a Tuesday night and built the prototype of [Talking](https://talking.herokuapp.com), my idea of a forum where you leave voice messages for each other. I decided I wanted to do this as a way to get out all my ideas for a next generation reddit out on one place:

* Live updates
* Voice replies

That's basically it, I wanted to do those two things, in preact. Anyway, I've got it mostly working, you can hear me talking to myself (since no one else uses it), I haven't implemented voting yet, but I will do that soon, and then you'll be able to use it the way I imagine (I'll use the [Lower bound of Wilson score confidence interval for a Bernoulli parameter](http://www.evanmiller.org/how-not-to-sort-by-average-rating.html)), as a shitty weird forum that no one uses. Or maybe I'll post it on /r/internetisbeautiful and 10,000 people will use it for one day and then never come back. Or maybe it'll develop some kind of weird synthesisers user group who use it to reply to each other with beeps and boops (I know I'd like to use it like that).

Anyway - so I've got it going, and how it works, is the [preact](https://github.com/developit/preact) app boots up and fetches the recordings, then you can click a recording to get the tree or replies.

## Getting a tree of recordings

I do this in one operation using this recursive query:

    WITH RECURSIVE recordingtree AS (
      SELECT r1.*, 0 as depth
      FROM recordings r1
      WHERE r1.id = $1::integer

      UNION ALL

      SELECT r1.*, r2.depth + 1 as depth
      FROM recordings r1
      INNER JOIN recordingtree r2
        ON r2.id = r1.parent_id
    )

    SELECT * FROM recordingtree;

That returns a post and all it's children (using `parent_id`), and then because I couldn't work out how to munge that into json in postgres, I do a little postprocessing in node land to turn it into a nested json object.

All well and good, but - how about live updates?

## Live updates

My dream for a better reddit (or one that's impossible to follow, or really hard to keep up because it uses too much resources, but anyway, my idea) is to see people replying directly, like see 'x is recording a reply' and then see the reply appear instantly. My idea here is genius:

## Whenever you return json from a fetch, make it a SSE stream

[Server sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) are basically the thing you should always be using instead of websockets. Websockets are cool, but totally unnecessary 95% of the time (unless you're making scenevr, that needed websockets for realtime position updates from client to server).

So what I'm planning on doing, is when a client requests some data (like the list of top level recordings, or all the recordings in a tree), is to do the query, send the response, and then keep the request open (it's really easy to do SSE with express), and then subscribe to a redis pub/sub channel with the name of the request (eg `/recording/1234`), and then whenever someone submits a new recording (or votes or whatever), you:

* Write the new recording to the database
* Query for the tree of recordings
* Convert the tree to json
* Write the json to a redis pubsub topic

All connected clients are listening to that topic, and we can just send the json down the wire (plus two newlines `\n\n`) and they'll all get a live updated view of the thread.

It's like the easiest way ever to do real time live stuff (the same way github does). Anyway, I'm gonna try to that this week, we'll see how it goes.