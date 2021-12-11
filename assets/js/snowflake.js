const gS=Math.floor($(window).width()*0.8/2);
const m=Math.ceil(gS/2)-1;
let grid=Array.from({ length: gS }, () => Array.from({ length: gS }, () => 0));
let sym=6; //3-12
let A=Math.PI/sym;
grid[m][m]=1;
let nP=500; //1-10000
let dt=1000*1/30;
let prevT=Date.now();
let ptsX=[0];
let ptsY=[0];
let scale=2;
let dBias=17/100; //0-1
let mScale=1.2;
let nPerCycle=10;
let seed=0;
let seedGen=xmur3(seed)
let arng=mulberry32(seedGen())
let backgroundColor='#0d1e2d'
let pointColor='#ffffff'
let pointAlpha=1;

function updateSliders() {
  $("#diagVal").text($("#diagSlider").val());
  $("#particleVal").text($("#particleSlider").val());
  $("#symVal").text($("#symSlider").val());
  $("#sizeVal").text($("#sizeSlider").val());
  $("#scaleVal").text($("#scaleSlider").val());
  $("#alphaVal").text($("#alphaSlider").val());
}

function updateFromSliders() {
  sym=Number($("#symSlider").val());
  A=Math.PI/sym;
  nP=Number($("#particleSlider").val());
  dBias=Number($("#diagSlider").val())/100;
  mScale=Number($("#scaleSlider").val())/10;
  scale=Number($("#sizeSlider").val());
  backgroundColor=$("#backgroundSelector").val();
  pointColor=$("#pointSelector").val();
  pointAlpha=Number($("#alphaSlider").val())/100;
}

function createSeed(newSeed) {
  if (newSeed) {
    seed=String(Date.now());
  }
  return seed+"-"+sym+"-"+nP+"-"+Math.floor(dBias*100)+"-"+scale+"-"+Math.floor(mScale*10)+"-"+pointColor.substring(1)+"-"+backgroundColor.substring(1)+"-"+Math.floor(pointAlpha*100)
}

function updateFromSeed(seedStr) {
  const params=seedStr.split('-')
  seed = params[0];
  sym = Number(params[1])
  A=Math.PI/sym
  nP = Number(params[2])
  dBias = Number(params[3])/100;
  scale = Number(params[4])
  mScale = Number(params[5])/10
  pointColor = '#'+params[6]
  backgroundColor = '#'+params[7]
  pointAlpha = params[8]/100
  $("#diagSlider").val(dBias*100)
  $("#symSlider").val(sym)
  $("#particleSlider").val(nP)
  $("#sizeSlider").val(scale)
  $("#scaleSlider").val(mScale*10)
  $("#pointSelector").val(pointColor)
  $("#backgroundSelector").val(backgroundColor)
  $("#alphaSlider").val(pointAlpha*100)
}

function initSeed() {
  const url = new URL(window.location.href);
  const seedFull=createSeed(false);
  url.searchParams.set('seed', seedFull);
  window.history.replaceState(null, null, url);
  $('#snowflake-seed').text(url.searchParams.get('seed'))
}

function setup() {
  let canvas = createCanvas($(window).width()*0.8, $(window).height());
  canvas.style('display', 'block');
  canvas.style('position', 'absolute');
  canvas.style('top',0);
  canvas.style('left',0);
  canvas.style('z-index',-1);
  canvas.parent("#snowflake-container");
  const url = new URL(window.location.href);
  if (!url.searchParams.has('seed')) {
    $("#pointSelector").val(pointColor)
    $("#backgroundSelector").val(backgroundColor)
    newSeed();
  } else {
    const url = new URL(window.location.href);
    updateFromSeed(url.searchParams.get('seed'))
    $("#diagSlider").val(dBias*100)
    $("#symSlider").val(sym)
    $("#particleSlider").val(nP)
    $("#sizeSlider").val(scale)
    $("#scaleSlider").val(mScale*10)
    $("#pointSelector").val(pointColor)
    $("#backgroundSelector").val(backgroundColor)
    $("#alphaSlider").val(pointAlpha*100)
    updateSliders()
  }
  reset();
}

function reset() {
  initSeed();
  ptsX=[0];
  ptsY=[0];
  grid=Array.from({ length: gS }, () => Array.from({ length: gS }, () => 0));
  grid[m][m]=1;
  seedGen=xmur3(seed)
  arng=mulberry32(seedGen())
}

function newSeed() {
  updateFromSliders();
  const url = new URL(window.location.href);
  const seedFull=createSeed(true);
  url.searchParams.set('seed', seedFull);
  window.history.replaceState(null, null, url);
}

function draw() {
  bc=hexToRgb(backgroundColor);
  background('rgb('+bc.r+','+bc.g+','+bc.b+')');
  const sf=0.05;
  pc=hexToRgb(pointColor);
  stroke('rgba('+pc.r+','+pc.g+','+pc.b+','+pointAlpha+')')
  fill('rgba('+pc.r+','+pc.g+','+pc.b+','+pointAlpha+')')
  if (Date.now()-prevT>dt && ptsX.length < nP) {
    for (i=1;i<=nPerCycle;i++) {
      let x=gS-2;
      let y=Math.ceil(m-arng()*Math.min(m-1,Math.floor(m*tan(A*dBias))));
      while (grid[y][x+1]+grid[y][x-1]+grid[y+1][x]+grid[y-1][x]<1) {
          a=-((arng()>=0.5)? 1 : 0);
          b=(1+a)*((arng()>=0.5)? 1 : -1);
          while (x+a<m || y+b>m || (m-(y+b))/(x-m+a)>Math.tan(A) || y+b<1) {
            a=-((arng()>=0.5)? 1 : 0);
            b=(1+a)*((arng()>=0.5)? 1 : -1);
          }
          x=x+a;
          y=y+b;
      }
      grid[y][x]=1;
      ptsX=ptsX.concat(x-m);
      ptsY=ptsY.concat(m-y);
    }
    prevT=Date.now();
  }
  for (p=0;p<ptsX.length;p++) {
    let x=scale*ptsX[p];
    let y=scale*ptsY[p];
    for (i=1;i<=sym*2;i++) {
      //console.log(x + " " + y)
      circle(x+$(window).width()*0.8/2,-y+$(window).height()/2,mScale*scale)
      xT=Math.cos(2*A*i)*x+Math.sin(2*A*i)*y;
      y=Math.sin(2*A*i)*x-Math.cos(2*A*i)*y;
      x=xT;
    }
    //sleep(2000);
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

function xmur3(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}
