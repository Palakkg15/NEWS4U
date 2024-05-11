var newsData = {
    articles: []

};

var currentSlideshowIndex = 0;
var slides = document.querySelectorAll('.slideshow-item');

function showSlideshowImage(index) {
    slides.forEach(function (slide, i) {
        slide.  classList.toggle('active', i === index);
    });

    const imageCaption = document.getElementById('imageCaption' + (index + 1));

    if (newsData.articles[index]) {
        const captionText = newsData.articles[index].description;
        imageCaption.textContent = captionText;
    } else {
        console.error('Invalid data for topic ' + (index + 1));
    }
}

function nextSlideshowImage() {
    currentSlideshowIndex = (currentSlideshowIndex + 1) % slides.length;
    fetchSlideshowImage(currentSlideshowIndex).then(function () {
        showSlideshowImage(currentSlideshowIndex);
    });
}

function startSlideshow() {
    setInterval(function () {
        nextSlideshowImage();
    }, 5000); // Change image every 5 seconds
}

function fetchSlideshowImage(index) {
    const apiKey = "d2e3baa95ed74e9582413a918e5e9f84";
    const apiUrl = 'https://newsapi.org/v2/top-headlines?' +
        'country=in&' +
        'apiKey=' + apiKey;
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.articles[index].urlToImage;
            const imageCaption = document.getElementById('imageCaption' + (index + 1));

            if (imageUrl && imageCaption) {
                newsData.articles[index] = data.articles[index];
                const newsImage = document.getElementById('newsImage' + (index + 1)).src = imageUrl;
                const captionText = data.articles[index].description;
                imageCaption.textContent = captionText;
                loadingSpinner.style.display = 'none';
                showSlideshowImage(index);
            } else {
                console.error('Invalid data for topic ' + (index + 1));
                loadingSpinner.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching image:', error);
            loadingSpinner.style.display = 'none';
        });
}
fetchSlideshowImage(currentSlideshowIndex).then(() => {
    showSlideshowImage(currentSlideshowIndex);
    startSlideshow();
});
function fetchPopularTopics() {
    const apiKey = "d2e3baa95ed74e9582413a918e5e9f84"; // Replace with your NewsAPI.org API key
    const categories = ["technology", "sports", "business"]; // Replace with your desired categories

    const topicBoxes = document.querySelectorAll('.topic-box');
    const fetchPromises = [];

    categories.forEach((category, index) => {
        const apiUrl = `https://newsapi.org/v2/top-headlines?category=${category}&country=in&apiKey=${apiKey}`;
        const fetchPromise = fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const topicBox = topicBoxes[index];
                const imageUrl = data.articles[0].urlToImage;
                const topicName = data.articles[0].title;

                if (imageUrl && topicName && topicBox) {
                    // Create image element
                    const imageElement = document.createElement('img');
                    imageElement.src = imageUrl;
                    imageElement.alt = topicName;

                    // Create heading element
                    const headingElement = document.createElement('h3');
                    headingElement.textContent = topicName;

                    // Clear any existing content in the topicBox and append new elements
                    topicBox.innerHTML = '';
                    topicBox.appendChild(imageElement);
                    topicBox.appendChild(headingElement);
                } else {
                    console.error('Invalid data for category ' + category);
                }
            })
            .catch(error => {
                console.error('Error fetching popular topics:', error);
            });

        fetchPromises.push(fetchPromise);
    });

    // Wait for all fetch requests to complete before moving forward
    return Promise.all(fetchPromises);
}

// Call the function and use .then to perform actions after fetching popular topics
fetchPopularTopics().then(() => {
    // Do something after fetching popular topics, if needed
});
function openSignupModal() {
    document.getElementById('signupModal').style.display = 'flex';
    showSignupStep(1);
}

// Function to close the signup modal
function closeSignupModal() {
    document.getElementById('signupModal').style.display = 'none';
}
// Function to show a specific step in the signup modal
function showSignupStep(step) {
    var signupSteps = document.querySelectorAll('.signup-step');
    signupSteps.forEach(function (stepElement) {
        stepElement.style.display = 'none';
    });

    var currentStepElement = document.getElementById('step' + step);
    if (currentStepElement) {
        currentStepElement.style.display = 'block';
    }
}

// Function to submit the signup form
function submitSignup() {
    closeSignupModal();
}
// Function to open the login modal
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

// Function to close the login modal
function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Function to submit the login form
function submitLogin() {
    closeLoginModal();
}

const fullName = document.getElementById('fullName')
const email = document.getElementById('email')
const password = document.getElementById('password')
const dob = document.getElementById('dob')
const gender = document.getElementById('gender')

// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault();

    // Get form data
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;

    // Prepare form data object
    const formData = {
        fullName,
        email,
        password,
        dob,
        gender
    };

    
}

document.addEventListener('DOMContentLoaded', function() {
    const signupbutton = document.getElementById('signupbutton');
    signupbutton.addEventListener('click', function() {
        window.location.href = 'location.html'; 
    });
});

