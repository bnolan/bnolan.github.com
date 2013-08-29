---
layout: post
title: "Removing groups functionality"
---
 
I've been working on ZoomIn a bit lately, trying to work out how I can grow the traffic from the current 10,000 a day, to something about twice that. It's a huge ask, since most of the traffic to ZoomIn is just people finding it via Google search results, and once someone goes to the ZoomIn site and sees the map, they tend to leave right away (or click on a Google ad).

But it's my best chance of building and deploying code that people will actually see, so I've been hacking on ZoomIn, trying to thing of what I can do to grow the traffic. One of the things I've been doing lately is removing functionality that people don't use.

# Groups

When I first created ZoomIn, I was aiming to make a community site like Flickr, so one of the Flickr features we copied was Groups. The idea of a group is that people could create a little group, with a forum, and then add places to that group. A good example would be 'mountain bike tracks', which might have tracks added from all over New Zealand.

People liked the idea, and when we created groups back in 2006, quite a lot of groups were created.

But fast forward to 2013, and less than 0.5% of the page views on ZoomIn go to the groups pages. And so, in the interest of having more wood behind fewer arrows, I'm going to remove the groups code from ZoomIn. Note that I'm not actually deleting the group models from the database, all the existing groups will still be there, but I'm going to remove the controller and views, so that I can focus on making the common use-cases of ZoomIn work much better. If I get ZoomIn growing again, I'll look at re-adding the Groups in a crazy-improved guise.

# Login

Weirdly, the second most popular page on ZoomIn is the `/login` dialog, which makes me think that maybe there are more people trying to comment and use the social components than I expected, and that they are having trouble logging into the site (or else being turned off by the 'you must login screen' and abandoning their comments). I've been tentatively thinking about allowing anonymous comments on the site.

# Improvements to region pages

I've been working hard on the region page, redesigning and redesigning, trying to find a way to use the traffic to `/petone` and `/newtown` to create a community around those places. I'm a very long way away from creating the subreddit-for-each-town site that I'd like it to be, but I'm giving it a stab. I'll keep you updated.