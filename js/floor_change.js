var max_floor = 3;
$(".floor").click(function(){
	max_floor = max_floor + 1;
	$(this).css("z-index", max_floor);
});