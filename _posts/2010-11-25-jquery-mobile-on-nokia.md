---
layout: post
title: Jquery mobile on Nokia
---

My Nokia 5230 arrived today. What a cool phone for 120€! It has satellite navigation (with a suction cup to stick it on the windscreen), a big screen, decent browser and facebook right on the front page. It's no iphone, but it's 1/5th the price.

As well as using the phone to navigate our way to the some quiet beaches north of Brisbane, I'm using it to debug  [weheartplaces](http://www.weheartplaces.com/), so I can get my app on the Ovi store.

## First attempt

I loaded up jquerymobile.com on the nokia and was sorely disapointed, the current alpha of Jquery mobile doesn't support Nokia S60 v5 (s60 v5 is the touch-screen interface for Nokias) browsers. I quickly set about to see how much work was needed to get things going.

## An hour later

<img src="/images/nokiamobile.png" />
<cite>The backbone mobile demo running on a 5230</cite>

It [works](http://bennolan.com/science/backbone-mobile/)! I created and solved two issues on the Jquery Mobile github - one about [history](https://github.com/jquery/jquery-mobile/issuesearch?state=open&q=history#issue/543) and another about [window.innerHeight](https://github.com/jquery/jquery-mobile/issuesearch?state=open&q=screen.height#issue/542) - and suddenly it all started working.

There are a few things missing in the current S60 implementation, there is no inter-screen animation and some of the CSS looks a bit rough on the symbian browser, but it's totally functional and looks nice enough.

## Fixes needed to jquery mobile for s60

1. Promote s60 v5 to a grade a browser
1. Fix the history tracking (solution at issue 542)
1. Fix window.innerHeight in jquery (solution at issue 542 )
1. Fix inter page animations
1. Fix png / css ugliness

## One code base, at least three platforms

<img src="/images/iphonemobile.png" />
<cite>The backbone mobile demo running on iPhone</cite>

It's exciting to be able to write an application once, in a comfortable development environment (Safari on the desktop), then deploy the same code to iPhone, Android and Nokia. I expect start-ups will begin using this toolchain to build apps for multiple appstores at once. To try out the jquery mobile + backbone app on your Nokia (you'll need a s60 v5 device), Android or iPhone, go to [my backbone mobile demo](http://bennolan.com/science/backbone-mobile/).