$(window).on("load",function(){	
	$(".loader").fadeOut("slow");
	
	$('.grid').masonry({
	  itemSelector: '.pin',
	  columnWidth: ".pin",
	  gutter:10
	});
	$(".pin").animate({"opacity":"1"},1000);
});	

$("img").on("error",function(){
	var id=$(this).parent().attr("id");
	$(this).attr("src","public/dist/images/default.jpg");
	$.ajax({
		url:"/pins/repair/"+id,
		type:"PUT",
		success:function(data){
			console.log(data);
		}
	})
})

$(".delete").click(function(){
	var id=$(this).parent().attr("id");
	var _this=this;
	if(confirm("Are you sure you want to permanently delete this?")){
		$.ajax({
			url:"/pins/"+id,
			type:"DELETE",
			success:function(data){
				console.log(data);
				$(_this).parent().hide();
			},
			failure:function(err){
				alert(err);
			}
		})
	}
})
