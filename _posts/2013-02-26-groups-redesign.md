---
layout: post
title: Groups redesign
category: zoomin
---

Tuesday to Friday I work at Powershop, on their large rails app that runs most of the business. They're a great team and I really enjoy working on such a gnarly rails project.

However - Mondays are my work-from-home-on-ZoomIn day, and this Monday I worked on two things.

## Rails 2.3 migration

ZoomIn is written on [ruby on rails](http://www.rubyonrails.org/), starting with version 0.6 back in 2005. Over time it has been upgraded, but when I took over ZoomIn last year, it was stuck back on Rails 2.1. This was a bit of a pain, because some of the extensions I wanted to use (eg Facebook connect) aren't available for such an old version of rails, and secondly, there are a whole swathe of security issues with Rails apps that were fixed in 2.3.17. So, after updating my gems, copying in the initializers for the new app, I was mostly ready to deploy the new version. I used a git branch to test out the app against Rails 2.3. One of the biggest problems I had was replacing `classic_pagination` with `will_paginate`, but in doing so, I sped up a few queries and redesigned the pagination links on a few pages, so it worked out to be quite a benefit in the end.

So as of Monday night, ZoomIn is now running on the latest 2.3 version of Rails. Score!

## [Groups page redesign](http://zoomin.co.nz/group/show/8)

<img src="/images/groups-redesign.png" />
<cite>The new layout of the groups page</cite>

After getting the rails migration mostly done, I was fiddling around with the [groups](http://www.zoomin.co.nz/group/list/) functionality in ZoomIn. This has been a part of the site that I was always very excited about. I had modelled the groups on Flickr groups, which are a very social part of that site. So groups have a name, a description, an owner, and members, places and topics. My first priority was to update the groups so that they used the new [bootstrap](http://twitter.github.com/bootstrap/) theme that I had applied to the rest of the site. This was pretty straightforward. 

Next up, I was looking at a group that I created ([places I have lived](http://zoomin.co.nz/group/show/8)) and decided that it would be cool to add comments to each of the places that were included in a group. So, I made it that under each place that is listed as part of the group, it looks for comments on that place, that were made by a member of the group. If a comment is found, it's then displayed under the place, so that you can get a bit of a narrative going on of why that place is part of the group.

Next up is to work on Facebook integration I think, since people seem to have problem with the current authentication on ZoomIn. Also it'd be good to make it easier for businesses to add or update (or even promote?) their business on ZoomIn, since I get a lot of emails from people that can't work out how to add places. But that's for another day...