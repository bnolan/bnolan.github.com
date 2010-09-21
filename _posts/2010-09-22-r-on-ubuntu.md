---
layout: post
title: Moving to production
---

I lied. I wasn't really building twitterplaces, I just got back from 5 days snowboarding, relaxing and reading books by the fire. Now i'm back in the office and started the week with getting my production box set up so I can deploy the next release of [twitterplaces](http://twitterplaces.com/).

# Monit

I set up a monit task to run my tweet importer and restart the process if it dies. The monit task looks like:

    check process importer
    	with pidfile /tmp/importer.pid
        	start program = "/usr/bin/sudo -u ben /var/www/tp/script/runner -e production Tweet.import" with timeout 20 seconds
        	stop program  = "/bin/kill -TERM `cat /tmp/importer.pid`"

Note that this job requires monit 5 since it uses the `with timeout` parameter. I also added this line to my importer script so that it spits out the process id.

    `echo #{Process.pid} > /tmp/importer.pid`

# R and ODBC

For my R scripts, I've been using the postgres adapter so that I can query directly from within R. It turns out the package I was using on the desktop wasn't available on ubuntu, so I followed the instructions [here](http://ubuntuforums.org/showthread.php?t=614715) and [here](http://simon.bonners.ca/blog///blog5.php/2010/03/13/accessing-a-postgresql-database-from-r-using-rodbc) to get `RODBC` set up with postgres.

# Future tasks

I have a few things left to do before the new release is complete and ready for people to use:

1. __Data massaging__ - the production database needs massaging and normalization of the bounding boxes for cities - I've been doing this adhoc, but it needs to be integrated into the twitter import process.
1. __Data analysis cronjobs__ - some of the data analysis jobs are best run hourly (for example the contour map generation), so these need to be scheduled as a cronjob
1. __Postgres partitioning__ - twitterplaces now imports over 2m tweets a day. To reduce the load on postgres, I'm going to use [partitioning](http://www.postgresql.org/docs/current/static/ddl-partitioning.html) to reduce the size of the indices and quicker data truncation (I can just drop week old tables, instead of a delete and vacuum).

Hopefully i'll be able to get some of that out later this week.