---
layout: post
title: Something expensive
---

I'm clustering 1200 points on the iphone in javascript in an app I'm writing at the moment. On my iphone 2g it takes 1500ms in a worst case. There are two fixes I'm going to do:

# Quadtree

I'll probably end up implementing a quadtree, or a grid-based acceleration structure, since currently the complexity is currently n squared in a worst case. I'll let you know how I get on with this.

# Break something expensive

This is a generic pattern you can use in javascript (here implemented in coffeescript) to maintain responsiveness in your jobs. You create an interval that runs every 100ms, and it will do at most 50ms of work in each loop, until your data has been processed, then terminates the job.

    inputs = [.., .., .., ..]
    outputs = []
    
    interval = null
    
    interval = setInterval( =>
      tzero = (new Date).getTime()
  
      while ((new Date).getTime() - tzero < 50) and (inputs.length > 0)
        input = inputs.pop()
        
        outputs.push(
          doSomethingExpensiveWith(input)
        )
        
      if inputs.length == 0
        clearInterval(interval)
        
        console.log(outputs)
    , 100)
    
I might pull that code out into a generalised form (since I could use it throughout the app) and also add support for chaining inputs and outputs:

    inputs.mapReduce(filterFunction).mapReduce(processFunction).mapReduce(outputFunction);
    
Something like that would be pretty cool, but the above code is the simplified version that works for me. 

:)