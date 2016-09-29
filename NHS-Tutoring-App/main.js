document.addEventListener("deviceready", loadClasses(), false);
	function loadClasses() {
		var table = $("#main-classes");
		var languages = ["english", "dutch", "french", "spanish", "swedish"];
		console.log(localStorage.classes);
		var classes = localStorage.classes.split(",");
		for (var i = 0; i < classes.length; i += 2) {
			var class1 = classes[i].toLowerCase();
			if (i + 1 < classes.length) {
				var class2 = classes[i + 1].toLowerCase();
				table.html(table.html() + "<tr><td onClick=\"classClicked('#" + class1 +"');\"><div id='" + class1 + "' class='class-icon language'></div><p>" + class1.charAt(0).toUpperCase() + class1.substring(1) + "</p></td><td onClick=\"classClicked('#" + class2 +"');\"><div id='" + class2 + "' class='class-icon language'></div><p>" + class2.charAt(0).toUpperCase() + class2.substring(1) + "</p></td></tr>");
			}
			else {
				table.html(table.html() + "<tr><td onClick=\"classClicked('#" + class1 + "');\"><div id='" + class1 + "' class='class-icon language'></div><p>" + class1.charAt(0).toUpperCase() + class1.substring(1) + "</p></td></tr>");
			}
		}
	}
	
	function classClicked(id) {
		window.location = "schedule.html?class=" + id.charAt(1).toUpperCase() + id.substring(2);
	}