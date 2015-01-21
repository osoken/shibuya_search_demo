var selected_points = [];
// TODO: MAX, MINを動的にとる
var MAX_LAT = 139.702,
    MIN_LAT = 139.699;
var MAX_LNG = 35.6589,
    MIN_LNG = 35.6584;
var FLOOR_LEVEL = [1, 105, 2, 3]; 

d3.csv("data/Shibuya_Point.csv", function(error, data) {
    if (error != null) {
        console.log(err);
        return;
    }
    var floor_data = [];
    // TODO: TODO: 1〜3階固定ではなく、動的にする。
    FLOOR_LEVEL.forEach(function(floor_level){
        // 階ごとにデータを生成
        floor_data[floor_level] = data.filter(function(element) {
            return element.floorLevel === String(floor_level);
        });
        // svgタグを生成
        var svg = d3.select("#floor_" + floor_level)
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%");
        // ポイントごとに円を生成
        svg.selectAll("circle")
            .data(floor_data[floor_level])
            .enter().append("circle")
            .attr("cx", function(d) {
                return (d.lat - MIN_LAT) / (MAX_LAT - MIN_LAT) * $("#floor_" + floor_level).width();
            })
            .attr("cy", function(d) {
                return (MAX_LNG - d.lng) / (MAX_LNG - MIN_LNG) * $("#floor_" + floor_level).height();
            })
            .attr("r", 10)
            .attr("fill", "blue")
            // ポイントごとにクリックイベントを生成
            .on("click", function(d){ 
            	selected_points.push(d);
            	console.log(selected_points); 
            });
        // ポイントごとに名前を生成
        svg.selectAll("text")
            .data(floor_data[floor_level])
            .enter().append("text")
            .attr("x", function(d) {
                return (d.lat - MIN_LAT) / (MAX_LAT - MIN_LAT) * $("#floor_" + floor_level).width() + 10;
            })
            .attr("y", function(d) {
                return (MAX_LNG - d.lng) / (MAX_LNG - MIN_LNG) * $("#floor_" + floor_level).height();
            })
            .text(function(d) {
                return d.Name;
            })
            .attr({
                'dominant-baseline': 'middle'
            });
    });
});