---
layout: post
title: "Named Entity Recognition"
---
 
I've been researching ways of gathering location data from forums like /r/wellington and /r/sydney. One of my experiments was to create a javascript tool that helped you create comments with embedded geo data (via links), another one was to try and convince a reddit to mark up all place names using \*stars\*. Both of these don't work very well because they require a big shift in behaviour from users.

In the back of my mind I'd been thinking of ways of doing content extraction from the existing text corpus. You have a few advantages in doing this. Most of the content I want to import is targeted at a city, and once you have decent coverage of places in that city, you can look for those place names in text and start to match text to places.

I did a manual job of this, marking up a bunch of posts with their place names, and it was pretty slow going.

So last night, whilst enjoying a pleasant beer at the [sprig and fern](http://zoomin.co.nz/nz/lower+hutt/petone/jackson+street/146/-sprig+fern+tavern/) in Petone, I was wondering whether it was possible to automatically extract place names from text. I'm not talking about the yahoo place finder code that recognized city names, I was wondering if it was possible to statistically analyze text and extract place names.

# NER

It turns out there is a bunch of research into this, and the best opensource tool is the [Stanford Named Entity Recognizer](http://nlp.stanford.edu/software/CRF-NER.shtml). So I wrote a script that crawls a subreddit, pulls out all the text from the comments, and ran it through the NER. It's not great, but here's the output for /r/sydney:

*Sydney Tower Skywalk, Skywalk, Bridgeclimb, Skywalk, GTA, North Sydney, Broadway, Nah, PC, GTA, Oval, Ozgameshop, Ozgameshop, DSE, Congrats, Congrats, NSB, Breaking Bad, Factory Theatre, Macau, Redfern, Nice, Redfern, Newtown, Tupac, Kings, Williams, Good God, Ok, The Passage, DJ, Crunch, Parramatta, Olympic, Bondi, Hornsby, Millenium, Arena, Crossfit, Pennant Hills, Bondi, Crossfit, Bondi, Boxing, Greg Everetts, Catalyst, Coles, Surry Hills, Kodak Compact, First Google, Kent St, Try Trophy Land, Kent St. You, Pics, Mister Minit, ALDI Mobile, Telstra, Telstra, Australia, Australian, SIM, Vaya, Telstra, Optus WiFi, Virgin, Virgin, Optus, Telstra, Optus, Telstra, Optus, Whirlpool, Australians, Sydney, Best, Surry, Japworld, Princes Highway in St Peters, O'Brien, Happens....*

And there's a bunch more I stripped off.

Now, this isn't that interesting, as there's a lot of generic suburb names there, a bunch of peoples names and a bit of breaking bad. Actual references to places, I can only see Crossfit, The Passage, Ozgameshop and the Factory Theatre. But the thing is, is that you can train the NER, so it'd be possible to quickly go through the content, highlight place names, and retrain the classifier.

# Place Names are in Uppercase

You can also work off the fact that most place names are in uppercase, and you can also pre-seed your classifier with the names of all the streets in a city (using OpenStreetMap).

# Why is this interesting

I don't know how much analysis Google does on non-hyper-linked text, but I've not seen many search engine approaches that try and extract terms from plain text, and generate a link graph based on place names, instead of on hyperlinks. If you came up with a crawler that could explore a corpus of data, extract place names and generate links between the text and places. I'm not sure where you'd get with it, and if you'd end up with something much more interesting than just a full text search on the same corpus, but it's an interesting idea.

You could easily plot a map of what everyone was talking about. And you could establish links between places, to say 'you're insterested in this, you may like that'. And all without anyone having to change their habits or use new technology.