/**
 * Draggable tree and mountain draggable logic
 */

const dragItems = document.querySelectorAll(".sidebar > .draggable");

const dragStart = (event) => {
  event.dataTransfer.setData("text", event.currentTarget.id);
  event.effectAllowed = "copy";
};

const dragEnd = (event) => {
  event.dataTransfer.clearData();
};

dragItems.forEach((item) => {
  item.setAttribute("draggable", true);
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
});

/**
 * Container drag and drop logic
 */

const ipad = document.querySelector("#ipad");

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
  draggable.removeEventListener("dragstart");
  draggable.removeEventListener("dragend");

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
