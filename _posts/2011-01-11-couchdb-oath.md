---
layout: post
title: CouchDB OAuth
---

I think couchdb is a good solution for creating pure javascript apps, but there are a few big problems with using a service like clouddb, particulary around authentication. There already exists a couchdb oauth module, but afaict, it's for authenticating against couchdb, not for creating a couchdb account against a twitter or facebook account.

If someone like couchone added a simple way to implement an oauth consumer in their apps, it'd be a really fantastic way to prototype apps. You could authenticate using javascript against twitter, google or facebook - create the users account and database, and then return them to your application, all without writing any server side code.

The current couchdb authentication is a bit basic and doesn't support password reset or email verification, and you can't really build such things as couch apps.