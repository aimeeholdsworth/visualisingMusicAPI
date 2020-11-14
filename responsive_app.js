(function() {
    'use strict';

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement = document.getElementById('audioElement');
    var audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();



  // bind our analyser to the media element source.
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    // var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    var frequencyData = new Uint8Array(200);

    var svgHeight = 600,
        svgWidth = 960;


        

    /*function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("svgwidth")),
        height = parseInt(svg.style("svgheight")),
        aspect = width / height ;


    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type, 
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth ); //use to make sure everything is inline and floats left. Makes the svg smaller
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}*/

function responsivefy(svg) {
      // get container + svg aspect ratio
      var container = d3.select(svg.node().parentNode),
          width = parseInt(svg.style("width")),
          height = parseInt(svg.style("height")),
          aspect = width / height;

      // add viewBox and preserveAspectRatio properties,
      // and call resize so that svg resizes on inital page load
      svg.attr("viewBox", "0 0 " + width + " " + height)
          .attr("preserveAspectRatio", "xMinYMid")
          .call(resize);

      // to register multiple listeners for same event type,
      // you need to add namespace, i.e., 'click.foo'
      // necessary if you call invoke this function for multiple svgs
      // api docs: https://github.com/mbostock/d3/wiki/Selections#on
      d3.select(window).on("resize." + container.attr("id"), resize);

      // get width of container and resize svg to fit it
      function resize() {
          var targetWidth = parseInt(container.style("width"));
          svg.attr("width", targetWidth);
          svg.attr("height", Math.round(targetWidth / aspect));
      }
    }




  

    var svg = d3.select('body').append('svg')
        
        .attr({
            height: svgHeight,
            width: svgWidth
        })
        .call(responsivefy);
        


    // continuously loop and update chart with frequency data.
    function renderChart() {
        requestAnimationFrame(renderChart);

        // copy frequency data to frequencyData array.
        analyser.getByteFrequencyData(frequencyData);
        // console.log(frequencyData);

        // scale things to fit
        var radiusScale = d3.scale.linear()
            .domain([0, d3.max(frequencyData)])
            .range([0, svgHeight/2 -10]); //change the size of the chart by how much it is divided by

        var hueScale = d3.scale.linear()
            .domain([0, d3.max(frequencyData)])
            .range([0, 360]);

       // update d3 chart with new data
       var circles = svg.selectAll('circle')
           .data(frequencyData);

        circles.enter().append('circle');

        circles
            .attr({
                r: function(d) { return radiusScale(d); },
                cx: svgWidth / 2,
                cy: svgHeight / 2,
                fill: 'none', 
                'stroke-width': 4,
                'stroke-opacity': 0.4,
                stroke: function(d) { return d3.hsl(hueScale(d), 1, 0.5); }
           });

        circles.exit().remove(); 
    }

    // run the loop
    renderChart();

    // just for blocks viewer size
    d3.select(self.frameElement).style('height', '700px');

}());