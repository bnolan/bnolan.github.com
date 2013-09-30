---
layout: post
title: "Optimizing for mobile"
category: zoomin
---
 
I did some work earlier this week on optimizing the mobile view of ZoomIn. The old one was pretty broken, it tried to layout a desktop-style display on your mobile phone and looked pretty awful. The google ads didn't work well either.

# Single column layout

I initially had hoped that I could use a responsive design to make a single set of `.erb` templates that rendered everything, but that quickly turned out too hard. For starters I'm using an older version of bootstrap, and I didn't feel like upgrading the entire site to the new responsive bootstrap.

Secondly, the authentication system will take a bit of fiddling around to get working on mobile, so currently the mobile site is read only. That's something I want to fix, since it'd be great to be able to review and comment on places while you're out and about on mobile.

# So duplicate the views

So I duplicated the views, and removed the google maps code, it now uses google static map apis. I also came up with a totally seperate mobile css which works pretty well. There's still a chance I'll try using responsive layout for some of the pages, because it'd be great to be able to access the recent comments / recently popular on your mobile device.

# Make the mobile site richer

It was interesting working on the duplicated mobile views, because I added a few helpers that I should have had for a while - for example a `breadcrumbs` helper that takes a place and generates all the parent places in a breadcrumb list. It also helped me whittle down exactly what zoomin was for, and made me think of ways I could optimize the community to work better on mobile.

# Still the community

I've still had no luck jump starting the zoomin community. I think I need to make sure the site is working well, that there is a return on investment in adding comments (for example a great looking user page, or maybe some kind of gamification), then do some outreach to try and get back to a 2006-era zoomin community engagement. Unless that ship has sailed and everyone comments on Facebook, Yelp and Localist now. We'll see.