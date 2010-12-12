---
layout: post
title: Capt, a tool for backbone.js
---

I've been working on [capt](http://github.com/bnolan/capt) for a few days now, so I wanted to write an introductory post. Capt is a tool for generating and serving backbone.js projects in development mode. It's currently tooled for my personal toolchain:

* jQuery
* Backbone.js
* Underscore.js
* QUnit

You can imagine capt as a combination of jamit and the rails code generators. For example:

     $ capt new blogproject
     * Creating folders
     * Downloading libraries
    
<cite>Create a new project</cite>

    $ find blogproject
    blogproject
    blogproject/app
    blogproject/app/controllers
    blogproject/app/models
    blogproject/app/views
    blogproject/app/views/jst
    blogproject/config.yml
    blogproject/index.jst
    blogproject/lib
    blogproject/lib/backbone.js
    blogproject/lib/coffeescript.js
    blogproject/lib/jquery.js
    blogproject/lib/underscore.js
    blogproject/public
    blogproject/public/stylesheets
    blogproject/test
    blogproject/test/controllers
    blogproject/test/fixtures
    blogproject/test/models
    blogproject/test/qunit.css
    blogproject/test/qunit.js
    blogproject/test/views

<cite>File structure</cite>

    $ capt generate model post
    Created app/models/post.coffee
    Created test/models/post.coffee
    Created test/fixtures/post.yml

    $ capt generate model comment
    Created app/models/comment.coffee
    Created test/models/comment.coffee
    Created test/fixtures/comment.yml

<cite>Create models and tests</cite>

    $ capt server
    node-router server instance at http://*:3000/

<cite>Start a webserver in production mode</cite>

Capt is written in coffeescript and uses node.js (I'll distribute it by npm once it's done), but at the moment is just for client work, it does server side processing to automatically include the correct files, but you're not meant to develop node apps with it, it's for developeing client apps.

You can then browse to /index.html and it'll automatically include all the correct files in the order specified in config.yml. You can also browse to /test/ and it'll run the auto generated tests.

<img src="/images/capt-test.png" />

<cite>The default generated tests running in qunit</cite>

It'll be a while until there's a good first release (I might take the current random code and covert it to use Cake for example), but here's a headsup if anyone it working on something similar. 

# Production targets and textmate

Once I've got things going - I want to have a few production targets:

* Nokia WRT
* Phonegap
* HTML5 standalone w/ manifest
* Web deployment

With a one line command to package up the project into one closure-ified project. I also want to create a textmate bundle for running the tests from within textmate by hitting command+r - like you can do with rspec. I'd like the tests to run within the node jsdom project, so you don't need to remote control a browser, but I'm not sure how well that will work on large projects.

Anyway - I'll keep you updated.