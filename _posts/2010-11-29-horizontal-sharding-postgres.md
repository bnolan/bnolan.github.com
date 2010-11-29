---
layout: post
title: Horizontal sharding on Postgres
---

Working on [twitterplaces](http://twitterplaces.com/) I get around 2 million tweets per day. The importer is a streaming curl session that I pipe into a ruby script that analyzes the tweet and sticks it into a postgres database.

# Tweet analysis

Some of the analysis I do for each tweet:

* Is it an @ reply?
* What place_id is being referred to?
* Does the user seem spammy?
* What neighbourhood does this tweet belong to?
* What city does this tweet belong to?

This has worked really well and even though its low tech, when combined with a monit script, it's easy to control and robust. 

# The problem

The problem is that after 20 days, you have more than 50 million tweets and postgres starts to grind to a halt when inserting data.

If you had forgotten all of your university level mathematics - you might model the relationship between time to insert and the number of tweets like so:

    lim T(insert_tweet) as SUM(tweets) &rarr; 50m = &#8734;

# The solution

The obvious solution is to delete the old tweets out of the database. Maybe a cron job like this:

    delete from tweets where created_at > 7.days.ago
    
Except every time you do that (and the VACUUM that you have to run afterwards), postgres will stop responding for about an hour, giving a theoretical uptime limit of 0.95. Since I'm aiming for a uptime of at least 3 sixes (0.9666), I decided to look int other options.

# NoSQL

The sexy thing to do would be to use mongodb, couchdb or cassandra. But that migration, and writing all the map-reduce functions, plus removing activerecord and rewriting all my views - would probably take more than the 60 minutes I assigned to this problem.

So... What can we do with postgres?

# Daily sharding

The easiest solution is a [variant on this](http://stackoverflow.com/questions/994882/what-is-a-good-way-to-horizontal-shard-in-postgresql), where you use table inheritance to insert each days tweets into a distinct table, and then query the parent table to get an aggregate view.

So you just have a daily cronjob to drop any tweet tables more than 7 days old, and then create a new table for tomorrows tweets. Since tables are stored seperately on disk, the drop table is essentially free.

# Performance concerns

Indexes can't be built up across multiple tables (and if you did do that, you'd need to rebuild them each day when you dropped 1/8th of the indexed data), so badly written queries could end up with a sequential scan across all tables. I've only had the new system running for a few hours, so I'll know more about performance implications later this week, but since most of my queries run on only the last 24 hours, I hope I can hint postgres to query the most recent table (using the daily indexes) first and only then move back to the second most recent table.

# The code

Nice and simple - a cronjob to create tomorrows table...

    def self.create_tomorrows_table
      date = 1.days.from_now.to_date
      date_string = date.to_s.gsub(/-/,'_')
    
      sql =<< EOF
        CREATE TABLE tweets_#{date_string} ( 
          CHECK ( DATE(created_at) = DATE('#{date}') )
         ) INHERITS (tweets);
      EOF
    
      ActiveRecord::Base.connection.execute sql
    
    end

And then a sharded save method (note that I have a very customized tweet import job, so I don't have to worry about tweet ids / saving associations).

    def sharded_save!
      date = self.created_at.to_date
      date_string = date.to_s.gsub(/-/,'_')

      quoted_attributes = attributes_with_quotes

      sql = << EOF
        INSERT INTO 
          tweets_#{date_string} (#{quoted_column_names.join(', ')})
        VALUES
          (#{quoted_attributes.values.join(', ')})
      EOF

      ActiveRecord::Base.connection.execute sql
    end

# To be continued...

So this is just day one, I'll find out more about this scheme later in the week, but I (yet again) was impressed by how nice a modern postgresql installation is. Well done the postgres team.