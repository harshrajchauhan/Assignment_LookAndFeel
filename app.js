// app.js
 
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
 
// Initialize charts
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
 
// Update charts with new data
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
 
// Initialize the application
displayCourses();
createCharts();