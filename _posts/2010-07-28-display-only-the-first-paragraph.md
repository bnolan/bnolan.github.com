In redesigning my blog and publishing it on github pages, I wanted a simple way to show only the first paragraph of each post on the front page. The way I did it isn't something I'm proud of - but it does show the power of css.

The following rule hides everything apart from the first immediate child of a div.

    div > * + *{
      display: none;
    }
  
It works on safari, firefox and will work on ie9.