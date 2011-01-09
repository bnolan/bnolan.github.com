---
layout: post
title: Couchdb behind Apache
---

I had some issues getting couchdb to work correctly behind Apache. The big problem I was getting was that cross-domain requests were being "preflighted" where the browser sends an `OPTIONS` request to the server, which was being proxied to Couchdb - which was returning error 405, since couch doesn't support the OPTIONS method.

Here is the complete virtualhost setup for giving your localhost apps cross-domain access to couchone.

    <VirtualHost *:80>
            ServerName couchdb.nolanconsul.com

            Header set Access-Control-Allow-Origin "*"
            Header set Access-Control-Allow-Headers Content-Type
            Header set Access-Control-Allow-Methods "GET, PUT, OPTIONS, DELETE, POST"
            Header set Access-Control-Max-Age 3600

            ProxyPass / http://present.couchone.com/ nocanon
            ProxyPassReverse / http://present.couchone.com/

            RewriteEngine On
            RewriteCond %{REQUEST_METHOD} ^OPTIONS
            RewriteRule .* /index.html [L]
    </VirtualHost>

