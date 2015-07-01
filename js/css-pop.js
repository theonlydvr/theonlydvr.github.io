function toggle(div_id) {
	var el = document.getElementById(div_id);
	if ( el.style.display == 'none' ) {	el.style.display = 'block';}
	else {el.style.display = 'none';}
}
function blanket_size(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportheight = window.innerHeight;
	} else {
		viewportheight = document.documentElement.clientHeight;
	}
	if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
		blanket_height = viewportheight;
	} else {
		if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
			blanket_height = document.body.parentNode.clientHeight;
		} else {
			blanket_height = document.body.parentNode.scrollHeight;
		}
	}
	var blanket = document.getElementById('blanket');
	blanket.style.height = blanket_height + 'px';
	var popUpDiv = document.getElementById(popUpDivVar);
	popUpDiv_height=blanket_height/2-200;//200 is half popup's height
	popUpDiv.style.top = popUpDiv_height + 'px';
}
function window_pos(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportwidth = window.innerHeight;
	} else {
		viewportwidth = document.documentElement.clientHeight;
	}
	if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
		window_width = viewportwidth;
	} else {
		if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
			window_width = document.body.parentNode.clientWidth;
		} else {
			window_width = document.body.parentNode.scrollWidth;
		}
	}
	var popUpDiv = document.getElementById(popUpDivVar);
	window_width=window_width/2-200;//200 is half popup's width
	popUpDiv.style.left = window_width + 'px';
}
function popup(windowname, num) {
    $.getJSON('json/origami.json', function(data) {
                   $.each(data.Models, function(i, f) {
                       console.log('woof');
                      if (i == num)
                      {
                          $("#model").attr("src", "graphics/" + i + ".jpg");
                          $("#o-desc").html("Model: " + f.Model + "<br/>" +
                                            "Designer: " + f.Designer + "<br/>"  +
                                            "Medium: " + f.Medium + "<br/>"  +
                                            "Diagrams: " + ((f.Diagrams != "None") ? "<a class='cp-link' href='" + f.Diagrams + "'>Here</a>" : f.Diagrams) + "<br/>"  +
                                            "Crease Pattern: " + ((f.CP != "None") ? "<a class='cp-link' href='" + f.CP + "'>Here</a>" : f.CP));
                      }
                 });

               });
	blanket_size(windowname);
	window_pos(windowname);
    $("#blanket").fadeToggle("250");
	$("#" + windowname).fadeToggle("250");	
}