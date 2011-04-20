---
layout: post
title: Channel Activity
---

It's hard to discover new activity in Buddycloud, time to fix that.

<img src="/images/poke/channel-list.png" />
<cite>The channel list in buddycloud</cite>

Log into diaspora-x and there's no indication of what activity is happening on your channels. Simon said to put the channel list on the left and bubble activity to the top. Let's try.

    span{
      display: inline-block;
      height: 20px;
      width: 20px;
      text-align: center;
      font-size: 0.8em;
      background: #999;
      color: white;
      border-radius: 10px;
    }

Okay - add a litte badge showing the number of posts, and reorder the channel list by number of posts.

<img src="/images/poke/channel-list-imp.png" />
<cite>A sorted list of channels with new activity</cite>

Nice.