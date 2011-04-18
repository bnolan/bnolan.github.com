---
layout: post
title: Capt is in npm
---

I've resumed work on [capt](http://bennolan.com/capt/), since my [diaspora-x](http://diaspora-x.com/) codebase relies on capt, and although I expect [brunch](http://brunchwithcoffee.com/) or [cinco](http://cincojs.com/) will take over as the build tool of choice for coffeescript / backbone apps - capt works for me now.

<img src="/images/capt.png" />
<cite>Logo indicates far more polish than the project has.</cite>

Capt is a tool for development and deploying javascript single page apps. It takes care of including all your javascripts in the right order, and compiling your static html pages. It has some support for jasmine, coffeescript and less. It's very creaky, but my collaborators on the diaspora-x / Buddycloud web client needed to be able to use it, so I've packaged up capt as an npm. 

So you can install capt with:

    npm install capt
    
Once it's installed, create a new app and serve it using the built in server.

    capt new myproject
    cd myproject
    capt server
    open http://localhost:4000/
    
And enjoy the capt goodness. I've put up a [basic webpage](http://bennolan.com/capt/) explaining how to use capt. I imagine this release is pretty broken, it's only really intended for diaspora-x development, but give it a go. I've been doing small commits on capt for a while now, so it'll eventually turn into a decent tool I hope.