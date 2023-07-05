let isFlying = false;
let isExpanded = false;
var tapCount = 0;

function inflateBalloon(op) {
    if (isFlying) return;

    var balloon = document.getElementById('balloon');

    if (!balloon) {
        balloon = document.createElement('div');
        balloon.id = 'balloon';
        document.body.appendChild(balloon);
    }

    if (tapCount === 0) {
        expandBalloon(balloon);
    } else if (tapCount === 1) { 
        expandBalloon2(balloon);
    }
    else if (tapCount === 2) {
        startFlying(balloon);
    }
    else if (tapCount === 3) {
        createBalloon(balloon);
    } else {
        burstBalloon(balloon);
        tapCount = -1; // Reset tap count to start from 0 again
    }
    
    tapCount++;
}
function createBalloon(balloon1) {
    var balloon1 = document.createElement('img');
    balloon1.className = 'balloon';
    balloon1.style.visibility = 'visible';
    balloon1.addEventListener('click', function () {
        burstBalloon(balloon1);
    });
    tapCount=0;

    // Change the balloon appearance here
    let images = ["./images/Symbol 100010.png", "./images/Symbol 100001.png", "./images/Symbol 100005.png"];
    
    let randomImage = images[Math.floor(Math.random() * images.length)];
    
    if (tapCount === 0) {
        expandBalloon(balloon1);
    } else if (tapCount === 1) { 
        expandBalloon2(balloon1);
    }
    else if (tapCount === 2) {
        startFlying(balloon1);
    }
    else if (tapCount === 3) {
        createBalloon(balloon1);
    } else {
        burstBalloon(balloon1);
        tapCount = -1; // Reset tap count to start from 0 again
    }
    
    tapCount++;
    balloon1.src = randomImage;

    return balloon1;
}

function expandBalloon(balloon) {
    balloon.style.visibility = 'visible';
    balloon.style.transition = 'height 1s, width 1s';
    balloon.style.height = '150px';
    balloon.style.width = '100px';
    balloon.addEventListener('transitionend', function () {
        if (!isExpanded) {
            balloon.style.transition = 'none';
        }
    });
}
function expandBalloon2(balloon) {
    balloon.style.visibility = 'visible';
    balloon.style.transition = 'height 2s, width 2s';
    balloon.style.height = '200px';
    balloon.style.width = '150px';
    balloon.addEventListener('transitionend', function () {
        if (!isExpanded) {
            balloon.style.transition = 'none';
        }
    });
}


function startFlying(balloon) {
    isFlying = true;

    // Randomly position the balloon on the screen
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let randomLeft = Math.random() * (screenWidth - balloon.offsetWidth);
    let randomTop = Math.random() * (screenHeight - balloon.offsetHeight);
    balloon.style.left = `${randomLeft}px`;
    balloon.style.top = `${randomTop}px`;

    // Add event listener to burst the balloon when tapped
    balloon.addEventListener('click', function () {
        burstBalloon(balloon);
    });
}

function burstBalloon(balloon) {
    isFlying = false;
    balloon.removeEventListener('click', function () {
        burstBalloon(balloon);
    });
    balloon.style.animation = 'none';
    balloon.style.height = '0';
    balloon.style.width = '0';
    balloon.style.backgroundColor = 'transparent';
    setTimeout(() => {
        balloon.style.visibility = 'hidden';
        balloon.style.animation = 'fly 3s linear infinite';
        balloon.style.left = 'auto';
        balloon.style.top = 'auto';
        balloon.style.height = '70px';
        balloon.style.width = '50px';
        //create new balloon
        let newBalloon = createBalloon();
        document.body.appendChild(newBalloon);
       let tapCount=0;
      
    }, 2000);
}
