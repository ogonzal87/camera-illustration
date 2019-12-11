const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const video = document.querySelector('.player');
const refreshRate = 500;

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(webCam => {
            video.srcObject = webCam;
            paintToCanvas();
        })
        .catch(err => {
            console.error('What the hell are you doing...?! you need the cam.... duh 🤪', err);
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
    console.log(imageData);

    let r = imageData.data[0];
    let g = imageData.data[1];
    let b = imageData.data[2];

    let rgb = `rgb(${r}, ${g}, ${b})`;

    document.documentElement.style.setProperty(`--color-changes`, rgb);
}

window.addEventListener('load', getVideo);