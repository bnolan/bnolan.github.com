---
layout: post
title: "Google maps doesnt play nice"
---
 
I find it weird that Google, the company that relies on the internet having nicely-spiderable, indexable and machine-readable versions of webpages (otherwise their search engine would be useless), seems to have no intention of creating nice indexable, searchable and shareable urls from it's own web properties.

I'm talking about Google Maps of course. I was on the [melbourne reddit](http://www.reddit.com/r/melbourne), and someone posted a link to a google maps page. So the reddit spider reached out and tried to get an image that it could use as a thumbnail for the link, and this was the result:

<img src="/images/google-maps-thumb.png" />
<cite>Screenshot of the melbourne reddit</cite>

The reason that the reddit url fetcher got it so wrong is because the html for that link is [awful](view-source:https://maps.google.com.au/maps?q=Holland+Ct,+Flemington+VIC&hl=en&ll=-37.789213,144.937661&spn=0.001147,0.002411&sll=-37.860283,145.079616&sspn=1.173152,2.469177&oq=holl&t=h&hnear=Holland+Ct,+Flemington+Victoria+3031&z=19&layer=c&cbll=-37.789213,144.937661&panoid=u_51kfCmxoEWxWkiV1-ABA&cbp=12,291.85,,2,-8.9).

It's full of embedded css and javascript, for performance reasons I guess. It doesn't have any opengraph information with latitude / longitudes. It doesn't have any readable html tags with useful content in them. Things like an `h1`, maybe an `address` tag. Maybe you could find some embedded vcard information using the vcard microformat markup?

Nope, nothing like that. And look at the url too:

    https://maps.google.com.au/maps?q=Holland+Ct,+Flemington+VIC&hl=en&ll=-37.789213,144.937661&spn=0.001147,0.002411&sll=-37.860283,145.079616&sspn=1.173152,2.469177&oq=holl&t=h&hnear=Holland+Ct,+Flemington+Victoria+3031&z=19&layer=c&cbll=-37.789213,144.937661&panoid=u_51kfCmxoEWxWkiV1-ABA&cbp=12,291.85,,2,-8.9
    
It's awful. I've already posted about this, about how it'd be nice that if when you clicked 'get map url' it returned a nice url, something like:

http://maps.google.com.au/australia/vic/melbourne/holland-ct?view=satellite

# Why should they interoperate?

I had a chat with the guys at Google sydney back in 2006 about making nice interoperable URLs for Google maps, and they just shook their heads and said "Why should we make spiderable urls, if we want to be in the google results, we just tell the search team to include us in the search results". Which explains their whole attitude. They don't want google maps indexed, and fair enough. But they could work harder to make their urls and html be useful to other computers on the internet. Opengraph tags would mean nice thumbnails for google urls. Canonicalisation of URLs would mean that you could find all the pages on the internet linking to the same google map. A nice to read url would mean you could paste it into an email without having to use a link shortener. Google place pages would show up in google search results, and on sites that embed google search results.

It'd also mean they'd play nice with the rest of the internet community, a community that enables their search engine, and would probably love to embrace nice google maps urls.