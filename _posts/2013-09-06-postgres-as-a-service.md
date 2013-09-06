---
layout: post
title: "Postgres as a service"
---
 
I had this idea the other day while daydreaming about javascript single page apps. I thought it'd be cool to have postgres available as a json service via CORs, that you could build little javascript apps with a centralised datastore. Just write a small bit layer of ruby that takes a query, executes it on the postgres server and returns the results at json. Obviously you could only share the databases with people you trust, since anyone could run:

    Backend.query("drop all from posts");
    
But, for example, inside on organisation, you could build little apps that add functionality onto bigger apps. Imagine greasemonkey scripts with a shared database. It'd be nice to integrate something like `phppgadmin` into the service, then eople could log in and see their databases and admin them.

# Backbone integration

It'd be worth writing a backbone integration that made Backbone.sync work with the database. I don't think that'd be too hard, you could even come up with a nice model for creating migrations in Javascript.

# Fork databases

It'd be great to be able to fork and backup databases whenever you want, like you can on Heroku, so that if you're making dangerous changes to your app you can keep backups.

# Pricing

You could probably give away small limited-size databases (with a 1000ms query time limit and 500 row limit), so that people could knock up little ideas on the service, and then have paid plans for bigger databases. You could also have some kind of nice referral-sign-up system, where someone creates a single-page-app that does X, and then they host the app themselves on S3 or Heroku, and when someone wants to use their app, you have an API that lets people sign up for a paid database through a javascript API, and then you pay the app developer some porportion of the monthly revenue for databases created by their app.

Anyway, it's an interesting idea, and I might have a crack at writing the backbone sync module at some stage.