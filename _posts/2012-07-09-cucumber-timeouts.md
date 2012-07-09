---
layout: post
title: Cucumber timeouts
---

I've been battling a strange bug in cucumber. When I run cucumber feature.rb - cucumber would launch firefox, and then just hang and give me a timeout error. If you encounter this yourself - try this on your command line:

    ping `hostname`

If your system fails to find the ip address for your hostname, that's your bug. Easily fixed by editing /etc/hosts and adding an entry for your hostname. I'm not sure why my hostname didn't have an IP address in the first place, but we're all hunky dory now.