---
layout: post
title: Additions to Backbone views
---

I took Matt McCrays excellent [Coffeescript glue](http://mattmccray.blogspot.com/2010/10/using-backbonejs-in-coffeescript.html?spref=tw) for Backbone.js and moved my `saveChanges` function into it.

The function serializes all the form elements in the rendered elements and updates the associated model. You can use this code by binding to 'submit form' using `@handleEvents` and calling saveChanges and suppressing the default form submission.

    class View
      constructor: ->
        Backbone.View.apply(this, arguments)

      saveChanges: ->
        properties = {}

        for input in @el.find('input,textarea')
          value = $(input).val()
          properties[input.name] = value

        @model.set properties
        @model.save()

        app.saving()

    _.extend(View::, Backbone.View.prototype)

A small example from [Weheartplaces](http://weheartplaces.com/)...

    class TripInspector extends App.View
      constructor: ->
        super
        @template= JST["trip_inspector/show"] 
        @render() if @model?

      render: ->
        @el.html(@template { trip : @model })

        @handleEvents {
          'submit form' : 'submit'
        }

      submit: (e) =>
        e.preventDefault()
        @saveChanges()
    
    this.TripInspector = TripInspector
