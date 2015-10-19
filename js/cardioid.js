(function()
{
  Cardioid = function(canvas, kwargs)
  {
    'use strict';
    
    // Private
    var properties = {};

    if(kwargs !== undefined)
      properties = {
        center_x: kwargs.pos_x || canvas.width / 2,
        center_y: kwargs.pos_y || canvas.height / 2,
        step: 360 / kwargs.pieces || 360 / 64,
        radius: kwargs.radius || 200,
        pieces: kwargs.pieces || 64,
        deltaTime: kwargs.deltaTime || 32,
        initialRotation: kwargs.initialRotation || 90,
        fun1: kwargs.fun1 || 2,
        fun2: kwargs.fun2 || 1,
        mirror: kwargs.mirror || true,
        numIterations: kwargs.iterations || 32
      };
    else
      properties = {
        center_x: canvas.width / 2,
        center_y: canvas.height / 2,
        step: 360 / 64,
        radius: 200,
        pieces: 64,
        deltaTime: 32,
        initialRotation: 90,
        fun1: 2,
        fun2: 1,
        mirror: true,
        numIterations: 32
      };
    
    function hsv2rgb(hsv)
    {
      var h = hsv.hue, s = hsv.sat, v = hsv.val;
      var rgb, i, data = [];
      if (s === 0) {
        rgb = [v,v,v];
      } else {
        h = h / 60;
        i = Math.floor(h);
        data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
        switch(i) {
          case 0:
            rgb = [v, data[2], data[0]];
            break;
          case 1:
            rgb = [data[1], v, data[0]];
            break;
          case 2:
            rgb = [data[0], v, data[2]];
            break;
          case 3:
            rgb = [data[0], data[1], v];
            break;
          case 4:
            rgb = [data[2], data[0], v];
            break;
          default:
            rgb = [v, data[0], data[1]];
            break;
        }
      }
      return '#' + rgb.map(function(x){ 
        return ("0" + Math.round(x*255).toString(16)).slice(-2);
      }).join('');
    }
    
    Number.prototype.mod = function(base) { return ((this % base) + base) % base; }
    
    function _genPoints() 
    {
      points = [];
      for(var angle = 0; angle < 360; angle += properties.step)
      {
        var tmp_angle = angle + properties.initialRotation;
        var rad = (tmp_angle * 2 * Math.PI) / 360;

        var point =
        {
          x: properties.center_x + properties.radius * Math.cos(rad),
          y: properties.center_y + properties.radius * Math.sin(rad),
          text_x: properties.center_x - 6 + (properties.radius + 16) * Math.cos(rad),
          text_y: properties.center_y + 4 + (properties.radius + 16) * Math.sin(rad),
          rad: rad,
          angle: tmp_angle
        };

        points.push(point);
      }
    }
    
    function _drawCircle()
    {
      ctx.beginPath();
      ctx.strokeStyle = "#000000";
      ctx.arc(properties.center_x, properties.center_y, properties.radius, 0, 2*Math.PI);
      ctx.stroke();
      ctx.closePath();
      return obj;
    }
    
    function _drawPoints(drawStep)
    {
      var point;

      if(drawStep === undefined)
      {
        for(var index = 0; index < points.length; ++index)
        {
          point = points[index];

          ctx.beginPath();
          ctx.strokeStyle = "#000000";
          ctx.arc(point.x, point.y, 1, 0, 2*Math.PI);
          ctx.stroke();
          ctx.fillText(index.toString(), point.text_x, point.text_y);
          ctx.closePath();
        }
      }
      else
      {
        point = points[drawStep];
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fillText(drawStep.toString(), point.text_x, point.text_y); 
        ctx.closePath();
        
        if(drawStep < points.length - 1)
          animationReferencePoints = setTimeout(function() { _drawPoints(drawStep + 1); }, Math.ceil(properties.deltaTime / 2));
      }
    }
    
    function _drawCarioid(drawStep)
    {
      var start, end;
      
      if(drawStep === undefined)
      {
        for(var curStep = 0; curStep < properties.numIterations; ++curStep)
        {
          start = points[(curStep * properties.fun1).mod(properties.pieces)];
          end = points[((curStep * properties.fun2 + properties.pieces / 2)).mod(properties.pieces)];
          
          ctx.beginPath();
          ctx.strokeStyle = hsv2rgb({hue: curStep % 360, sat: 1, val: 1});
          ctx.lineWidth = 1;
          
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
          ctx.closePath();
          
          if (properties.mirror === true)
          {
            start = points[(-curStep * properties.fun1).mod(properties.pieces)];
            end = points[((-curStep * properties.fun2 - properties.pieces / 2)).mod(properties.pieces)];
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
          } 
        }
      }
      else
      {
        start = points[(drawStep * properties.fun1) % properties.pieces];
        end = points[((drawStep * properties.fun2 + properties.pieces / 2)) % properties.pieces];
        
        ctx.beginPath();
        ctx.strokeStyle = hsv2rgb({hue: drawStep % 360, sat: 1, val: 1});
        ctx.lineWidth = 1;
        
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        ctx.closePath();
        
        if (properties.mirror === true)
        {
          start = points[(-drawStep * properties.fun1).mod(properties.pieces)];
          end = points[((-drawStep * properties.fun2 - properties.pieces / 2)).mod(properties.pieces)];
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
        }

        if(drawStep < properties.numIterations) {
          animationReferenceCardioid = setTimeout(function() { _drawCarioid(++drawStep); }, properties.deltaTime);
        }
      }
      
    }
    
    /**
      * args = {
      *  animCard: boolean,
      *  animNum: boolean
      * }
      */
    function _draw(args)
    {
      clearTimeout(animationReferencePoints);
      clearTimeout(animationReferenceCardioid);
  
      var drawStepCar, drawStepNum;

      if(args !== undefined && args.animCard === true)
        drawStepCar = 0;
      if(args !== undefined && args.animNum === true)
        drawStepNum = 0;
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      obj.drawCircle();
      obj.drawPoints(drawStepNum);
      obj.drawCarioid(drawStepCar);
      
    }
    
    function _clear() { _genPoints(); _draw(); }
    
    var animationReferencePoints = null;
    var animationReferenceCardioid = null;
    
    var ctx = canvas.getContext("2d");
    var points = [];
    _genPoints();
    
    // Public
    var obj = {
      drawCircle: _drawCircle,
      drawPoints: _drawPoints,
      drawCarioid: _drawCarioid,
      draw: _draw,
      changeRadius: function(newRaius)
      {
        properties.radius = newRaius;
        _clear();
      },
      changeInitialRotation: function(newInitialRotation)
      {
        properties.initialRotation = newInitialRotation;
        _clear();
      },
      changeNumPoints: function(newPointsNum)
      {
        if(newPointsNum !== properties.pieces)
        {
          properties.pieces = newPointsNum;
          properties.step = 360 / newPointsNum;
          _clear();
        }
      },
      changeDeltaTime: function(newDeltaTime)
      {
        if(newDeltaTime !== properties.deltaTime)
        {
          properties.deltaTime = newDeltaTime;
        }
      },
      changeNumInterations: function(newNumInterations)
      {
        if(newNumInterations !== properties.numIterations)
        {
          properties.numIterations = newNumInterations;
          _clear();
        }
      },
      setMirror: function(newState)
      {
        properties.mirror = newState;
      },
      changeFun: function(obj)
      {
        var dirty = false;
        if(obj.fun1 !== undefined && obj.fun1 !== properties.fun1) {
          properties.fun1 = obj.fun1;
          dirty = true;
        }
        else if(obj.fun2 !== undefined && obj.fun2 !== properties.fun2) {
          properties.fun2 = obj.fun2;
          dirty = true;
        }
        
        if(dirty === true) _clear();
      }
    };
    
    return obj;
    
  };
})();