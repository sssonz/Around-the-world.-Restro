/*document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelectorAll('bt');
  const sections = document.querySelectorAll('div[class^="section"]');
  function showSection(sectionToShow) {
    sections.forEach(section => {
      if (section.classList.contains(sectionToShow)) {
          section.classList.remove('sectionnone');
      } else {
          section.classList.add('sectionnone');
      }
    });
  }
  button.forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('bt')) {
          showSection('sectionsecond');
        }
    });
  });
});*/

document.addEventListener("DOMContentLoaded", function () {
  let drag_elements = document.querySelectorAll(".img_drag_1, .img_drag_2, .img_drag_3, .img_drag_4, .img_drag_5, .img_drag_6");
  drag_elements.forEach(function (element) {
    let isDragging = false;  
    let offsetX, offsetY;  
  element.addEventListener("mousedown", function (event) {
    isDragging = true;    
    offsetX = event.clientX - element.getBoundingClientRect().left;
    offsetY = event.clientY - element.getBoundingClientRect().top;
    function onMouseMove(event) {
      if (isDragging) {
        let x = event.clientX - offsetX;
        let y = event.clientY - offsetY;
        element.style.left = x + "px";
        element.style.top = y + "px";
        console.log("Координаты курсора:", event.clientX, event.clientY);
        console.log("Координаты элемента:", x, y);
      }
    }
    function onMouseUp() {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  });
});
  