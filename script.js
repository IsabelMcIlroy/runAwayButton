const runAwayButton = document.getElementById("runAwayButton");
const OFFSET = 100;
const openSound = document.getElementById("openSound");
const runningSound = document.getElementById("runningSound");
const wooshSound = document.getElementById("wooshSound");
window.onload = function () {
  openSound.play();
};

runAwayButton.addEventListener("click", () => {
  alert("Nice Try!");
  window.close();
});

runAwayButton.addEventListener("mousemove", (e) => {
  const x = e.pageX;
  const y = e.pageY;
  const buttonBox = runAwayButton.getBoundingClientRect();
  const horizontalDistanceFrom = distanceFromCenter(
    buttonBox.x,
    x,
    buttonBox.width
  );
  const verticalDistanceFrom = distanceFromCenter(
    buttonBox.y,
    y,
    buttonBox.height
  );
  const horizontalOffeset = buttonBox.width / 2 + OFFSET;
  const verticalOffeset = buttonBox.height / 2 + OFFSET;
  if (
    Math.abs(horizontalDistanceFrom) <= horizontalOffeset &&
    Math.abs(verticalDistanceFrom) <= verticalOffeset
  ) {
    wooshSound.play();
    setButtonPostion(
      buttonBox.x + (horizontalOffeset / horizontalDistanceFrom) * 10,
      buttonBox.y + (verticalOffeset / verticalDistanceFrom) * 10
    );
  }
});

setButtonPostion = (left, top) => {
  const windowBox = document.body.getBoundingClientRect();
  const buttonBox = runAwayButton.getBoundingClientRect();
  if (distanceFromCenter(left, windowBox.left, buttonBox.width) < 0) {
    left = windowBox.right - buttonBox.width - OFFSET;
    runningSound.play();
  }
  if (distanceFromCenter(left, windowBox.right, buttonBox.width) > 0) {
    left = windowBox.left + OFFSET;
    runningSound.play();
  }
  if (distanceFromCenter(top, windowBox.top, buttonBox.height) < 0) {
    top = windowBox.bottom - buttonBox.height - OFFSET;
    runningSound.play();
  }
  if (distanceFromCenter(top, windowBox.bottom, buttonBox.height) > 0) {
    top = windowBox.top + OFFSET;
    runningSound.play();
  }
  runAwayButton.style.left = `${left}px`;
  runAwayButton.style.top = `${top}px`;
};

distanceFromCenter = (boxPosition, mousePosition, boxSize) => {
  return boxPosition - mousePosition + boxSize / 2;
};
