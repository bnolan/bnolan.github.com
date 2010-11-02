---
layout: post
title: Twitterplaces
---

I went to a R users group in melbourne and got all turned on by data analysis, so I went home and started crawling all the tweets in the world and sticking them into a Postgres database. I then went and build this [site](http://www.twitterplaces.com/).

I keep playing around with the site and adding random features and new pages, but I'd like some feedback on what I could do so that people actually found the site useful. It's cool building a site for myself, but it'd be cool if more than 10 people a day used the site. What do you lot think would be some concrete features to add to the site?

Here's some of the current pages that I think are interesting but could do with some work:

* http://www.twitterplaces.com/muc
* http://www.twitterplaces.com/users/dens
* http://www.twitterplaces.com/sfo/twitter-hq
* http://www.twitterplaces.com/sfo/mission

Some technical infos:

I crawl the data using the streaming API, all geotagged tweets in the world (about 2m/day). The crawler is written in ruby and does a bunch of caching so it doesn't have to hit up postgres too much.

I use postgis so I can lookup bounding neighbourhoods and cities for points based on lat / long.

Some of the queries are insanely slow (eg which users travel the world the most), so I need to work out a better way of generating results.

It's running on a AMD X4 box with 4gb of ram, so seems to keep chugging along.

I use varnish on the front of the site to cache html for a few minutes after each visit.

TLDR: Have [site](http://www.twitterplaces.com/), what features should I add?

