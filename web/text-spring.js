const letters = document.querySelectorAll("#spread h1"); // enter the elements which should have the spring effect on hover
const springConfig = { tension: 0.07, friction: 0.2 };
const letterStates = letters.length;
const velocities = new Array(letterStates).fill(0).map(() => ({ x: 0, y: 0 }));
const positions = new Array(letterStates).fill(0).map(() => ({ x: 0, y: 0 }));
const targetPositions = new Array(letterStates)
  .fill(0)
  .map(() => ({ x: 0, y: 0 }));
let animationFrameId = null;
function updateSpringPhysics() {
  let stillMoving = false;
  letters.forEach((_, i) => {
    const dx = targetPositions[i].x - positions[i].x;
    const dy = targetPositions[i].y - positions[i].y;
    const fx =
      springConfig.tension * dx - springConfig.friction * velocities[i].x;
    const fy =
      springConfig.tension * dy - springConfig.friction * velocities[i].y;
    velocities[i].x += fx;
    velocities[i].y += fy;
    positions[i].x += velocities[i].x;
    positions[i].y += velocities[i].y;
    letters[
      i
    ].style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
    if (Math.abs(velocities[i].x) > 0.01 || Math.abs(velocities[i].y) > 0.01)
      stillMoving = true;
  });
  if (stillMoving) {
    animationFrameId = requestAnimationFrame(updateSpringPhysics);
  } else {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}
const spreadElement = document.getElementById("spread");
spreadElement.addEventListener("mouseenter", () => {
  letters.forEach((_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 8 + Math.random() * 5;
    targetPositions[i].x = Math.cos(angle) * distance;
    targetPositions[i].y = Math.sin(angle) * distance;
    velocities[i].x = (Math.random() - 0.5) * 2;
    velocities[i].y = (Math.random() - 0.5) * 2;
  });
  if (!animationFrameId) updateSpringPhysics();
});
spreadElement.addEventListener("mouseleave", () => {
  letters.forEach((_, i) => {
    targetPositions[i].x = 0;
    targetPositions[i].y = 0;
    velocities[i].x = (Math.random() - 0.5) * 1;
    velocities[i].y = (Math.random() - 0.5) * 1;
  });
  if (!animationFrameId) updateSpringPhysics();
});
