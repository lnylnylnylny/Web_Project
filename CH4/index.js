document.addEventListener("DOMContentLoaded", () => {
    const listStyleChangeStartY = 373;
    const listStyleChangeEndY = 1585;
    const listItems = document.querySelectorAll('.list-item');
    const division = (listStyleChangeEndY - listStyleChangeStartY) / listItems.length;
    const panel1Img = document.getElementById('panel1-img');
    const flyingSantaImg = document.getElementById('flying-santa-img');
    const videoPlayBack = 500;
    const videoElement = document.getElementById('video');
    const videoSection = document.getElementById('video-section');
    const fixedWrapper = document.getElementById('fixed-wrapper');
    const fixedDescription = document.getElementById("fixed-description");
    const fixedDescriptionAppearTiming = 3470;
    const fixedDescriptionAppearEnds = 3800;

    function centerElement(elementId, video) {
        const element = document.getElementById(elementId);
        const parent = element.parentElement;

        if(window.scrollY > parent.offsetTop - ((document.documentElement.clientHeight - element.offsetHeight) / 2)) {
            element.style.position = "fixed";
            element.style.top = "50%";
            element.style.left = "50%";
            element.style.transform = "translate(-50%, -50%)";

            if(video) video.currentTime = (window.scrollY - videoSection.offsetTop) / videoPlayBack;
        } else {
            element.style.position = "relative";
            element.style.top = "initial";
            element.style.left = "initial";
            element.style.transform = "initial";
        }
    }

    videoElement.addEventListener("loadedmetadata", () => {
        document.getElementById("video-section").style.height = videoElement.duration * videoPlayBack + "px"; 
    });

    window.addEventListener("scroll", () => {
        if (document.getElementById("on")) document.getElementById("on").removeAttribute("id");

        if (window.scrollY > listStyleChangeStartY && window.scrollY < listStyleChangeEndY) {
            const targetIndex = Math.round((window.scrollY - listStyleChangeStartY) / division);
            if (listItems[targetIndex]) listItems[targetIndex].id = "on";
        }

        const scrollYBottom = window.scrollY + document.documentElement.clientHeight;

        if (scrollYBottom > panel1Img.offsetTop && scrollYBottom < panel1Img.offsetTop + panel1Img.offsetHeight) {
            const translateX = 80 - 80 * 1.3 * (scrollYBottom - panel1Img.offsetTop) / (panel1Img.offsetHeight + 100);
            const translateY = -13 + 13 * (scrollYBottom - panel1Img.offsetTop) / (panel1Img.offsetHeight + 100);
            const rotationDegree = 23 - 23 * 1.7 * (scrollYBottom - panel1Img.offsetTop) / (panel1Img.offsetHeight + 100);

            flyingSantaImg.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotationDegree}deg)`;
        }

        centerElement("fixed-wrapper", videoElement);

        if (window.scrollY > videoSection.offsetTop + videoSection.offsetHeight - (fixedWrapper.offsetHeight + (document.documentElement.clientHeight - fixedWrapper.offsetHeight) / 2)) {
            fixedWrapper.style.position = "relative";
            fixedWrapper.style.top = "initial";
            fixedWrapper.style.left = "initial";
            fixedWrapper.style.transform = `translateY(${videoSection.offsetHeight - fixedWrapper.offsetHeight}px)`;
        }

        if(window.scrollY > fixedDescriptionAppearTiming && window.scrollY < fixedDescriptionAppearEnds) {
            fixedDescription.style.transform = `translateY(${fixedDescriptionAppearEnds - window.scrollY}px)`;
            fixedDescription.style.opacity = (window.scrollY - fixedDescriptionAppearTiming) / 300;
        } else if (window.scrollY > fixedDescriptionAppearEnds) {
            fixedDescription.style.transform = "translateY(0px)";
            fixedDescription.style.opacity = 1;
        } else {
            fixedDescription.style.transform = "translateY(100px)";
            fixedDescription.style.opacity = 0;
        }

        centerElement("bank-beyond");
    });

    let currentImg = 0;
    const sliderImages = document.querySelectorAll('.slider-image');
    const sliderIndex = document.getElementById('slider-index');
    const sliderContentWrapper = document.getElementById("slider-content-wrapper");

    const handleSlideChange = (step) => {
        currentImg += step;
        if (currentImg < 0) {
            currentImg = sliderImages.length - 1;
        } else if (currentImg >= sliderImages.length) {
            currentImg = 0;
        }
        sliderContentWrapper.scrollLeft = sliderImages[currentImg].offsetLeft;
    };

    document.getElementById("left-button").addEventListener("click", () => {
        handleSlideChange(-1);
    });
    document.getElementById("right-button").addEventListener("click", () => {
        handleSlideChange(1);
    });

    sliderContentWrapper.addEventListener("scroll", () => {
        const imageWidth = sliderImages[0].offsetWidth;
        currentImg = Math.round(sliderContentWrapper.scrollLeft / imageWidth);
        sliderIndex.innerText = `${currentImg + 1} / ${sliderImages.length}`;
    });
});
