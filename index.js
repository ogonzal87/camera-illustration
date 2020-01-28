const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const video = document.querySelector('.player');
const img = document.getElementsByClassName('camaleon-img')
const refreshRate = 500;

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(webCam => {
            video.srcObject = webCam;
            paintToCanvas();
        })
        .catch(err => {
            alert('There was an error connecting with your camera. Try with another browser. Chrome works best 👍🏽', err);
        })
}

function paintToCanvas() {
    canvas.width = 1;
    canvas.height = 1;

    setInterval(updateColor, refreshRate);
}

function updateColor() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    let r = imageData.data[0];
    let g = imageData.data[1];
    let b = imageData.data[2];

    let rgb = `rgb(${r}, ${g}, ${b})`;

    document.documentElement.style.setProperty(`--color-changes`, rgb);
}

function loadApp() {
    img.onload = () => {
        getVideo();
    }
}

window.addEventListener('load', loadApp);
