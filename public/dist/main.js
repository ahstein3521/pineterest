$(window).on("load",function(){$(".loader").fadeOut("slow"),$(".grid").masonry({itemSelector:".pin",columnWidth:".pin",gutter:10}),$(".pin").animate({opacity:"1"},1e3)}),$("img").on("error",function(){var t=$(this).parent().attr("id");$(this).attr("src","public/dist/images/default.jpg"),$.ajax({url:"/pins/repair/"+t,type:"PUT",success:function(t){console.log(t)}})}),$(".delete").click(function(){var t=$(this).parent().attr("id"),e=this;confirm("Are you sure you want to permanently delete this?")&&$.ajax({url:"/pins/"+t,type:"DELETE",success:function(t){console.log(t),$(e).parent().hide()},failure:function(t){alert(t)}})});