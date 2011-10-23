---
layout: post
title: CSV Parser in CoffeeScript 
---

I recently needed to be able to parse CSV export from excel, in Javascript. The only way I could find to parse it was a stream-oriented parser, so I came up with this that seems to cope with the majority of strangeness, including multiline cells, quotation marks, and escape and non-escaped cells.

It's implemented in coffeescript:

    class CSV
      constructor: (data) ->
        @raw = data
    
        @_parse(@raw)

      _parse: ->
        @rows = []
        row = []
        cell = ""
    
        offset = 0
    
        mode = CSV.RAW
    
        while offset < @raw.length
          ch = @raw.charAt(offset)
          adjacent = @raw.charAt(offset+1)

          if mode == CSV.RAW
            if ch == ","
              row.push cell
              cell = ""
            else if ch == "\r"
              @rows.push row
              row = []
              cell = ""
            else if ch == "\""
              mode = CSV.ESC
            else
              cell += ch

          else if mode == CSV.ESC
            if ch == "\""
              if adjacent == "\""
                cell += ch
                offset += 1
              else
                mode = CSV.RAW
            else
              cell += ch
          
          else
            throw "Invalid csv parser mode"
        
          offset += 1
    
        @rows
      
    CSV.RAW = 1
    CSV.ESC = 2

    @CSV = CSV
    
This is a good example of code which will block the browser in a big-time way. For example, if you tried to parse a one megabyte CSV file, you'll probably crash webkit mobile devices, and get script timeout errors in slower javascript implementations. Whoever, because all the looping logic is in a while, it'd be straightforward to make the parser run inside a setInterval loop, and let the browser remain responsive.

