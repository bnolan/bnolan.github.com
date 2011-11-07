---
layout: post
title: Big MySql Imports
---

Today I've been fighting a 10+ gigabyte mysql import. I've come across and solved a few problems that might be handy to someone in the future.

# max_allowed_packet

In your `/etc/my.cnf`, it specifies the maximum packet size. I had the problem where some of the insert statements exceeded 1 megabyte in size, so increasing this limit to 64M solved my first problem.

# Resuming from mid-way through an import

Next up, I wanted to `cat` the sql import, but skip all the tables up to table `xyz`. This I accomplished with a little bit of sed magic:

    cat dump.sql | sed -n -e '/`some_table_name`/,$p' | mysql --init-command="SET foreign_key_checks = 0;" database_name
  
Note the `set foreign_key_checks` parameter to mysql, this is normally set at the top of your dump file, because we're truncating the front off the dump file, you need to disable foreign key checks explicitly.

# Using pipe viewer

[PV](http://www.ivarch.com/programs/pv.shtml) is a tool to graph your progress. Instead of running `cat` and hoping for the best, you get graphical feedback on how long your database restore process will take.