---
layout: post
title: Ajax download progress
---

I'm working on an iphone app that needs 650kb of json data to get started, so I needed a bit of progress display while the data is being fetched. This works on mobile webkit:

    interval = null
  
    $.ajax {
      url : "endpoint.json"

      dataType : 'json'

      xhr : () =>
        xhr = jQuery.ajaxSettings.xhr()
      
        interval = setInterval( =>
          if xhr.readyState > 2
            total = parseInt(xhr.getResponseHeader('Content-length'))
            completed = parseInt(xhr.responseText.length)
            percentage = (100.0 / total * completed).toFixed(2)
          
            console.log "Completed #{percentage}%"
        , 50)
      
        xhr

      complete: ->
        clearInterval(interval)
      
      success : (data) =>
        alert(data)
    }

It's a bit painful because of the way you access the raw `xhr` object in jQuery 1.5, but works nicely. I then store the data in localStorage (as a bit json blob) and we're away.
