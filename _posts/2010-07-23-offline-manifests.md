I've been working on an html5 app for Lonely Planet, and part of the task is to make the app work offline on the iPhone. Getting it to work isn't too hard - you need to create a [cache.manifest](http://diveintohtml5.org/offline.html) file and make sure it is served with the correct mime type.

## The problem is online

When you have the phone offline and load the app, it loads in 2 seconds. When you turn the phone online again, it takes about 30 seconds to load all the javascript and so on.

## It's the caching rules

We have been deploying to google app engine, and by default - app engine sets all files to expire after 10 minutes. So even though the iphone has a local copy of the files, every 10 minutes, it'll expire the local cache and redownload everything that the manifest refers too.

## A checklist for fast online iphone apps

1. Use a manifest
1. Ensure the manifest is served with the mimetype text/cache-manifest
1. Ensure the manifest has no 404 errors in it
1. Ensure the manifest and all the content in it has an expiry date in the distant future
1. White-list your network resources explicitly in the manifest
1. Use jqt.offline.js to help debug the browser behaviour
1. Tail your webserver logs and keep an eagle eye for unnecessary requests

All going well, your html5 app will load instantly, and still be able to access network resources.