---
layout: post
title: "Auto rollback on error increase"
---
 
Last night I deployed to ZoomIn, and I forgot to run the migrations that were included in the deploy. Bit of a newbie mistake, but it did point out to me that I need better ops. There's two things that would've helped in this case.

# Auto rollback on error

I use [raygun](http://raygun.io/) for my error tracking, and they promptly emailed me after the deploy that the rate of errors had spiked majorly. They currently [don't have an API](http://raygun.io/faq/does-raygun-have-a-public-rest-api) though. Once they do have an API, I'd like to add some kind of job (cronjob?) that polls raygun for the error count, and if the errors/minute rate goes up after a deploy, automatically rollback to the previous version of the app.

# Deploy feature branches to staging

Another neat feature would be an easy way of deploying feature branches to staging, then when I wanted to push out the feature that I worked on, it wouldn't have broken production.

# Ops scripts for small companies

If I worked at a large company (10+ developers), I'd totally invest in getting these features built, but because it's just me, it's not really worth my time to create these scripts (there's a lot of other ops stuff that needs to be done first, eg moving to s3, CDNs), but if I do get around to building these ops tools (probably as capistrano add-ins?), it'd be super cool to share them with the community.