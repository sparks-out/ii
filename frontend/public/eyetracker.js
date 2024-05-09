// Initialize WebGazer
webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    
    var xPrediction = data.x; // X coordinate relative to the viewport
    var yPrediction = data.y; // Y coordinate relative to the viewport
    
    // Scroll up if gaze is near the top of the viewport and within the page boundaries
    if (yPrediction < 50 && window.scrollY > 0 && !isScrolling) {
        scrollUp();
    }
    // Scroll down if gaze is near the bottom of the viewport and within the page boundaries
    else if (yPrediction > (window.innerHeight - 50) && window.scrollY < (document.body.scrollHeight - window.innerHeight) && !isScrolling) {
        scrollDown();
    }
    
    // Get the element currently being gazed upon
    var currentElement = document.elementFromPoint(xPrediction, yPrediction);
    
    // Check if the element is a clickable target and is visible
    if (currentElement && currentElement.tagName === 'BUTTON' && isElementVisible(currentElement)) {
        // Check if the gaze has been on the target for 3 seconds or more
        if (elapsedTime >= 2000) {
            // Trigger a click event on the target
            currentElement.click();
        }
    }
}).begin();

// Flag to prevent continuous scrolling
var isScrolling = false;

// Function to scroll up
function scrollUp() {
    window.scrollBy(0, -5);
    isScrolling = true;
    setTimeout(function() {
        isScrolling = false;
    }, 100); // Adjust the timeout value as needed
}

// Function to scroll down
function scrollDown() {
    window.scrollBy(0, 5);
    isScrolling = true;
    setTimeout(function() {
        isScrolling = false;
    }, 100); // Adjust the timeout value as needed
}

// Function to check if an element is visible within the viewport
function isElementVisible(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
