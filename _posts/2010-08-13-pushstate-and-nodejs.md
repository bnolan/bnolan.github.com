---
layout: post
title: Push state and Node.js
---

I've talked with [Sam Minnee](http://twitter.com/sminnee) (CTO at [Silverstripe](http://silverstripe.com/)) a bunch of times about running jquery on the server side. It was only a hunch, I never knew exactly what the benefits would be - but with the availability of [pushState](https://developer.mozilla.org/en/DOM/Manipulating_the_browser_history) on Firefox, Safari and Chrome - it suddenly makes a lot of sense.

What pushState and jquery on the server lets you do - is to have a pure javascript application that doesnt require page reloads to go to different urls. For example:

1. http://yourapp.com/
1. http://yourapp.com/search
1. http://yourapp.com/search/myterms
1. http://yourapp.com/tweet/12345

Can all be generated client side by your jquery and coffeescript code. This is an awesome way to write an app, you get a good responsive app and it's easy to persist state between pages (eg your google map won't spring back to the default location everytime you click 'back').

The number one downfall of javascript apps, is that there are now pages in your app that can't be linked to - nor can they be crawled by google, or scraped by any other site that uses the http protocol. Building exciting new apps that 'break the internet' isn't cool.

But if you can run your entire app on the server side - then if someone goes to `http://yourapp.com/search/myterms` - node.js can load your page on the server, recognize the url, run the correct javascript code to update the state as the browser would - then send it down the wire. So that non-javascript clients can access the same content that a desktop browser can.

It's a whole new way to do accessibility.