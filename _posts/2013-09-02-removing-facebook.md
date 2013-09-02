---
layout: post
title: "Removing facebook"
category: zoomin
---

Well today I discovered something awesome. The facebook cross-domain framework crashes in my install of IE7. And I'm guessing it does the same in an unknown number of client browsers out there. So I tried debugging it for a while. The problem happens in `fb.init(..)`, and I'm guess it's because of the flash embed that Facebook uses for cross-domain communication.

I get an `error 153` exception, with no debugging information.

# Shall I fix Facebook?

I added Facebook auth because I thought it would be faster and easier for people to sign up using Facebook than using the traditional username/password setup that Zoomin has. So I added facebook auth, and in the last 9 months - these are the sats:

    zoomin_nz=# select count(id) from users where created_at > '2013-01-01';
     count 
    -------
       933
    (1 row)

    zoomin_nz=# select count(id) from users where created_at > '2013-01-01' and uid is not null;
     count 
    -------
       165
    (1 row)

What this means is that only 18% of signups are with Facebook accounts. This mirrors what someone commented on my blog last week, was that I should consider adding other authentication methods to ZoomIn, because not everyone wants to share their Facebook credentials with a site.

And I can't count all the people who have tried to log in using Facebook, or even just access the site and their browser has crashed out due to the IE7 bug.

# Rolling back Facebook

So it looks like, for now, I'm going to roll back the facebook login. I'll send an email out to the 165 people who signed up via facebook and let them know that they can just go to the reset password link to change their password and login without Facebook auth.

# Why do people prefer login/password

My guess is that a lot of the people who sign up to ZoomIn are signing up to edit their business details, and don't want to have to use their personal facebook account to connect with ZoomIn.

# Will I re-add Facebook auth?

I'll have a think about it, but for now it's not on the list.

# Fixing login bugs

I've got a few email lately about people having problems resetting their passwords or logging in. I've done a bunch of debugging, and fixed many skanky manky bugs in the login process, so hopefully people will have a lot more luck logging into ZoomIn. If you're a ZoomIn user and can't log in or reset your password, or signup - please let me know and I'll look into it! :)