---
layout: post
title: Koala for facebook
---

I've been using [Koala](https://github.com/arsduo/koala/wiki/) + Facebook connect for facebook development in rails. It's an awesome tool for exploring the graph API using pure rails. You don't need to use devise to do your authentication, just facebook connect, then take the access token and then you have access to the facebook api as follows:

    @oauth = Koala::Facebook::OAuth.new(app_id, code, callback_url)
    @oauth.get_user_info_from_cookies(cookies)
    
It's interesting when deciding where to use APIs like facebook or the google maps geocoder api. Should you do it client side, and reduce load on your server, but add the complexity of handling state and large amounts of data in an environment that's not really designed for it - or do you do it client side and increase your ops cost?

It's still a hairy one I haven't decided. One of the classic problems is when people search on a social mapping site (like weheartplaces):

    /places/search?query=Eiffel+Tower
    /places/search?query=Nelson,+New+Zealand
    
You want to look for any places called `eiffel tower` in your database (probably using tsearch2), but you also want to run the search through a geocoder to see if the user actually searched for a city. And you need to do some kind of combinatorial weighting function to work out what was the most likely result for a given query.

The best way to do that is to gather data on the server side so that you can train your weighting function based on previous results and what the user was actually looking for.

Pure javascript and focus on the UI? Or a strong back-end service and focus on the data quality? Or both? And never finish the project.

;D