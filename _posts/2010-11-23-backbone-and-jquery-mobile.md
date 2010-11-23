---
layout: post
title: Backbone.js and Jquery mobile
---

The idea behind [Weheartplaces](http://weheartplaces.com/) is that I want to be able to bookmark places to go on my desktop computer, and then sync these places to my mobile so I can access them offline.

I've created a json API to weheartplaces, here are my bookmarks in [json format](http://www.weheartplaces.com/users/110237153/bookmarks.json). I'm loading these bookmarks using [backbone.js](http://documentcloud.github.com/backbone/) and then displaying them using [jquery mobile](http://jquerymobile.com/). Here's a little breakdown of how I'm doing it:

# List view

Create a list view like this:

    <ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b">
    </ul>

This is automatically converted into a nice looking list view by jquery mobile. You then iterate over all the elements in your Backbone collection to add them to the list:

    for bookmark in Bookmarks.models
      a = $("<a />")
  
      a.text(bookmark.get('place').name)
      a.attr 'href', "#bookmarks-#{bookmark.cid}"

      a.wrap("<li />").parent().appendTo(ul)

Notice the url that each bookmark points to - #bookmarks-12345. I use backbone routes to recognize this URL and display the correct content.

# Combining the jquery and backbone routers

When you click a link - jquery mobile intercepts the click and looks for a div with the same name as the anchor fragment of the url you just clicked on. So for example:

    <a href="#home">Home</a>
    
Will cause jquery to show this div:

    <div id="home">some content...</div>
    
The problem is that in my list view, I'm linking to pages that don't exist yet - so I have to add some code to the jquery mobile routing code to create and show an empty div.

    // This code goes in $.mobile.changePage...
    
    if( url ){
    	to = $( "[id='" + url + "']" ),
    	fileUrl = getFileURL(url);
  
      if(to.length == 0){ // Page could not be found
        console.log("Routing to " + url + "...");
        
        to = $("<div data-role='page' id='" + url + "'><div data-role='header'><h1>&nbsp;</h1></div><div data-role='content'><img src='images/ajax-loader.png' /></div></div>").appendTo('body')
        
        enhancePage();
      }
    }

Jquery will display this page, and change the anchor fragment of the current URL. Backbone detects the URL change by watching for a `hashchange` event, and will then call your matching route - in my case:

    class HomeController extends Backbone.Controller
      routes :
        "home"  : "home"
        "bookmarks-:cid" : "show"

# Showing the bookmark

Once that magic has happened, the show method on the HomeController will be called:

    show: (cid) ->
      new ShowBookmarkView { model : Bookmarks.getByCid(cid) }

This creates a new ShowBookmarkView, and that view generates the HTML (using underscore.js templates) that is inserted into the currently active page.

    $(".ui-page-active").html(@template({bookmark : @model}))
    
If I get time I will put a small demo file up on github to show how all this hangs together - but feel free to post questions below.

