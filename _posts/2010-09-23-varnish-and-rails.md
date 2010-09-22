---
layout: post
title: Varnish and Rails
---

I got my R scripts running on production for [twitterplaces](http://twitterplaces.com/) - so if you browse to [Wellington](http://twitterplaces.com/wlg) or [London](http://twitterplaces.com/lon), you can see twitter densities. That's all well and good and very rough, there's a lot of work to do:

1. The time slider looks rubbish
1. The tweet frequency histogram isn't adjusted for the cities time offset
1. The extents of the different cities are different, so you get elongated contours
1. The contour needs to be subdivided for smoothness
1. It would be good to weigh against multiple tweets from a user

But the first problem, is that the contours are exceptionally expensive to convert to json, which is done on every page load by ruby. I wanted to have an easy way to cache a page for 60 seconds, so that if the page gets 'seagulled' (a thousand people follow a link from techcrunch, look at the page for a second, then go back to techcrunch to comment 'it doesnt scale get nosql why not use php') the site doesn't go down.

# Ask Koz

I originally was going to do some apache rewriterule hax, but first I asked [@nzkoz](http://twitter.com/nzkoz), who told me to look into [Varnish](http://www.varnish-cache.org/). Varnish looked good so I gave it a go.

# Varnish

I followed the installation instructions [for Ubuntu](http://www.varnish-cache.org/installation/ubuntu), then edited `/etc/defaults/varnish` to make varnish listen on port 80.

    DAEMON_OPTS="-a :80\
                 -T localhost:6082 \

I edited `/etc/apache2/ports.conf` to move apache over to port 8080:

    NameVirtualHost *:8080
    Listen 8080

And edited the appropriate `sites-available` scripts to move the virtual hosts over to the new port. Then I edited my `/etc/varnish/default.vcl` (make sure you install Varnish 2.x, not the 1.x that comes with some old varieties of Ubuntu) like so:

    sub vcl_recv {
            unset req.http.Cookie;
    }
      
    sub vcl_fetch {
            if (req.request == "GET") {
                    unset beresp.http.Set-Cookie;
                    set beresp.cacheable = true;
                    set beresp.ttl = 60s;
            }

            if (req.url ~ "^/images/" || req.url ~ "^/javascripts" || req.url ~ "^/stylesheets"){
                    set beresp.ttl = 15m;
            }
    }

All GETs are cached for 60 seconds. Javascripts, images and stylesheets are cached (on the client side) for 15 minutes.

Note that this varnish config will annihilate any site that uses cookies - but twitterplaces (and weheartplaces) currently don't use cookies at all - so everyones looks at the same pages. I then restarted varnish and *voila*, we have a fast cached site that can cope with some seagulling.

To check that things are working - I tailed my rails log, hit the site up with `curl -I http://twitterplaces.com/wlg/` and each request was served correctly, but didn't show up in the rails logs until 60 seconds had elapsed. Varnish is very clever and will serve the old version of the cached page until the new version has finished regenerating. Varnish really does seem like a neat bit of kit.

Elapsed time, from learning of Varnish, to installing, configuring, testing and writing this blog post - 45 minutes.
