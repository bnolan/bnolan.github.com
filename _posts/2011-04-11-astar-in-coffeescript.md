---
layout: post
title: A* in coffeescript
---

I put together this astar solver in coffeescript. It expects that nodes have a `key()` function that generates a unique id for the node, and an `getAdjacentNodes()` function that returns valid adjacent nodes.

It seems to work nicely.

Also - it's my birthday today! Woo! :)

    class AStar
      constructor: ->
        @openNodes = {} # List of openNodes nodes (nodes to be inspected)
        @closedNodes = {} # List of closedNodes nodes (nodes we've already inspected)

        # The maximum potential trip length we would consider
        @maxHeuristic = Point.origin().squareDistanceTo(new Point(5, 5))

      findPath: (start, destination) ->
        # g = 0 #Cost from start to current node
        # h = heuristic(start, destination) #Cost from current node to destination
        # var f = g+h #Cost from start to destination going through the current node

        start.f = @heuristic(start, destination)
  
        # Push the start node onto the list of openNodes nodes
        # openNodes.push(start) 
        @openNodes[start.key()] = start

        #Keep going while there's nodes in our openNodes list
        while @openNodes
          #Find the best openNodes node (lowest f value)

          #Alternately, you could simply keep the openNodes list sorted by f value lowest to highest,
          #in which case you always use the first node

          node = { f : Infinity }
    
          for key, n of @openNodes
            if n.f < node.f
              node = n
      
          # No nodes remain in openNodes
          if node.f == Infinity
            # No path could be found...
            console.log "No path could be found"
            return null
            # console.log @closedNodes
      
          # Check if we've reached our destination
          if node.equals(destination)
            path = [destination]
      
            while (node != start) # && (node.parentKey)
              node = @closedNodes[node.parentKey]
              path.push node

            path.reverse()
        
            return path
        
          # Remove the current node from our openNodes list
          delete @openNodes[node.key()]

          # Push it onto the closedNodes list
          @closedNodes[node.key()] = node
    
          # Expand our current node
          for n in node.getAdjacentNodes() when (!@closedNodes[n.key()]) && (!@openNodes[n.key()]) 
            # console.log(n.key())
            n.f = @heuristic(n, destination)
            n.parentKey = node.key()
        
            # Prevent really long paths
            if n.f < @maxHeuristic
              @openNodes[n.key()] = n
            # else 
            #   @closedNodes[n.key()] = n
    
      # An A* heurisitic must be admissible, meaning it must never overestimate the
      # distance to the goal. In other words, it must either underestimate or return 
      # exactly the distance to the goal.
      heuristic: (a, b) ->
        a.position.squareDistanceTo(b.position)
    
Here are the specs so you can see that it does actually work, but the require a bunch of other classes that I've been working on - and I don't have time to tidy them up for release right now:

    describe 'astar', ->

      describe 'square map', ->
        # Create a big square tile
        map = new Map
        bounds = new Bounds(Point.origin(), new Point(10,10))
        for point in bounds.getPoints()
          map.set(point, new Tile)
        origin = map.get(Point.origin())
  
        it "should work horizont", ->
          a = new AStar
          x2 = map.get(new Point(0,5))
          path = a.findPath(origin,x2)
          expect(path.length).toEqual 6

        it "should work vertical", ->
          a = new AStar
          x2 = map.get(new Point(5,0))
          path = a.findPath(origin,x2)
          expect(path.length).toEqual 6

        it "should work diagonal", ->
          a = new AStar
          x2 = map.get(new Point(5,5))
          path = a.findPath(origin,x2)
          expect(path.length).toEqual 11
      
          path = for tile in path
            tile.toString()
        
          expect(path.join(" -> ")).toEqual("0, 0 -> 1, 0 -> 1, 1 -> 2, 1 -> 2, 2 -> 3, 2 -> 3, 3 -> 4, 3 -> 4, 4 -> 5, 4 -> 5, 5")

        it "should several times", ->
          x2 = map.get(new Point(5,5))

          a = new AStar
          path = a.findPath(origin,x2)
          expect(path.length).toEqual 11

          a = new AStar
          path = a.findPath(x2,origin)
          expect(path.length).toEqual 11

          a = new AStar
          path = a.findPath(origin,x2)
          expect(path.length).toEqual 11

          a = new AStar
          path = a.findPath(x2,origin)
          expect(path.length).toEqual 11

          a = new AStar
          path = a.findPath(origin,x2)
          expect(path.length).toEqual 11

          a = new AStar
          path = a.findPath(x2,origin)
          expect(path.length).toEqual 11

        it "should work on a single step", ->
          a = new AStar
          x2 = map.get(new Point(1,0))
          path = a.findPath(origin,x2)
          expect(path.length).toEqual 2
    
        it "should work on origin->origin", ->
          a = new AStar
          path = a.findPath(origin,origin)
          expect(path.length).toEqual 1
    
        it "should return empty when impossible", ->
          map.set(new Point(100, 0), new Tile)

          a = new AStar
          x2 = map.get(new Point(100, 0))
          path = a.findPath(origin,x2)
          expect(path).toEqual null
      
      
