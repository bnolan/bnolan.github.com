---
layout: post
title: Backbone - get or fetch
---

A common mistake people make in Backbone apps, is writing a view that assumes that data exists in a collection, so that when the user reloads the page, the collection is empty and the view won't render.

For example, you have a Posts collection and a controller:

    class Posts extends Backbone.collection
      # ...
      
    class PostsController extends Backbone.Controller
      routes :
        "" : "index"
        "topics/:id" : "show"

      index: ->
        Posts.refresh {
          success: ->
            new PostsView { el : $(body), collection : Posts }
        }

      show: (id) ->
        new PostsShowView { el : $(body), model : Posts.get(id) }

The problem with this, is that when you reload the page and you access the index view, it fetches the data with refresh(), then waits until the posts collection has been fetched and renders the view. (This is a bit of a contrived example, but it demonstrates the behaviour).

After the collection has been populated, you click on a post, and it redirects to #posts/12345, a post id that is in the collection. All good.

The problem is when you hit command-r and reload `localhost:3000/#posts/12345`. The show view will be called straight away, and the posts collection was never populated.

# GetOrFetch

I like to fix this with a little helper called getOrFetch:

    class Posts extends Backbone.collection
      url: "/posts"
        
      getOrFetch: (id) ->
        if @get(id)
          post = @get id
        else
          post = new Post { id : id }
          @add post
          post.fetch()

        post
        
Let's be honest, this isn't magic, but it means you can replace your show action with:

    show: (id) ->
      new PostsShowView { el : $(body), model : Posts.getOrFetch(id) }

Which means that no matter how you get to the show action, your model will be loaded from the server, or just use the local version.

# Status

I've taken to using http status codes to represent what the status of a model is. For example a model that has been initialized but not loaded is status 0, if it is being loaded it is status 100, if it is loaded it is 200, if there was an error or the id was not found, 500 or 404, etc. This means that your view can have some code like:

    <% if model.status <= 200: %>
      Loading...
    <% else: %>
      <%= model.escape 'name' %>
    <% end %>
    
Doing this in the mobile app I'm working on at the moment gives a nice ios-ish interface. To make your model status update:

    getOrFetch: (id) ->
      if @get(id)
        post = @get id
      else
        post = new Post { id : id }
        @add post
        post.fetch {
          success : ->
            post.status = 200
            post.trigger 'changed'
          error : (e) ->
            post.status = 500
            post.trigger 'changed'
        }

      post
    
