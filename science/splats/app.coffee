class Point
  constructor: (x, y, z) ->
    @x = x
    @y = y
    
  distance: (p) ->
    Math.sqrt((@x - p.x) * (@x - p.x) + (@y - p.y) * (@y - p.y))
    
class Vector
  constructor: (x, y, z) ->
    @x = x
    @y = y
    @z = z

  distance: (p) ->
    Math.sqrt((@x - p.x) * (@x - p.x) + (@y - p.y) * (@y - p.y))

  project: ->
    r = 0.52
    x = (@x - @z) * Math.cos(r)
    y = -@y + (@x + @z) * Math.sin(r)
    new Point(Math.floor(x), Math.floor(y))


  
class Wall
  constructor: (grid, altitude, orientation) ->

    @orientation = orientation
    @grid = grid
    
    # Note the difference between height and altitude
    if @isNorth() or @isWest()
      @height = altitude * Wall.GridSpacing
    else
      @height = Wall.GridSpacing

    @width = Wall.GridSpacing
    @altitude = altitude

    @canvas = $("<canvas />")
    @label = $("<label />")
    @canvas.click @onclick
    
    position = new Vector(@grid.x * 100, 0, @grid.y * 100)
    pt = position.project()
    left = pt.x
    top = pt.y
    
    # left = @grid.x * 0.9 # Math.floor(@grid.x / 2)
    # top = (@grid.y + @grid.x * 0.52 - @altitude)

    # @canvas.attr("width", @width).attr("height", @height).css {
    #   left : (-0.46 + left) * Wall.GridSpacing,
    #   top : (0.72 + top) * Wall.GridSpacing
    #   'z-index' : (-top + @altitude) * Wall.GridSpacing
    # }
    # 
    
    top = pt.y

    top -= @altitude * Wall.GridSpacing
    
    if @isFloor()
      top -= 75
      
    @canvas.attr("width", @width).attr("height", @height).css {
      left : pt.x
      top : top
      'z-index' : pt.y
    }
    
    console.log(0 - pt.y - @height)
    
    @label.html("#{grid.x},#{grid.y}").css {
      "width" : 100
      "line-height" : 100
      left : left
      top : top - 800
    }

    # @canvas.hide()

    if @isNorth()
      @canvas.addClass('north')
    else if @isWest()
      @canvas.addClass('west')
    else if @isFloor()
      # @label.appendTo '#playfield'
      @canvas.addClass('floor')
      @canvas.show()
      
      # @canvas.attr("width", @width).attr("height", @height).css {
      #   left : left # * Wall.GridSpacing,
      #   top : top # * Wall.GridSpacing
      #   # 'z-index' : top * Wall.GridSpacing + @altitude
      # }
    else
      throw "Exception at incorrectly oriented floor"

    @canvas.appendTo '#playfield'
    @ctx = @canvas[0].getContext('2d')
    
    # if @grid.y == 0 and @isWest() # 
    
  onclick: (e) =>
    $('canvas').removeClass('selected')
    @canvas.addClass('selected')
    
  project: (vector)->
    r = 0.46365
    r = 0.52
    x = (vector.x - vector.z) * Math.cos(r)
    y = -vector.y + (vector.x + vector.z) * Math.sin(r)

    new Point(x,y)

  splatter: ->
    colors = ['#0077ff', '#ff7700', '#333333', '#ff0077', '#00ff00', '#F2F26F', '#95CFB7', '#F04155', '#f3f3f3']
    color = colors[Math.floor(Math.random() * 10)]
    color = $("#color").val() # "#FF0088"
    
    for i in [0..5]
      @splat(Math.random(), Math.random(), color, Math.random() * 2 + 2)
    
    if @isWest()
      @ctx.fillStyle = 'rgba(0,0,0,0.02)'
      @ctx.fillRect 0, 0, @width, @height
    
    if @isNorth()
      @ctx.fillStyle = 'rgba(0,0,0,0.05)'
      @ctx.fillRect 0, 0, @width, @height

    if @isFloor()
      @ctx.fillStyle = 'rgba(255,255,255,0.2)'
      @ctx.fillRect 0, 0, @width, @height

    
  isNorth: ->
    @orientation == Wall.North

  isWest: ->
    @orientation == Wall.West

  isFloor: ->
    @orientation == Wall.Floor
  
  splat: (x,y,color,magnitude) ->
    # @ctx.globalAlpha = 1.0
    
    for i in [0..20]

      a = Math.random() * Math.PI * 2
      d = Math.random() * 0.4 * magnitude
      
      u = Math.sin(a) * d + x
      v = Math.cos(a) * d + y
      r = Math.min(0.005 / (d * d), 0.1) * magnitude

      d = d * d
      
      @ctx.beginPath()
      @ctx.fillStyle = color
      @ctx.arc u * @width, v * @height, r * @width / 2, 0, Math.PI * 2
      @ctx.fill();


