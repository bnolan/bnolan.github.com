---
layout: post
title: CORS, Rails and Weinre
---

Doing mobile development on your Android but can't get any debugging action going? Add this code (from the inimitable [Tom Shelfer](http://www.tsheffler.com/blog/?p=428)) to the rails controller that provides your json views, so that you can serve your app on a different port than you serve your API:

    before_filter :cors_preflight_check
    after_filter :cors_set_access_control_headers

    protected

    # For all responses in this controller, return the CORS access control headers.
    def cors_set_access_control_headers
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
      headers['Access-Control-Max-Age'] = "1728000"
    end

    # If this is a preflight OPTIONS request, then short-circuit the
    # request, return only the necessary headers and return an empty
    # text/plain.
    def cors_preflight_check
      if request.method == :options
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
        headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version'
        headers['Access-Control-Max-Age'] = '1728000'
        render :text => '', :content_type => 'text/plain'
      end
    end
    
Then install the MacOS version of [weinre](http://phonegap.github.com/weinre/) and edit `Content/MacOS/Launcher` like so:

    java \
        -XstartOnFirstThread \
        -classpath $BASEDIR/weinre-ui.jar:$BASEDIR/weinre.jar:$BASEDIR/swt.jar \
        weinre.application.GUIMain --boundHost -all-

Then launch weinre (webkit inspector for mobile devices), and add weinre to your web app and reload the browser.

    <script src="http://192.168.1.77:8080/target/target-script-min.js#anonymous"></script>

Sorry this post isn't very cohesive - but that there is a fantastic stack for debugging standalone apps to access existing rails apps. I'm using it to debug my phonegap version of the [rankers app](http://rankers.co.nz/).