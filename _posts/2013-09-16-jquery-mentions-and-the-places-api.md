---
layout: post
title: "jQuery Mentions and the Places API"
---
 
So I started today with grand plans of doing some data-import work on ZoomIn, but sadly I got sidetracked. It's a bit of a shame really, because ZoomIn needs more attention, and the traffic is starting to suffer because I'm not putting enough effort into it. Although, ironically, I'm making more money from adsense than ever before, since I've improved the site performance and got better at placing ad units.

But anyway, this morning I had an itchy idea that I felt like working on, one where you could use the Facebook-style @mentions functionality to write a comment about places. So for example, if someone asked me: "Where's the best craft beer in Wellington", I could reply something like this:

The best craft beer is at @Hashigo Zake, @Goldings Free Dive and @Little Beer Quarter.

So I did a bit of research and discovered the [jQuery Mentions plugin](http://podio.github.io/jquery-mentions-input/), which is a great bit of tech which lets you have a textfield that has an inline autocomplete, whenever you type @something. I did a bit of prototyping, and got the autocompleter powered by the Google Places autocomplete API.

So now you could totally write comments with links to the actual places, without having to google for each place and find the link and embed it in your content. It was a pretty cool proof-of-concept.

# And that's where I should have stopped

I got the proof of concept going, and with a bit of playing, it was clear that it was a cool idea, but my hunch was that it wasn't worth spending any more time on. But foolishly, I decided to dive on and see if I could make a tool out of this little one-trick-feature.

I do a lot of my project planning (on my own projects) based on hunches. I sit down in the morning, and unless I've already planned what I'm going to do, I start by following my nose, and soon enough I find I'm working on something useful and hopefully something I can knock out in one day.

The counterpoint to that, is when you're working on something and it feels like you're pushing shit uphill, you should drop what you're doing, and write off the development you've done so far. Maybe commit the current branch, then flick back to master and work on something else.

# [Commentmap](http://www.commentmap.com/)

Instead, I decided I would take my proof-of-concept that let you mention places, and turn it into a tool for writing hyperlinked reddit, bbcode, or html comments. This took another 3-4 hours. I bought a domain name (seldom a worthwhile investment), set up heroku instance and deployed the thing. This meant that I didn't get any ZoomIn work (especially importing all the wikipedia / OSM data I've got kicking around) done, but I did get my little experiment out there and on the internet.

If you go there, and enter a city, then try and write a comment about that city (maybe recommending a few places), and hit the @-key before you type a comment, you'll see the autocompleter in action.

# Maybe worthwhile?

While commentmap, in it's current form, isn't going to get any traffic or probably be useful to anyone but me, it has been useful for me to experiment with the idea. I've used it to write a post about my [experiences in sydney](http://www.reddit.com/r/sydney/comments/1mhg90/my_experience_of_sydney/) on Reddit, and also to reply to some questions about [craft beer in Wellington](http://www.reddit.com/r/Wellington/comments/1mhbd9/my_favourite_craft_beer_places/). So, while I foolishly thought I might be building something people wanted to use, what I've really done is build something that I wanted to use.

And maybe if I find myself re-using this tool over and over, maybe over time it'll twig some little idea in the back of my mind, that I can add to and extend, to eventually make this into a cool tool in its own right.

Maybe experiments that seem like a bad idea are worth doing just to prove they are or aren't.