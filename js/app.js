/**
 * Draggable tree and mountain draggable logic
 */

const dragItems = document.querySelectorAll(".sidebar > .draggable");
const ipad = document.querySelector("#ipad");

const dragStart = (event) => {
  event.dataTransfer.setData("text", event.currentTarget.id);
  event.effectAllowed = "copy";
};

const dragEnd = (event) => {
  event.dataTransfer.clearData();
};

/**
 * Global touch variables
 */

let xOrigin, yOrigin, xCurrent, yCurrent, dragItem, xOffset, yOffset;

const setItemPosition = (x, y, element) => {
  element.style.position = "absolute";
  element.style.left = x + "px";
  element.style.top = y + "px";
};

const checkBoundingBox = (xCurrent, yCurrent, target) => {
  const { x, y, width, height } = target.getBoundingClientRect();
  return (
    xCurrent >= x &&
    xCurrent <= x + width &&
    yCurrent >= y &&
    yCurrent <= y + height
  );
};

const getDragCenter = () => {
  return {
    x: xCurrent - xOffset,
    y: yCurrent - yOffset,
  };
};

const touchStart = (event) => {
  dragItem = event.currentTarget.cloneNode(true);
  document.querySelector(".sidebar").appendChild(dragItem);

  xOrigin = event.clientX;
  yOrigin = event.clientY;

  xOffset = dragItem.offsetWidth / 2;
  yOffset = dragItem.offsetHeight / 2;

  setItemPosition(xOrigin - xOffset, yOrigin - yOffset, dragItem);
};

const touchMove = (event) => {
  xCurrent = event.touches[0].clientX;
  yCurrent = event.touches[0].clientY;

  const { x: xCurrentCenter, y: yCurrentCenter } = getDragCenter();
  setItemPosition(xCurrentCenter, yCurrentCenter, dragItem);
  dragItem.style.opacity = "0.55";
};

const touchEnd = (event) => {
  if (checkBoundingBox(xCurrent, yCurrent, ipad)) {
    ipad.appendChild(dragItem);

    const { x: xCurrentCenter, y: yCurrentCenter } = getDragCenter();
    const { x, y } = ipad.getBoundingClientRect();

    setItemPosition(xCurrentCenter - x, yCurrentCenter - y, dragItem);

    dragItem.style.opacity = "1";
  } else {
    dragItem.remove();
  }
};

dragItems.forEach((item) => {
  item.setAttribute("draggable", true);
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);

  item.addEventListener("touchstart", touchStart);
  item.addEventListener("touchmove", touchMove);
  item.addEventListener("touchend", touchEnd);
});

/**
 * Container drag and drop logic
 */

const dragOver = (event) => {
  event.preventDefault();
  event.currentTarget.classList.add("drag-over");
};

const dragLeave = (event) => {
  event.preventDefault();
  event.currentTarget.classList.remove("drag-over");
};

const drop = (event) => {
  event.preventDefault();

  const id = event.dataTransfer.getData("text");
  let draggable = document.getElementById(id);

  if (draggable == null) {
    return;
  }
  draggable = draggable.cloneNode(true);

  draggable.id = "icon-" + event.currentTarget.childElementCount + 1;
  draggable.removeAttribute("draggable");

  const rect = ipad.getBoundingClientRect();

  const centerOffset = 50;
  const xCoord = event.clientX - rect.x - centerOffset;
  const yCoord = event.clientY - rect.y - centerOffset;

  let inlineStyle = "position: absolute;";
  inlineStyle += "left: " + xCoord + "px;";
  inlineStyle += "top: " + yCoord + "px;";
  draggable.style = inlineStyle;

  event.currentTarget.appendChild(draggable);
  event.currentTarget.classList.remove("drag-over");
};

ipad.addEventListener("dragover", dragOver);
ipad.addEventListener("dragleave", dragLeave);
ipad.addEventListener("drop", drop);