Wall.North = 1
Wall.West = 2
Wall.Floor = 3
Wall.GridSpacing = 100

class Avatar
  constructor: (city) ->
    @city = city
    @position = new Vector 100, 0, 100
    @div = $("#player")

  draw: =>
    pt = @position.project()

    @div.css {
      left : pt.x - 32
      top : pt.y - 32
      'z-index' : pt.y + 96
    }

class Player extends Avatar
  constructor: (city) ->
    super(city)

    @keys = {}
    
    $(document).keydown (e) =>
      @keys[e.keyCode] = true

    $(document).keyup (e) =>
      @keys[e.keyCode] = false
    
    setInterval(@move, 30)
    setInterval(@draw, 30)
    
  move: =>
    speed = 5
    
    if @keys[40]
      @position.x += speed
      @position.z += speed

    if @keys[38]
      @position.x -= speed
      @position.z -= speed
    
    if @keys[39]
      @position.x += speed
      @position.z -= speed

    if @keys[37]
      @position.x -= speed
      @position.z += speed

    if @keys[32]
      @splat()

  splat: =>
    x = Math.floor(@position.x / 100)
    y = Math.floor(@position.z / 100)

    u = Math.floor(@position.x % 100) / 100
    v = Math.floor(@position.y % 100) / 100
    
    v = 0.5
    
    index = "#{x}/#{y}"
    
    for wall in @city.walls[index] when wall.altitude == 0
      wall.splatter()

    index = "#{x-1}/#{y}"

    for wall in @city.walls[index] when wall.isNorth()
      wall.splatter()

    index = "#{x}/#{y-1}"

    for wall in @city.walls[index] when wall.isWest()
      wall.splat(u, v, '#ff0088', Math.random() * 2 + 2)
    
class City
  constructor: ->
    player = new Player(this)
    @walls = {}
    
    for x in [-5..5]
      for y in [-5..5]
        altitude = @getAltitude(x,y) * 0.7
        index = "#{x}/#{y}"
        
        # altitude = 0

        # 
        # Math.floor(Math.random() * 3) * 128 + 64
        # y = 0
        
        @walls[index] = [
          new Wall(new Point(x,y), altitude, Wall.Floor)
        ]

        if altitude > 0 and @getAltitude(x-1,y+1) < @getAltitude(x,y)
          @walls[index].push(
            new Wall(new Point(x,y), altitude, Wall.West)
          )

        if altitude > 0 and @getAltitude(x+1,y) < @getAltitude(x,y)
          @walls[index].push(
            new Wall(new Point(x,y), altitude, Wall.North)
          )
    
  getAltitude: (x,y) ->
    try
      parseInt(City.map.split(" ")[y].charAt(x)) || 0
    catch e
      0
    
City.map = "
11122........................... 
1............................ 
1............................ 
...11....................... 
1..1......................... 
1..11........................ 
1............................ 
1..1111111111................";

this.City = City

$(document).ready =>
  new City
  