---
layout: post
title: Map Reduce in Javascript
---

Here's the non-blocking map reduce class that I was talking about. It uses at most 75% of the CPU, so that the browser remains responsive while your job is processed. You can destroy the job at any stage.

    class MapReduceJob
      constructor: (inputsOriginal, mapFunc, reduceFunc) ->
        utilisation = 75
        inputs = inputsOriginal.slice()
    
        # todo - replace with a better clone function
        inputs = for input in inputsOriginal
          input

        outputs = []
    
        @interval = setInterval( =>
          tzero = (new Date).getTime()
      
          # Process at least one
          if inputs.length > 0
            outputs.push mapFunc(inputs.pop())

          # Process more
          while ((new Date).getTime() - tzero < utilisation) and (inputs.length > 0)
            outputs.push mapFunc(inputs.pop())
      
          if inputs.length == 0
            clearInterval(@interval)
            reduceFunc(outputs)
        
        , 100)
    
      destroy: ->
        clearInterval(@interval)
        delete @interval

You use it like this:

    new MapReduceJob(
      ['a', 'b', 'c', 'd'],
      function(input){
        // do something computationally expensive here, like uppercasing the input
        return input.toUpperCase();
      },
      function(outputs){
        console.log(outputs);
      }
    );
    
This is excellent for things like clustering markers on a map, or doing a backbone filtering on large collections. You need to structure your code to be asyncronous.

I've got a few things I might do with this code:

1. Port underscore.js to this continuations style, so that you can use all the existing functions. I've already ported the `collect` and `inject` functions.
1. Add a progress() method to the class.
1. Add support for webworkers for desktop browsers.
1. Port backbone.js to use these continuations, so that for example, the sort function doesn't block when sorting large arrays.

It's pretty interesting stuff, we'll see how we go. 