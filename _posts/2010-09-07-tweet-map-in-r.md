---
layout: post
title: Tweet map in R
---

Just as a quick follow up to yesterdays post - this is the very rough visualization I came up with using R, openGL and ffmpeg.

<object width="400" height="320"><param name="movie" value="http://www.youtube.com/v/iqz6skQLkaQ?fs=1&amp;hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/iqz6skQLkaQ?fs=1&amp;hl=en_US" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="400" height="320"></embed></object>
<br />
<br />

The r script used was something like this. The texture isn't correctly georeferenced, and needs to be flipped 180°, but this was as far as I got before having to move onto other work.

    ourplot <- function (h) {
      north = 51.6
      south = 51.4
      east = 0.05
      west = -0.25
    
      df <- subset(tweets, x > west & x < east & y < north & y > south & hour == h)

      df <- rbind(df, data.frame(x=east, y=north, hour=-1))
      df <- rbind(df, data.frame(x=west, y=south, hour=-1))

      hdf <- hist2d(df$x, df$y, nbins=50, show=FALSE)

      persp3d( 
        hdf$x, 
        hdf$y, 
        hdf$counts, 
        ticktype="detailed",
        xlab="Longitude",
        ylab="Latitude",
        zlab="# Tweets",
        zlim=c(-30,50),
        expand=0.5, 
        shade=1.0, 
        specular="white",
        col="white",
        texture="/tmp/london.png",
        box=FALSE,
        axes=FALSE
      )

      rgl.snapshot(paste("/tmp/london-3d-",h,".png",sep=""))
    }

    for (hour in seq(0,24,by=1)) ourplot(hour)
    
I have a vague plan of taking the histogram matrix, exporting it to json and using protovis to redraw the graphs, possibly as a [streamgraph](http://vis.stanford.edu/protovis/ex/stream.html).