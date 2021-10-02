var { fromEvent } = rxjs;
var { flatMap, takeUntil, map } = rxjs.operators;

var mouseUpStream = fromEvent(document, "mouseup");
var mouseMoveStream = fromEvent(document, "mousemove").pipe(
  takeUntil(mouseUpStream)
);

var mouseDownStream = fromEvent(document, "mousedown").pipe(
  flatMap(function () {
    return mouseMoveStream;
  }),
  map(function (event) {
    return { x: event.clientX, y: event.clientY };
  })
);

var cLabel = document.querySelector("h1");

mouseDownStream.subscribe(function (result) {
  cLabel.textContent = "x: " + result.x + " , y: " + result.y;
});
