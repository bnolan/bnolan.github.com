---
layout: post
title: Responsive Design for Mobile
category: zoomin
---

I've been working on the ZoomIn mobile view, on and off for a few months now. I initially started by creating a :mobile format in rails, so that I could render a totally different view for mobile users. Eg `layout.mobile.erb` and `show.mobile.erb`. This worked pretty well, and I got off to a flying start, styling up the mobile view and copying view code across from the desktop view.

This worked well for prototyping, but as I spent time redesigning the rest of the site, I realised that there are a _lot_ of views in ZoomIn, and duplicating each one in a mobile view would take forever, and double my maintenance costs. So instead, I decided to go for responsive design, where I serve a different stylesheet for mobile devices. I'm not using media queries at the moment, I'm instead detecting mobile devices based on the user agent, but I think I'll change this to use screen-width media queries and some javascript to hide / show bits of the UI that I'm not working.

The biggest problem at the moment is that I haven't built in support for all the popovers that are used for login and most of the interactivity with the site. So it's a ready only view of the app at the moment. I'll probably wait and just implement facebook auth for mobile and skip support for the current username / password login. One of the things that has worked well has been using google maps and streetview on mobile, they both run really nicely on my nexus s, which isn't a super powerful phone. I was going to use leaflet and cloudmade maps since I have experience of that on mobile, but it seems that the google maps implementation is really nice on touch devices.

For design, I've been copying lots of bits of UI from [ratchet](http://maker.github.com/ratchet/), so I've got a nice blue header bar and some good looking buttons and form elements.