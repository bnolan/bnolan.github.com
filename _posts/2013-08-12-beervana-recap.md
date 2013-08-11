---
layout: post
title: "Beervana Recap"
---

So, last Thursday at about 3pm, [Erin Francis](https://github.com/ezza) had the idea to build a mobile app that we could use to keep track of what beers we had drunk at [Beervana](http://beervana.co.nz/), and to get some rankings on the beers that people drunk, so that you could see what were the most popular beers.

We hacked it up as a rails app in about 4 hours, and it was ready to go the next day. It is available at [beervana.herokuapp.com](http://beervana.herokuapp.com/), and you can see the [leaderboard here](http://beervana.herokuapp.com/leaderboard). The source code to the app is available on [github](https://github.com/bnolan/beervana).

Some lessons from the app:

# It's cool working on something people use

We put the app together in a few hours, deployed it to heroku, tweeted it, and were retweeted a dozen times. We also emailed it out to everyone at our office, so that they could use it too. Through that we got 165 signups, and about 50 people used the app to record their beervana experience over the two days. It was super cool, everytime you got into the app, to see more people signed up and using it, and see what beers they recommended.

# Working on fluids means you can do maths

It was cool writing software that worked with a product that you can easily to maths on. For example we could tell you how many beers you'd had, how much alcohol (standard drinks), what volume, how many different breweries. We didn't get time, but we could also have rendered a histogram of consumption over time to see when Beervana "peaked".

# Having collaborators is awesome

Erin and I could both commit to the repo, so we could riff on ideas super fast and try out new things. Because it was just the two of us working on it, all the decisions could be made super fast, and we could just keep going on the app. We did find after about 3 hours, that we needed to take a break and play some pool and talk about something else, but after that, we just wrote down a checklist of things that needed to be finished before we could call it a night and have the app ready to use the next day. The combination of a checklist and a bit of a break from intense coding worked really well, and we polished the app off quite well.

# Deploying from Beervana

On the Beervana day (we went to the 11am-4pm session), I took my 11" Macbook with me, in case we needed to fix things on the fly. As it turned out, this worked pretty well. I wouldn't recommend it for any serious app of course (drinking a beer and using the production console is a bit of a no-no), but for the Beervana app it was fine. I broke the deployment briefly for a few minutes by twiddling with the production console, but that was quickly fixed, and we also added a fix that let you add beers on the fly (since it turned out our 'authoritive beer list' was missing a dozen beers).

# Going out after Beervana was a bad idea

Beervana was great, and I had an awesome night, but I really should have stuck with my original plan of going straight home from Beervana and having an early night. Staying out late after a day of samping craft beers did not end well for me, and my Saturday was a pretty lazy day of lying in bed and watching movies.

# Future of the app

I'm going to talk to Dom at Hashigo and see if he'd be interested in me setting up a similair app for the Pacific Beer Expo. It'd be cool if some more beer festivals used the app (which is basically an event-specific Untappd), it'd be great to see the app being used at the Great Australia Beer Spectapular for example.

# Build something people want

There were a few big eye-openers for me in building the Beervana app. One, you can build really fast when you now exactly what you want it to do. Two, It's awesome building something that people use. I build way too many apps that no-one wants, and thus, no-one every uses. Three, working with collaborators is awesome. Four, Heroku proves yet again that it's the best way to deploy quick little apps.