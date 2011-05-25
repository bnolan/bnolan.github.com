---
layout: post
title: Breakfast or lunch?
---

I give you a time of day, you give me a name for the appropriate meal. I was trying to work out how to do this with a case / switch statement - then came across this syntax which is kinda nice:

    def time_of_day_to_meal_name(t = Time.now)
       {
         0..5 => 'Midnight snack',
         6..10 => 'Breakfast',
         11..14 => 'Lunch',
         15..16 => 'Afternoon tea',
         17..21 => 'Dinner',
         22..24 => 'Late night snack'
       }.find { |k,v| k.include? t.hour}.last
     end
     
What would you like for [lunch](http://bonapp.com/)?
