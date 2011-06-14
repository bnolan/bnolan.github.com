---
layout: post
title: Jasmine and Backbone
---

I use Jasmine to spec / test my Backbone apps. It can be a pain setting up a Javascript testing environment (unless you're using [capt](/capt/) in which case you get a testing environment for free - but I digress. I decided to pull out some code from an existing app of mine and document a bit of it.

This isn't best practise stuff, I'm making this up as I go along, but it is the summary of several years of Javascript development on desktop and mobile.

Start test suite:

    describe 'places controller', ->
      describe 'search view', ->

I like to nest my suites so that any errors point to the correct controller and view.

  beforeEach ->
    window.app = new Application
    window.app.location = { latitude : -45, longitude : 170}

My current app has a bit of an awful hack in that it uses a global 'app' instance that wraps up all the application functionality. It is easy to work with, but I don't like it for testing, since your tests inevitably have side effects. But by recreating a new 'app' instance for each test you help defeat some of those side effects.

  it 'should handle the truth', ->
    expect(true).toBeTruthy()
  it 'should exist', ->
    expect(SearchView).toBeTruthy()
    
Some sanity checks to make sure the view we're testing exists, there are no syntax or dependency problems.

  it 'should instantiate', ->
    x = new SearchView { collection : new PlaceCollection }
    expect(x instanceof SearchView).toBeTruthy()
    expect(x instanceof Backbone.View).toBeTruthy()

Now we start to do something useful, by instantiating the SearchView. Notice that the view can be instantiated outside of the app, and without a specified element. Backbone will create it's own div element for the view.

  it 'should have render method', ->
    x = new SearchView { collection : new PlaceCollection }
    x.render()
    expect(x.el).toBeTruthy()
    expect(x.el.find('input').is('input')).toBeTruthy()

Now we can start to do some 'functional' testing and make sure that the view renders up an input inside my view. This is where you can start to do some poke and prod testing, and make sure the result is as you expect it. Note that I'm running my test suite inside safari, but which something like jsdom, you could run this test suite entirely inside node.js.

  it 'should render nearby', ->
    x = new SearchView { collection : new PlaceCollection }
    x.collection.refresh $fixtures.placesNearby
    x.collection.status = 200
    x.render()
    expect(x.el.html()).toMatch /harvard square/i

I use capt to populate my $fixtures object, so I can edit my fixture data in yaml or json, and then poke it into the view and check it renders correctly. This is the weakest selector I could use. Something like:

    expect(x.$('a:first')).toMatch /harvard square/i

Might be better, or using the :content selector.

  it 'should render searching', ->
    x = new SearchView { collection : new PlaceCollection }
    x.render()
    x.el.find('input').val("Kirkla").trigger('keyup')
    expect(x.query).toEqual("Kirkla")
    expect(x.el.html()).toMatch /loading.../i
    
You can also trigger keyUp / keyDown and other events using jQuery [event object](http://api.jquery.com/category/events/event-object/). Note that in my case, this will trigger an ajax call to the server, which must be mocked out on the client so that the ajax call returns immediately and fires the success callback. I use the built in mocking support (spyOn) that comes with Jasmine for mocking.
