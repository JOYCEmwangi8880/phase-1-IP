// Execute the following code when the DOM (Document Object Model) has fully loaded.
document.addEventListener('DOMContentLoaded', function () {
  // Define skill buttons and their corresponding API endpoints
  const skillButtons = document.querySelectorAll('.skill-button'); // Get all elements with class 'skill-button'
  const skillEndpoints = {
    Deception: '/api/skills/deception',
    Intimidation: '/api/skills/intimidation',
    Performance: '/api/skills/performance',
    Persuasion: '/api/skills/persuasion'
  };

  // Store like counts and comments for each skill
  const likeCounts = {
    Deception: 0,
    Intimidation: 0,
    Performance: 0,
    Persuasion: 0
  };

  const comments = {
    Deception: [],
    Intimidation: [],
    Performance: [],
    Persuasion: []
  };

  // Event listener for the "like" button
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach(button => {
    // Add a click event listener to each "like" button
    button.addEventListener('click', () => {
      const skillName = button.getAttribute('data-skill'); // Get the skill name from the data-skill attribute
      const likeCount = button.nextElementSibling; // Get the like count span element
      likeCounts[skillName]++; // Increment the like count
      likeCount.textContent = likeCounts[skillName]; // Update the displayed like count
    });
  });

  // Event listener for comment submission
  const commentSubmitButtons = document.querySelectorAll('.comment-submit');
  commentSubmitButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Capture the skill name from the button's data-skill attribute
      const skillName = button.getAttribute('data-skill');
      const commentInput = button.previousElementSibling; // Get the comment input field
      const commentText = commentInput.value; // Capture the comment text
      comments[skillName].push(commentText); // Store the comment in the corresponding skill's comments array
      commentInput.value = ''; // Clear the input field

      // Log the comment to the console (You can modify this part to display comments in the UI)
      // console.log(`Comment for ${skillName}: ${commentText}`);
    });
  });

  // Function to display comments for a skill
  function displayComments(skillName) {
    const commentsForSkill = comments[skillName];
    const commentsContainer = document.getElementById('comments');
    commentsContainer.innerHTML = ''; // Clear the comments container

    commentsForSkill.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.textContent = comment;
      commentsContainer.appendChild(commentDiv);
    });
  }

  // Add click event listeners to skill buttons
  skillButtons.forEach(button => {
    // Create a container for the skill description
    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('skill-description');
    button.appendChild(descriptionContainer);

    button.addEventListener('click', () => {
      // Get the text content of the skill button (e.g., "Deception")
      const skillName = button.textContent;
      // Get the API endpoint for the clicked skill based on its name
      const skillEndpoint = skillEndpoints[skillName];

      if (skillEndpoint) {
        // Fetch skill description from the API (Placeholder API endpoint)
        fetch(`https://www.dnd5eapi.co${skillEndpoint}`)
          .then(response => response.json()) // Parse the API response as JSON
          .then(data => {
            // Extract the skill description from the API response
            const skillDescription = data.desc[0];

            if (skillDescription) {
              // Update the description container with the skill description
              descriptionContainer.textContent = skillDescription;
            } else {
              // Display a message when the skill description is not found
              descriptionContainer.textContent = 'Skill description not found.';
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } 
    });
  });
});

// Initialize slideIndex and call the showSlides function
let slideIndex = 1;
showSlides(slideIndex);

// Function to move to the next or previous slide
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Function to display the selected slide
function showSlides(n) {
  const slides = document.getElementsByClassName('lesson-slide');

  if (n > slides.length) {
      slideIndex = 1;
  }

  if (n < 1) {
      slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
  }

  slides[slideIndex - 1].style.display = 'block';
}
