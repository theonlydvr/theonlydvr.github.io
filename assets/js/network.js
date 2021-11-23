let network1
let network2

function makeNetwork(xs,ys,pDiv,s,dir,pTerm,N,main,i) {
    let xm=20;
    let xn=xs+dir*(Math.random());
    if (dir<0)
        xn-=xm;
    else
        xn+=xm;
    let yf=randn()*s;
    let yn=0;
    if (yf<0)
        yn=yf+ys-xm;
    else
        yn=yf+ys+xm;

    if ((Math.random()<pTerm && i!=1 && !main) || i==N)
        return [[xs,ys]];
    else {
        let pts=[[xs,ys]].concat(makeNetwork(xn,yn,pDiv,s,dir,pTerm,N,main,i+1));
        while (Math.random()<pDiv) {
            let xf=randn()*s;
            let yf=randn()*s;
            if (yf<0)
                yn=yf+ys-xm;
            else
                yn=yf+ys+xm;
            if (xf<0)
                xn=xf+xs-xm;
            else
                xn=xf+xs+xm;
            pts=pts.concat(makeNetwork(xn,yn,pDiv,s,dir,pTerm,N,false,i+1));
        }
        return pts
    }
}

function createNetwork() {
  let xs=800;
  let ys=200;
  let pDiv=0.8;
  let pTerm=0.8;
  let s=20;
  let X=[];
  let Y=[];
  let dir=80;
  let N=15;
  let pts = makeNetwork(xs,ys,pDiv,s,dir,pTerm,N,true,1);
  pts = pts.concat(makeNetwork(xs,ys,pDiv,s,-dir,pTerm,N,true,1));
  let g = new jsgraphs.WeightedGraph(pts.length);
  for (i=0;i<pts.length;i++) {
    for (j=0;j<pts.length;j++) {
      if (i!=j) {
        g.addEdge(new jsgraphs.Edge(i,j,Math.sqrt(Math.pow(pts[i][0]-pts[j][0],2)+Math.pow(pts[i][1]-pts[j][1],2))));
      }
    }
  }
  let kruskal = new jsgraphs.KruskalMST(g);

  let mst = kruskal.mst;
  let counts = new Array(pts.length).fill(0);
  for (i=0;i<mst.length;i++) {
    counts[mst[i].v]++;
    counts[mst[i].w]++;
  }
  let maxCon=counts.reduce(function(a, b) {
      return Math.max(a, b);
  }, 0);
  let sortedInds=Array.from(Array(counts.length).keys())
                  .sort((a, b) => counts[a] < counts[b] ? -1 : (counts[b] < counts[a]) | 0)
  return {
    pts: pts,
    mst: mst,
    counts: counts,
    maxCon: maxCon,
    sortedInds: sortedInds
  }
}

function setup() {
  let canvas = createCanvas($(window).width(), $('.custom-navmenu').height()-30);
  canvas.style('display', 'block');
  canvas.style('position', 'absolute');
  canvas.style('top',0)
  canvas.style('left',0)
  canvas.style('z-index',-1)
  canvas.parent("main-navbar")
  network1 = createNetwork()
  network2 = createNetwork()
}

function windowResized() {
  console.log($('.custom-navmenu').height())
  resizeCanvas($(window).width(), $('.custom-navmenu').height());
}

function draw() {
  background(13,30,45);
  const sf=0.05;
  stroke(color(100,100,100))
  fill(color(100,100,100))
  for (i=0;i<network1.pts.length;i++) {
    network1.pts[i][0]+=sf*randn();
    network1.pts[i][1]+=sf*randn();
  }
  for (i=0;i<network1.mst.length;i++) {
    line(network1.pts[network1.mst[i].v][0],network1.pts[network1.mst[i].v][1],network1.pts[network1.mst[i].w][0],network1.pts[network1.mst[i].w][1])
  }
  network1.sortedInds.forEach(i => circle(network1.pts[i][0],network1.pts[i][1],10*network1.counts[i]/network1.maxCon));
  stroke(color(255,255,255))
  fill(color(255,255,255))
  for (i=0;i<network2.pts.length;i++) {
    network2.pts[i][0]+=sf*randn();
    network2.pts[i][1]+=sf*randn();
  }
  for (i=0;i<network2.mst.length;i++) {
    line(network2.pts[network2.mst[i].v][0],network2.pts[network2.mst[i].v][1],network2.pts[network2.mst[i].w][0],network2.pts[network2.mst[i].w][1])
  }
  network2.sortedInds.forEach(i => circle(network2.pts[i][0],network2.pts[i][1],10*network2.counts[i]/network2.maxCon));
}

function randn() {
  return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random())
}
