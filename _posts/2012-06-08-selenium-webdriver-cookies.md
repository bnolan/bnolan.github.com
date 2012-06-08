---
layout: post
title: Setting cookies with selenium webdriver
---

This took me more googling and experimentation than it should have. If you want to set cookies using selenium webdriver under rails (for your cucumber specs for example), you want to use `add_cookie`. For example, we use this in our web_steps to authenticate the user by setting the auth cookie directly:

    visit '/'
    page.driver.browser.manage.add_cookie(:name => "auth_token", :value => auth_token)

Here's hoping the next developer trying to do this finds the answer more easily. :)