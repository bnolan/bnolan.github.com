---
layout: post
title: Make LESS less painful
---

I've been using [LESS](http://lesscss.org/) to make writing css for a [jqtouch](http://jqtouch.com/) app less painful. However - the less compiler is a bit awkward to use by default - if you run:

    lessc -g -w *.less
    
It recompiles your scripts everytime you make a change, which is perfect, and it notifies you by growl if you have a syntax error - wonderful.

However - every time you get a syntax error, it also blocks the terminal that you launched less from, and you have to go to that terminal and 'Press \[return\] to continue...'. It's pretty annoying. The solution is to load up `/Library/Ruby/Gems/1.8/gems/less-1.2.21/` in your text editor, search for command.rb, and change the `run!` method, to disable the `$stdin.gets` and replace it as so:

    if File.stat( @source ).mtime > File.stat( @destination ).mtime
      print Time.now.strftime("%H:%M:%S -- ") if @options[:timestamps]
      print "Change detected... "

      if parse
        # ...
      else 
        `touch #{@destination}`
      end
    end

You then get growl notifications on error, but simply correct the error and hit save again to recompile. No more hunting to find the right terminal.