document.addEventListener('DOMContentLoaded', function () {
    // Define skill buttons and their corresponding API endpoints
    const skillButtons = document.querySelectorAll('.skill-button');
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
      button.addEventListener('click', () => {
        const skillName = button.getAttribute('data-skill');
        const likeCount = button.nextElementSibling;
        likeCounts[skillName]++;
        likeCount.textContent = likeCounts[skillName];
      });
    });

    // Event listener for comment submission
    const commentSubmitButtons = document.querySelectorAll('.comment-submit');
    commentSubmitButtons.forEach(button => {
      button.addEventListener('click', () => {
        const skillName = button.getAttribute('data-skill');
        const commentInput = button.previousElementSibling;
        const commentText = commentInput.value;
        comments[skillName].push(commentText);
        commentInput.value = ''; // Clear the input field
        
        // Log the comment to the console
        console.log(`Comment for ${skillName}: ${commentText}`);
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
        const skillName = button.textContent;
        const skillEndpoint = skillEndpoints[skillName];

        if (skillEndpoint) {
          fetch(`https://www.dnd5eapi.co${skillEndpoint}`)
            .then(response => response.json())
            .then(data => {
              const skillDescription = data.desc[0];

              if (skillDescription) {
                descriptionContainer.textContent = skillDescription;
              } else {
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

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

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
