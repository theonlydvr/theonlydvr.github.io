for (let i = 0; i < publications.length; i++) {
  const col = $('<div>', {class: publications[i].id + " item col-sm-12 col-md-12 col-lg-6 mb-6"});
  const pubinfo = $('<div>', {class: "pub-info"});
  col.append(pubinfo);
  const imgcont = $('<div>', {class: "img-cont"});
  pubinfo.append(imgcont);
  imgcont.append($('<img>', {class: "img-fluid", src: publications[i].img, loading: "lazy"}));
  pubinfo.append('<h3>' + publications[i].title + "</h3>");
  pubinfo.append('<h4>' + publications[i].abstract + "</h4>");
  pubinfo.append('<h5>' + publications[i].authors + "</h5>");
  const buttoncont = $('<div>', {class: "button-cont"});
  pubinfo.append(buttoncont);
  if (publications[i].hasOwnProperty("pdf")) {
    buttoncont.append($('<a>', {href: publications[i].pdf, text: "PDF"}));
    buttoncont.append(" ");
  }
  if (publications[i].hasOwnProperty("citation")) {
    buttoncont.append($('<a>', {href: "#", "data-toggle": "modal", "data-target": "#modal", "data-filename": publications[i].citation, text: "Cite"}));
    buttoncont.append(" ");
  }
  if (publications[i].hasOwnProperty("code")) {
    buttoncont.append($('<a>', {href: publications[i].code, text: "Code"}));
    buttoncont.append(" ");
  }
  if (publications[i].hasOwnProperty("docs")) {
    buttoncont.append($('<a>', {href: publications[i].docs, text: "Docs"}));
    buttoncont.append(" ");
  }
  if (publications[i].hasOwnProperty("doi")) {
    buttoncont.append($('<a>', {href: publications[i].doi, text: "DOI"}));
    buttoncont.append(" ");
  }
  if (publications[i].hasOwnProperty("biorxiv")) {
    buttoncont.append($('<a>', {href: publications[i].biorxiv, text: "View on bioRxiv"}));
    buttoncont.append(" ");
  }
  $("#publications-grid").append(col);
}

for (let i = 0; i < portfolio.length; i++) {
  const col = $('<div>', {class: portfolio[i].type + " item col-sm-6 col-md-4 col-lg-4 mb-4"});
  const worksingle = $('<a>', {href: "work-single.html?id="+i, class: "item-wrap fancybox gallery-box"});
  col.append(worksingle);
  const workinfo = $('<div>', {class: "work-info"});
  worksingle.append(workinfo);
  workinfo.append('<h3>' + portfolio[i].name + "</h3>");
  workinfo.append('<span>' + portfolio[i].type + "</span>");
  worksingle.append($('<img>', {class: "img-fluid", src: portfolio[i].thumb, loading: "lazy"}));
  $("#portfolio-grid").append(col);
}
