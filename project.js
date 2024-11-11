// Combined app.js

// Course data (hardcoded for now)
let courses = [
    { name: 'JavaScript Basics', category: 'Programming', progress: 70 },
    { name: 'Web Design Fundamentals', category: 'Design', progress: 45 },
  ];
  
  // Display courses in list
  function displayCourses() {
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = '';
    courses.forEach((course, index) => {
      courseList.innerHTML += `<li>${course.name} - ${course.category} (${course.progress}% completed) 
  <button onclick="deleteCourse(${index})">Delete</button></li>`;
    });
  }
  
  // Add a new course
  function addCourse() {
    const courseName = document.getElementById('courseName').value;
    const courseCategory = document.getElementById('courseCategory').value;
    if (courseName && courseCategory) {
      courses.push({ name: courseName, category: courseCategory, progress: 0 });
      displayCourses();
      updateCharts();
    }
  }
  
  // Delete a course
  function deleteCourse(index) {
    courses.splice(index, 1);
    displayCourses();
    updateCharts();
  }
  
  // Apply filters
  function applyFilters() {
    const courseName = document.getElementById('course-name').value;
    const category = document.getElementById('category').value;
  
    const filteredCourses = courses.filter(course =>
      (course.name.toLowerCase().includes(courseName.toLowerCase()) || course.category.toLowerCase().includes(category.toLowerCase()))
    );
  
    let courseInfo = '';
    filteredCourses.forEach(course => {
      courseInfo += `
        <div class="course-card">
          <h3>${course.name}</h3>
          <p><strong>Category:</strong> ${course.category}</p>
        </div>
      `;
    });
  
    document.getElementById('course-info').innerHTML = courseInfo;
  }
  
  // Toggle menu
  function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("show");
  }
  
  // Course and Certification Completion
  const courseCompletion = 75;
  const totalCourses = 5;
  const certificationsEarned = 2;
  const totalCertifications = 5;
  const certificationCompletion = (certificationsEarned / totalCertifications) * 100;
  
  // Charts
  let progressChart, completionChart, categoryChart;
  function createCharts() {
    // Progress chart
    const ctxProgress = document.getElementById('progressChart').getContext('2d');
    progressChart = new Chart(ctxProgress, {
      type: 'line',
      data: {
        labels: courses.map(course => course.name),
        datasets: [{
          label: 'Progress',
          data: courses.map(course => course.progress),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      }
    });
  
    // Completion chart
    const ctxCompletion = document.getElementById('completionChart').getContext('2d');
    completionChart = new Chart(ctxCompletion, {
      type: 'bar',
      data: {
        labels: courses.map(course => course.name),
        datasets: [{
          label: 'Completion %',
          data: courses.map(course => course.progress),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      }
    });
  
    // Category chart
    const ctxCategory = document.getElementById('categoryChart').getContext('2d');
    categoryChart = new Chart(ctxCategory, {
      type: 'pie',
      data: {
        labels: [...new Set(courses.map(course => course.category))],
        datasets: [{
          data: [...new Set(courses.map(course => course.category))].map(category =>
            courses.filter(course => course.category === category).length),
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1
        }]
      }
    });
  }
  
  function updateCharts() {
    progressChart.data.labels = courses.map(course => course.name);
    progressChart.data.datasets[0].data = courses.map(course => course.progress);
    progressChart.update();
  
    completionChart.data.labels = courses.map(course => course.name);
    completionChart.data.datasets[0].data = courses.map(course => course.progress);
    completionChart.update();
  
    categoryChart.data.labels = [...new Set(courses.map(course => course.category))];
    categoryChart.data.datasets[0].data = [...new Set(courses.map(course => course.category))].map(category =>
      courses.filter(course => course.category === category).length);
    categoryChart.update();
  }
  
  // Line Chart: Courses Completed Over Time
  const ctxLine = document.getElementById('courseLineChart').getContext('2d');
  new Chart(ctxLine, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [{
        label: 'Courses Completed',
        data: [15, 30, 50, 60, courseCompletion],
        borderColor: 'blue',
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
      },
      scales: {
        x: { title: { display: true, text: 'Months' }},
        y: { title: { display: true, text: 'Courses Completed (%)' }}
      }
    }
  });
  
  // Pie Chart: Certifications Earned
  const ctxPie = document.getElementById('certificationPieChart').getContext('2d');
  new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: ['Python Programming', 'Web Design Fundamentals', 'Data Analysis with R'],
      datasets: [{
        data: [40, 30, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
      },
      cutoutPercentage: 40
    }
  });
  
  // Bar Chart: Courses vs Certifications
  const ctxBar = document.getElementById('courseCertificationBarChart').getContext('2d');
  new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: ['Courses', 'Certifications'],
      datasets: [{
        label: 'Completed (%)',
        data: [courseCompletion, certificationCompletion],
        backgroundColor: ['#4CAF50', '#FFC107']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Percentage (%)' }},
        x: { title: { display: true, text: 'Type' }}
      }
    }
  });
  
  // Initialize the application
  displayCourses();
  createCharts();
  