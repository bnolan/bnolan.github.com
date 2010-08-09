---
layout: post
title: CoffeeScript 0.9
---

[CoffeeScript 0.9](http://jashkenas.github.com/coffee-script/) was released over the weekend. CoffeeScript is a compiler that turns .coffee files into .js files. CoffeeScript is a significant whitespace, rubyish language that makes large (and small) javascript projects much more manageable and fun.

I've been using CoffeeScript since 0.5, first with a multiplayer javascript game experiment, then more recently as part of my consulting with [Lonely Planet Labs](http://lplabs.com/). It's been interesting working with multiple developers on CoffeeScript - and seeing how it works in a production environment. I can heartily recommend it to teams that are looking to ease their javascript development.

CS 0.9 is a big change from 0.7.2, read [this ticket](http://github.com/jashkenas/coffee-script/issues/closed#issue/541) for some of the background on the change. My own reaction to the change is interesting - I was against the change at first, and only changed my mind after 0.9 was released. I was impressed by how [Jeremy](http://github.com/jashkenas/) got opininions and analysis from all the existing users, then quickly made such a fundamental change to the language, let people try it out in a branch - and finally decided to merge it back into stable.

All this - despite the fact that upgrading most coffeescript apps to 0.9 is non-trivial. Changing the symbol used for assignment will probably break most existing code. The assignment change was required to bring in yamlish object assignment which is awesome. The new release also has a host of other, non contentious improvements, around superclasses.

I think it's a good reminder, that no matter how substantial a change - if you manage is right, and the benefits outweigh the costs, your community will adapt and embrace the new version.

