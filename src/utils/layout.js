((global, doc) => {
  let docNode = doc.documentElement,
    resizeEventName = "orientation" in global ? "orientation" : "resize",
    recalcRemHandler = () => {
      let clientWidth = docNode.clientWidth || doc.body.clientWidth;
      if (!clientWidth) {
        return false;
      }
      docNode.style.fontSize = clientWidth / 7.5 + "px";
    };
  if (!doc.addEventListener) {
    return;
  }
  global.addEventListener(resizeEventName, recalcRemHandler, false);
  doc.addEventListener("DOMContentLoaded", recalcRemHandler, false);
})(window, document);
