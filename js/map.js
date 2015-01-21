var selected_points = [];
// TODO: MAX, MINを動的にとる
var MAX_LAT = 139.702,
    MIN_LAT = 139.699;
var MAX_LNG = 35.6589,
    MIN_LNG = 35.6584;

d3.csv("data/Shibuya_Point.csv", function(error, data) {
    if (error != null) {
        console.log(err);
        return;
    }
    var floor_data = [];
    // TODO: TODO: 1〜3階固定ではなく、動的にする。
    for (var i = 1; i <= 3; i++) {
        // 階ごとにデータを生成
        floor_data[i] = data.filter(function(element) {
            return element.floorLevel === String(i);
        });
        // svgタグを生成
        var svg = d3.select("#floor_" + i)
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%");
        // ポイントごとに円を生成
        svg.selectAll("circle")
            .data(floor_data[i])
            .enter().append("circle")
            .attr("cx", function(d) {
                return (d.lat - MIN_LAT) / (MAX_LAT - MIN_LAT) * $("#floor_" + i).width();
            })
            .attr("cy", function(d) {
                return (MAX_LNG - d.lng) / (MAX_LNG - MIN_LNG) * $("#floor_" + i).height();
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
            .data(floor_data[i])
            .enter().append("text")
            .attr("x", function(d) {
                return (d.lat - MIN_LAT) / (MAX_LAT - MIN_LAT) * $("#floor_" + i).width() + 10;
            })
            .attr("y", function(d) {
                return (MAX_LNG - d.lng) / (MAX_LNG - MIN_LNG) * $("#floor_" + i).height();
            })
            .text(function(d) {
                return d.Name;
            })
            .attr({
                'dominant-baseline': 'middle'
            });
    }
});