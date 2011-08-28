---
layout: post
title: Etags, Phonegap and Rails
---

In the [rankers app](http://www.rankers.co.nz/) that I've recently finished for a client, I cached the users data offline, but needed a way to quickly and easy to see if the user had the freshed version of the data.

<img src="/images/rankers-updates.png" />
<cite>Downloading database updates</cite>

To speed up loading time, and enable offline access, I download the list of places (about 350kb) by an ajax call, and then cache the json and the etag of the latest revision in `localStorage`. Then when the app launches next time, I send a request for the newest version of the places list, and attach the etag to the request, so that rails can send a not-modified response, and save the users some data.

Here's the rails pseudocode code I used:

    @places = Proc.new do 
      Place.find(:all)
    end

    response.etag = @etag = [
      Place.find(:first, :order => 'updated_at desc').updated_at.to_i,
      Place.count
    ]

    if request.fresh?(response)
       head :not_modified
    else
      render :action => 'index', :mime_type => 'application/json'
    end

And in the view:

    <% cache(@etag) do %><%= @places.call.to_json %><% end %>
    
This cached the json (since json generation can be pretty slow in ruby), and sends the appropriate header. To handle this on the client side, I used something like this, to cache the places data, and the etag.

    $.ajax {
      url : "http://example.com/some/endpoint"
      dataType : 'json'
      headers : { 'If-None-Match' : localStorage.getItem('etag') }
      success : (data, textStatus, xhr) =>
        if textStatus == "success"
          localStorage.setItem('etag', xhr.getResponseHeader('Etag'))
          localStorage.setItem('placesData', JSON.stringify(data))
        else if textStatus == "notmodified"
          data = JSON.parse(localStorage.getItem('placesData'))
        else
          throw "your toys"

        Places.reset(data)
    }
    
I was going to implement my own version of etags and `if-none-match`, since I thought I might get heisenbugs with different implementations of xmlhttprequest on different mobile webkits, but in the end, I decided not to reinvent the wheel and use what already exists. So far this has worked well.