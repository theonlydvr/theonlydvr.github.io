const id = getParameterByName('id');
let work = portfolio[portfolio.length-id-1];
if (work.hasOwnProperty("link")) {
  window.location.assign(work.link);
}
else {
  $("#work-img").attr("src", work.content);
  $("#work-name").append(work.name);
  $("#work-type").append(work.type.charAt(0).toUpperCase() + work.type.slice(1));
  $('#work-desc').append(work.desc);

  const left = $("#c-left");
  const right = $("#c-right");

  if (id == portfolio.length-1) {
    left.css("visibility", "hidden");
  } else {
    left.attr("href","work-single?id="+(parseInt(id)+1));
  }

  if (id == 0) {
    right.css("visibility", "hidden");
  } else {
    right.attr("href","work-single.html?id="+(parseInt(id)-1));
  }

  if (work.hasOwnProperty("play_store")) {
    icon=$('<a>', {href: work.play_store, class: "nav-icon"});
    icon.append($('<i>', {class: "fab fa-google-play"}))
    $(".nav-cont").append(icon);
  }

  if (work.hasOwnProperty("app_store")) {
    icon=$('<a>', {href: work.app_store, class: "nav-icon"});
    icon.append($('<i>', {class: "fab fa-app-store-ios"}))
    $(".nav-cont").append(icon);
  }

  if (work.hasOwnProperty("download")) {
    icon=$('<a>', {href: work.download, class: "nav-icon"});
    icon.append($('<i>', {class: "fas fa-file-download"}))
    $(".nav-cont").append(icon);
  }

  if (work.hasOwnProperty("play")) {
    icon=$('<a>', {href: work.play, class: "nav-icon"});
    icon.append($('<i>', {class: "fas fa-play"}))
    $(".nav-cont").append(icon);
  }
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
