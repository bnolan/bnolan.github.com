---
layout: post
title: Backbone Gotchas
---

If you're using Backbone and reusing the same div for all of your views (in a single-page iphone app for example), make sure you call .unbind() on the div when you call destroy the view, backbone doesn't do it for you, and if you don't unbind the div, you'll end up with a whole bunch of events (which are using delegate so they hang around) being trigger at strange and inopportune times.