
$('<p />').html('Sally is here...').appendTo '#transcript'

Conversant = $({})

Conversant.say = (message) ->
  Transcript.say('You', message)
  @trigger('say')

Sally = $({})

Sally.say = (message) ->
  Transcript.say('Sally', message)
  @trigger('say')

Transcript = 
  say : (from, message) ->
    p = $('<p />').html("<b>#{from}:</b>")
    $("<span />").text(message).appendTo p
    p.appendTo '#transcript'
    
    @crop()
    
  crop : ->
    d = $("#transcript")
    d.scrollTop(d[0].scrollHeight)
  
class Memory
  constructor: ->
    @nodes = {}
    
  getOrSet: (term) ->
    @nodes[term] ||= new MemoryNode(term)

  count: ->
    _(@nodes).keys().length

  getByIndex: (i) ->
    key = _(@nodes).keys()[i]
    @get(key)
    
  get: (term) ->
    @nodes[term]
    
  random: ->
    @getByIndex Math.floor(Math.random() * @count())
      
memory = new Memory

String.prototype.normalizeForThought = () ->
  map = 
    'you' : 'sally'
    'i' : 'conversant'
    
  result = for t in @split(' ')
    map[t] || t

  result.join ' '
  
String.prototype.normalizeForSpeech = () ->
  map =
    'sally' : 'i'
    'conversant' : 'you'

  result = for t in @split(' ')
    map[t] || t

  result.join ' '
  
class MemoryNode
  constructor: (term) ->
    @term = term
    @relationship = {}
    
  toString: ->
    @term
    
  randomWalk: ->
    index = Math.floor(Math.random() * _(@relationship).keys().length)
    key = _(@relationship).keys()[index]
    memory.get(key)
    
  isStopTerm: ->
    (@term == '?') or (@term == '.') or (@term == '!')
    
  strengthen: (other) ->
    @relationship[other] = true
    
    if memory.get(other)
      memory.get(other).relationship[@term] = true

    # ||= 0
    # @relationship[other] += 1
    # if memory[other].relationship[this]
    #   memory[other].relationship[this] += 1
    # else
    #   memory[other].relationship[this] = 1
      
class Chain
  constructor: ->
    @chain = []
    
  push: (node) ->
    @chain.push node
    
  toString: ->
    result = for node in @chain
      node.toString()

    result.join(" ")
    
Sally.think = (input) ->
  input = input.toLowerCase()
  input = input.replace /[^a-z0-9?.! ]/g, ''
  input = input.normalizeForThought()
  
  former = null
    
  for term in input.split(/\b/)
    node = memory.getOrSet(term)
    
    if former
      node.strengthen(former)
      
    former = term
    
class Metric
  constructor: () ->
    @value = 0.5
    
  clamp: ->
    @value = Math.min(1.0, Math.max(0.0, @value))
    
  draw: ->
    $("#inputs b").text @value.toFixed(2)

class AwkwardMetric extends Metric
  constructor: ->
    @reset()
    
    Conversant.bind 'say' , @reset
    Sally.bind 'say' , @increase
    
  # timestep is in seconds
  evaluate: (timestep) ->
    @value += timestep / 10
    @clamp()
    
  increase: =>
    @value += 0.1
    @clamp()
    
  reset: =>
    @value = 0.2
        
metrics = 
  awkward : new AwkwardMetric

drawMetrics = ->
  for key, metric of metrics
    metric.draw()

setInterval drawMetrics, 100


# class Neuron
#   
# class Input extends Neuron
#   constructor: ->
#     
# class Output extends Neuron
#       
# class Mind
#   constructor: ->
#     @neurons = []
#     
#   add: (neuron) ->
#     
#   randomize: ->

brainfart = ->
  
  node = null
  
  while (!node) || (node.isStopTerm())
    node = memory.random()
    
  chain = new Chain
  
  x = 0
  while (x++ < 5) && (node)
    chain.push node
    
    node = node.randomWalk()
    
    if node.isStopTerm()
      chain.push node
      break
    
  Sally.say chain.toString().normalizeForSpeech()
  
inputs = $('textarea').val().split('\n')

for input in inputs
  Sally.think(input)
  
# brainfart()

TS = 0.1

timestep = ->
  if Math.random() > 0.75
    if Math.random() > metrics.awkward.value
      brainfart()
    
  for key, metric of metrics
    metric.evaluate(TS)
    

setInterval timestep, 1000 * TS


$('form').submit (e) ->
  e.preventDefault()

  message = $('input').val()
  Conversant.say message
  Sally.think message
  
  # Reset the awkward pauses metric
  metrics.awkward.reset()
  
  $('input').val('')


