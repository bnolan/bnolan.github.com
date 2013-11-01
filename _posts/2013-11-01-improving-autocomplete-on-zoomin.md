---
layout: post
title: "Improving autocomplete on zoomin"
---
 
Just sitting here on a Friday thinking about how I could improve the autocomplete on ZoomIn. The problem is, when you search for _rogue and vag_ and it doesn't autocomplete to "the rogue and vagabond". Also, if you type in _k sing_ it doesn't complete to 'k.sing'. 

I should create an autocomplete column, that is all the works in the name, with the stopwords stripped out, and all the punctuation, and the letters concatenated together. So the Vag would be `roguevagabond` and k sing would be `ksing`. Then it'd autocomplete correctly.

Also, I need to come up with some kind of 'find near here' search. I wanted to find the nearest vietnamese to Newtown, and there's no way of doing that in ZoomIn. You can find vietnamese *in* Newtown `/wellington/newtown/tags/vietnamese`, but I need to add a query like `/wellington/newtown/nearby/vietnamese`. Also, fulltext search is way better than tag search, I need to get proper full text searching across all columns and comments working properly.

Maybe a task for monday.