---
layout: post
title: "Deploying node.js apps"
---

I've got a few node.js apps kicking around on my computer that I've been wanting to deploy for a while, but I'd never got around to it. Happily, I decided to try and deploy the [asset-server](https://github.com/bnolan/mv-asset-server).

# Forever

[Forever](https://github.com/nodejitsu/forever) is a little tool by nodejitsu that starts node.js apps and makes sure they keep running, even if they crash. It's pretty straightforward and seems to work reliably. It had a bunch of parameters for logging and restarting the server. I tried it out and it seems pretty good.

# Git archive

I was looking for [sam minnee](http://twitter.com/sminnee) article on deploying using git, but couldn't find it, so instead I went for the easy answer:

    git archive | gzip > bundle.tar.gz
    
AFAICT, this takes the current master branch and archives it up.

# Bash magic!

So then I just needed a little bash scripts to create the bundle, `scp` it to my production server, untar it to `/app/$ISODATE`, symlink it in place, run `npm install`, then start and stop `forever`. This is the script I used:

    #!/bin/sh

    git archive master | gzip > /tmp/asset-server.tar.gz
    scp /tmp/asset-server.tar.gz munich:~/builds/

    RELEASE=`date -u +"%Y-%m-%dT%H:%M:%SZ"`

    ssh munich <<ENDS
      cd ~/apps/asset-server/current
      forever stop asset-server.js

      mkdir -p ~/apps/asset-server/$RELEASE
      cd ~/apps/asset-server/$RELEASE
      tar xvfz ~/builds/asset-server.tar.gz
      rm ~/apps/asset-server/current
      ln -s ~/apps/asset-server/$RELEASE ~/apps/asset-server/current

      mkdir -p ~/apps/asset-server/models
      mkdir -p ~/apps/asset-server/current/public
      ln -s ~/apps/asset-server/models ~/apps/asset-server/current/public/models

      cd ~/apps/asset-server/current
      npm install
      forever start -a -l asset-server.log asset-server.js
    ENDS

    echo " * Deploy complete"    

It seems to work for now, it's not ideal, but it'll do.

nb: An earlier version of this post had the `RELEASE=...` line inside the heredoc, which didn't do what I expected. The above code is corrected.