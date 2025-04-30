// script.js
let students = [];

document.addEventListener('DOMContentLoaded', () => {
  // Fetch student data from students.json
  fetch('students.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load student data');
      }
      return response.json();
    })
    .then(data => {
      students = data;
    })
    .catch(error => {
      console.error('Error loading students:', error);
      document.querySelector('.container').innerHTML = `<p style="text-align:center; color:#444;">Error loading data.</p>`;
    });

  // Get DOM elements
  const searchInput = document.querySelector('input[type="text"]');
  const searchButton = document.querySelector('button');
  const studentList = document.querySelector('.container');

  // Handle search
  function handleCheck() {
    const query = searchInput.value.toUpperCase().trim();
    const student = students.find(s => s.name.toUpperCase() === query);
    studentList.innerHTML = '';

    const loading = document.createElement('div');
    loading.className = 'loader';
    studentList.appendChild(loading);

    setTimeout(() => {
      studentList.innerHTML = '';
      if (student) {
        let scoreClass = 'red'; // Default for scores < 78
        let congratsMessage = ''; // Default: no message
        if (student.score >= 85) {
          scoreClass = 'gold'; // Scores 85-100
          congratsMessage = '<span class="congrats">Congratulations!</span>'; // Add message
        } else if (student.score >= 78) {
          scoreClass = 'blue'; // Scores 78-84
        }

        studentList.innerHTML = `
          <div class="student-card">
            <span class="score ${scoreClass}">${student.score}</span>
            <span class="name">${student.name}</span>
            ${congratsMessage}
          </div>
        `;
        searchInput.value = ''; // Clear the textbox
      } else {
        studentList.innerHTML = `<p style="text-align:center; color:#444;">Nama tidak ditemukan.</p>`;
        searchInput.value = ''; // Clear the textbox
      }
    }, 1500);
  }

  // Event listeners
  searchButton.addEventListener('click', handleCheck);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  });
});
