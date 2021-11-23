const id = getParameterByName('id');
let work = portfolio[id];

$("#work-img").attr("src", work.content);
$("#work-name").append(work.name);
$("#work-type").append(work.type.charAt(0).toUpperCase() + work.type.slice(1));
$('#work-desc').append(work.desc);

const left = $("#c-left");
const right = $("#c-right");

if (id == portfolio.length-1) {
  right.css("visibility", "hidden");
} else {
  right.attr("href","work-single?id="+(parseInt(id)+1));
}

if (id == 0) {
  left.css("visibility", "hidden");
} else {
  left.attr("href","work-single.html?id="+(parseInt(id)-1));
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
