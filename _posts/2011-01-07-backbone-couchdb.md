---
layout: post
title: Backbone and couchdb
---

I've been using the [backbone-couchdb](https://github.com/janmonschke/backbone-couchdb) connector by Jan and I've been  impressed. The real showstopper is realtime updates using the _changes feed from couchdb.

# Background

For complex geospatial apps, you can't go past rails + postgis as a toolchain, but for simpler apps where you do all of the work on the front end and basically need a hash store, rails is overkill.

Instead of having to run `rake migrate` everytime you want to add a column, you just write to the backbone model, call save and it's serialized away into your document store.

# Schemaless stores

It's possible to use postgres in a schemaless way by either:

* Autogenerating columns as they are referred to
* Serializing all the columns into a blob

But it makes sense to investigate databases that are designed for the purpose. The two I have experience with are:

* MongoDB
* CouchDB

Both are good solutions, I've used MongoDB extensively with node and it's json support is very good. I was interested in trying out couch since it is an almost pure-javascript solution, with javascript views and support for couchapps.

CouchDB also runs well without any middleware, your app talks directly to the database.

# Backbone-couchdb

[Backbone](http://documentcloud.github.com/backbone/), if you haven't seen it - is an excellent tool to give structure to your javascript applications. I use it extensively. One of the great benefits of backbone is the use of models and collections, both of which emit events when their contents change.

So say you have a list of `posts` on the left side of your page, you bind your `render()` (or redraw) function to the `add` and `remove` events of the Posts collection and the list will always be up-to-date. For example - if you opened your javascript console and typed:

    Posts.add(new Post(content : "Hello world!"))
    
All the dom elements will be automatically created and the posts list redrawn.

Backbone by default doesn't come with any persistence layer. Models and collections are stored as javascript variables and they are lost when the page is refreshed. You can persist using the build-in sync methods that submits json to a server. Backbone uses the rails idioms for this, although it's easy enough to update Backbone.sync to work with other datastores / application frameworks.

You can also use the localStorage plugin to persist your models to the browser. The [backbone-couchdb](https://github.com/janmonschke/backbone-couchdb) persists your models to the couchdb store, so whenever you call save, it posts your model to the server - and when you reload the page, it loads all your models from the server.

And because it's couchdb, all you have to do is create the database record in futon (one click) and all the models are automatically saved away, the database doesn't need to be aware of what you're saving, it just saves.

# The magic of realtime

The magic part of this is the `_changes` feed from couchdb. A client can request the \_changes feed by doing an ajax request. Couchdb will then block (ala long polling) until there are changes on the database, at which point it will send down json and close the connection. The client processes these changes (updating collections and models as needed) and then reopens the connection to the _changes feed.

And because you are already re-rendering your UI whenever a collection changes, you can see in realtime what anyone else is doing on the same dataset that you are using.

# Couchone

I'm using [couchone](http://couchone.com/) to host my couch databases. It's a great service, the only downside is that you can't set [Access-Control-Allow-Origin](http://metajack.im/2010/01/19/crossdomain-ajax-for-xmpp-http-binding-made-easy/) headers, which would let you do cross-domain ajax calls (so you can host your app at github and store your database at couchone). I got around this by proxing through my linode box, but this kills performance. Hopefully the couchone guys will give you the option to change the headers (they could use varnish or similar).