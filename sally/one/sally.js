var AwkwardMetric, Chain, Conversant, Memory, MemoryNode, Metric, Sally, TS, Transcript, brainfart, drawMetrics, input, inputs, memory, metrics, timestep, _i, _len;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
$('<p />').html('Sally is here...').appendTo('#transcript');
Conversant = $({});
Conversant.say = function(message) {
  Transcript.say('You', message);
  return this.trigger('say');
};
Sally = $({});
Sally.say = function(message) {
  Transcript.say('Sally', message);
  return this.trigger('say');
};
Transcript = {
  say: function(from, message) {
    var p;
    p = $('<p />').html("<b>" + from + ":</b>");
    $("<span />").text(message).appendTo(p);
    p.appendTo('#transcript');
    return this.crop();
  },
  crop: function() {
    var d;
    d = $("#transcript");
    return d.scrollTop(d[0].scrollHeight);
  }
};
Memory = (function() {
  function Memory() {
    this.nodes = {};
  }
  Memory.prototype.getOrSet = function(term) {
    var _base;
    return (_base = this.nodes)[term] || (_base[term] = new MemoryNode(term));
  };
  Memory.prototype.count = function() {
    return _(this.nodes).keys().length;
  };
  Memory.prototype.getByIndex = function(i) {
    var key;
    key = _(this.nodes).keys()[i];
    return this.get(key);
  };
  Memory.prototype.get = function(term) {
    return this.nodes[term];
  };
  Memory.prototype.random = function() {
    return this.getByIndex(Math.floor(Math.random() * this.count()));
  };
  return Memory;
})();
memory = new Memory;
String.prototype.normalizeForThought = function() {
  var map, result, t;
  map = {
    'you': 'sally',
    'i': 'conversant'
  };
  result = (function() {
    var _i, _len, _ref, _results;
    _ref = this.split(' ');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      t = _ref[_i];
      _results.push(map[t] || t);
    }
    return _results;
  }).call(this);
  return result.join(' ');
};
String.prototype.normalizeForSpeech = function() {
  var map, result, t;
  map = {
    'sally': 'i',
    'conversant': 'you'
  };
  result = (function() {
    var _i, _len, _ref, _results;
    _ref = this.split(' ');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      t = _ref[_i];
      _results.push(map[t] || t);
    }
    return _results;
  }).call(this);
  return result.join(' ');
};
MemoryNode = (function() {
  function MemoryNode(term) {
    this.term = term;
    this.relationship = {};
  }
  MemoryNode.prototype.toString = function() {
    return this.term;
  };
  MemoryNode.prototype.randomWalk = function() {
    var index, key;
    index = Math.floor(Math.random() * _(this.relationship).keys().length);
    key = _(this.relationship).keys()[index];
    return memory.get(key);
  };
  MemoryNode.prototype.isStopTerm = function() {
    return (this.term === '?') || (this.term === '.') || (this.term === '!');
  };
  MemoryNode.prototype.strengthen = function(other) {
    this.relationship[other] = true;
    if (memory.get(other)) {
      return memory.get(other).relationship[this.term] = true;
    }
  };
  return MemoryNode;
})();
Chain = (function() {
  function Chain() {
    this.chain = [];
  }
  Chain.prototype.push = function(node) {
    return this.chain.push(node);
  };
  Chain.prototype.toString = function() {
    var node, result;
    result = (function() {
      var _i, _len, _ref, _results;
      _ref = this.chain;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        _results.push(node.toString());
      }
      return _results;
    }).call(this);
    return result.join(" ");
  };
  return Chain;
})();
Sally.think = function(input) {
  var former, node, term, _i, _len, _ref, _results;
  input = input.toLowerCase();
  input = input.replace(/[^a-z0-9?.! ]/g, '');
  input = input.normalizeForThought();
  former = null;
  _ref = input.split(/\b/);
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    term = _ref[_i];
    node = memory.getOrSet(term);
    if (former) {
      node.strengthen(former);
    }
    _results.push(former = term);
  }
  return _results;
};
Metric = (function() {
  function Metric() {
    this.value = 0.5;
  }
  Metric.prototype.clamp = function() {
    return this.value = Math.min(1.0, Math.max(0.0, this.value));
  };
  Metric.prototype.draw = function() {
    return $("#inputs b").text(this.value.toFixed(2));
  };
  return Metric;
})();
AwkwardMetric = (function() {
  __extends(AwkwardMetric, Metric);
  function AwkwardMetric() {
    this.reset = __bind(this.reset, this);;
    this.increase = __bind(this.increase, this);;    this.reset();
    Conversant.bind('say', this.reset);
    Sally.bind('say', this.increase);
  }
  AwkwardMetric.prototype.evaluate = function(timestep) {
    this.value += timestep / 10;
    return this.clamp();
  };
  AwkwardMetric.prototype.increase = function() {
    this.value += 0.1;
    return this.clamp();
  };
  AwkwardMetric.prototype.reset = function() {
    return this.value = 0.2;
  };
  return AwkwardMetric;
})();
metrics = {
  awkward: new AwkwardMetric
};
drawMetrics = function() {
  var key, metric, _results;
  _results = [];
  for (key in metrics) {
    metric = metrics[key];
    _results.push(metric.draw());
  }
  return _results;
};
setInterval(drawMetrics, 100);
brainfart = function() {
  var chain, node, x;
  node = null;
  while ((!node) || (node.isStopTerm())) {
    node = memory.random();
  }
  chain = new Chain;
  x = 0;
  while ((x++ < 5) && node) {
    chain.push(node);
    node = node.randomWalk();
    if (node.isStopTerm()) {
      chain.push(node);
      break;
    }
  }
  return Sally.say(chain.toString().normalizeForSpeech());
};
inputs = $('textarea').val().split('\n');
for (_i = 0, _len = inputs.length; _i < _len; _i++) {
  input = inputs[_i];
  Sally.think(input);
}
TS = 0.1;
timestep = function() {
  var key, metric, _results;
  if (Math.random() > 0.75) {
    if (Math.random() > metrics.awkward.value) {
      brainfart();
    }
  }
  _results = [];
  for (key in metrics) {
    metric = metrics[key];
    _results.push(metric.evaluate(TS));
  }
  return _results;
};
setInterval(timestep, 1000 * TS);
$('form').submit(function(e) {
  var message;
  e.preventDefault();
  message = $('input').val();
  Conversant.say(message);
  Sally.think(message);
  metrics.awkward.reset();
  return $('input').val('');
});