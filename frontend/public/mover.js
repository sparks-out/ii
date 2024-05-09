// JavaScript code for moving the pointer and triggering clicks with keyboard inputs

// Initialize pointer position
var pointerX = window.innerWidth / 2;
var pointerY = window.innerHeight / 2;

// Function to move the pointer
function movePointer(dx, dy) {
    pointerX += dx;
    pointerY += dy;
    document.querySelector('.pointer').style.left = pointerX + 'px';
    document.querySelector('.pointer').style.top = pointerY + 'px';
}

// Function to trigger a click event
function clickElement(element) {
    element.click();
}

// Function to handle keyboard input
document.addEventListener('keydown', function(event) {
    
    var currentElement = document.elementFromPoint(pointerX, pointerY);
    if (event.key === 'Enter' && currentElement) {
        clickElement(currentElement);
    } else {
        switch (event.key) {
            case 'ArrowUp':
                movePointer(0, -10);
                break;
            case 'ArrowDown':
                movePointer(0, 10);
                break;
            case 'ArrowLeft':
                movePointer(-10, 0);
                break;
            case 'ArrowRight':
                movePointer(10, 0);
                break;
        }
    }
});
