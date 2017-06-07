---
layout: post
title: "Bonkers - microblogging with html"
---
 
So I couldn't sleep last night (thanks jet lag), so I sat in bed and prototyped BONKERS, a microblog that lets you paste full html.

<img src="http://i.imgur.com/TntXtOH.png" />
<cite>Using font sizes and emoji</cite>

I didn't do any server backend for it, so this is all just client side stuff. The interesting part is how you render the tweets, or toots, or posts, or whatever you call them. 

What I settled on was using an `<iframe />` with a `datauri` src attribute. This embeds the content on a null uri. I also looked into using the `sandbox` attribute, but that doesn't work 100% on safari (you can still run javascript that opens modals). So, what I think I'm going to do - is by default, content displays in an iframe, with the code having been sanitized (so that there is no javascript in it). However, you can still use full css and css animations, embed images etc. However, once you click on a post, I might reload the iframe with javascript enabled, so that you can have little embedded games, but it prevents autoplaying that might allow people to be a pain in the ass.

I have a little api exposed to the iframes using `window.postMessage`. At the moment there is only a `resize` message type (so that the iframe resizes to the size of your post), but in the future, i'd like to have the ability to create posts or follow people through this api (and then if I get the security wrong, people can write sweet worms that autofollow each other and take down the site woo!).

Another thing I'm a bit unsure about, is whether to force same origin for images and other media. I don't really know if it's possible (almost definitely not possible when javascript is enabled, but probably is through a sanitizer), and force people to upload content to the microblogging service. This would make it easier to prevent linking to really offensive images, but it also sort of breaks the web, maybe it's better just to let people use any content from wherever.

I also added a 'fork' button. All the content on BONKERS would be creative commons licensed (maybe you can pay 10 cents per post if you want to remove the CC license), so anyone would be able to remix your post. In terms of editors, I think a simple WYSIWYG editor would be good (bold text, add links, change colors and fonts), as well as a markdown editor (for noobs) and a full html editor with syntax highlighting (for l33t haxx0rs).

Anyway, was fun prototyping.