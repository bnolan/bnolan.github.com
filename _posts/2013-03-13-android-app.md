---
layout: post
title: Working on an Android app
category: placepinner
---

I've started working on a native android app for [placepinner](http://placepinner.com/). I decided to go this track after trying out a quick phonegap app using ratchet and backbone.js. Even though it's super easy to develop, and you can do some quite nice UI with CSS, I couldn't help but notice how laggy scrolling was using Phonegap.

So I've decided to go native. I'm also taking this as a good opportunity to try out Java (which I've never used in anger before), and learn some android mobile development (in case the ruby on rails job scene dries up).

My experience so far:

* Eclipse is an ugly tool
* Java is a sweet language
* The android emulator is much slower than the ios simulator

It's a bit funny doing all the typecasting and type coercion that's required to pass stuff around. For example in ruby:

	JSON.parse(IO.readlines('http://placepinner.com/places.json'))

Versus this java code to do part of the same...

	InputStream stream;
	    
    try {
        URL url = new URL(urls[0]);
        URLConnection urlConnection = url.openConnection();
        urlConnection.setConnectTimeout(5000);
        stream = urlConnection.getInputStream();
    } catch (Exception ex) {
        Log.i ("Exception!", ex.toString() );
        return null;
    }

    String str = "";
    
    try{
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int length = 0;
        while ((length = stream.read(buffer)) != -1) {
            baos.write(buffer, 0, length);
        }
        str = new String(baos.toByteArray());
    } catch (Exception ex) {
        Log.i ("Exception!", ex.toString() );
    }

    return str; 

We'll see how far I get. I'm using [dcovery](http://www.dcovery.com/) as inspiration for this app. They have a great travel planning bookmarklet and app for IOS. I'm trying to do the same thing for Android, but I'll probably also have a website (Dcovery doesn't have any website trip planning tools, so you can't review / edit your trip on your PC), so that you can view and edit places you have bookmarked, and eventually maybe split places you have 'pinned' into seperate days (actually plan a trip day by day).

But yeah - android for now.