// Course data with module details
let courses = [
  { 
      name: 'Data Analysis with R', 
      progress: 65, 
      completionHistory: [10, 25, 40, 55, 65],  // Progress over time (monthly)
      totalProgress: 65,
      modules: { completed: 4, total: 6 }
  },
  { 
      name: 'Python Programming', 
      progress: 80, 
      completionHistory: [20, 35, 50, 65, 80],
      totalProgress: 80,
      modules: { completed: 8, total: 10 }
  },
  { 
      name: 'Web Design Fundamentals', 
      progress: 50, 
      completionHistory: [5, 20, 35, 45, 50], 
      totalProgress: 50,
      modules: { completed: 5, total: 10 }
  }
];

let lineChartInstance = null;
let donutChartInstance = null;
let barChartInstance = null;
let moduleBarChartInstance = null;

// Update progress based on selected course
function updateProgress() {
  const selectedCourse = document.getElementById('courseSelect').value;
  const courseProgressSection = document.getElementById('courseProgress');
  const lineChartContainer = document.getElementById('lineChartContainer');
  const donutChartContainer = document.getElementById('donutChartContainer');
  const barChartContainer = document.getElementById('barChartContainer');

  courseProgressSection.innerHTML = '';
  if (lineChartInstance) lineChartInstance.destroy();
  if (donutChartInstance) donutChartInstance.destroy();
  if (barChartInstance) barChartInstance.destroy();
  if (moduleBarChartInstance) moduleBarChartInstance.destroy();

  if (selectedCourse) {
      const course = courses.find(c => c.name === selectedCourse);

      // Display course-specific progress bar
      courseProgressSection.innerHTML = `
          <div class="progress-bar">
            <label for="courseCompletion">Course Completion:</label>
            <progress id="courseCompletion" value="${course.totalProgress}" max="100"></progress>
            <span>${course.totalProgress}% Completed</span>
          </div>
      `;

      // Display course-specific charts
      createLineChart(course.completionHistory);
      createDonutChart(course.totalProgress);
      createModuleBarChart(course.modules.completed, course.modules.total);
      lineChartContainer.style.display = 'block';
      donutChartContainer.style.display = 'block';
      barChartContainer.style.display = 'block';
  } else {
      // Display overall charts
      createOverallLineChart();
      createOverallBarChart();
      lineChartContainer.style.display = 'block';
      donutChartContainer.style.display = 'none';
      barChartContainer.style.display = 'block';
  }
}

// Line Chart for course or overall courses
function createLineChart(completionHistory) {
  const ctx = document.getElementById('courseLineChart').getContext('2d');
  lineChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
              label: 'Course Progress',
              data: completionHistory,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false
          }]
      },
      options: {
          responsive: true,
          scales: {
              x: { title: { display: true, text: 'Months' }},
              y: { title: { display: true, text: 'Progress (%)' }}
          }
      }
  });
}

// Donut Chart for selected course completion
function createDonutChart(progress) {
  const ctx = document.getElementById('courseDonutChart').getContext('2d');
  donutChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: ['Completed', 'Remaining'],
          datasets: [{
              data: [progress, 100 - progress],
              backgroundColor: ['#4CAF50', '#FFC107']
          }]
      },
      options: {
          responsive: true,
          cutout: '60%'
      }
  });
}

// Bar Chart for modules completed for the selected course
function createModuleBarChart(completedModules, totalModules) {
  const ctx = document.getElementById('courseBarChart').getContext('2d');
  moduleBarChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Modules'],
          datasets: [
              {
                  label: 'Completed Modules',
                  data: [completedModules],
                  backgroundColor: '#4CAF50',
              },
              {
                  label: 'Remaining Modules',
                  data: [totalModules - completedModules],
                  backgroundColor: '#FFC107',
              }
          ]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  title: { display: true, text: 'Modules' }
              }
          }
      }
  });
}

// Overall Line Chart for all courses
function createOverallLineChart() {
  const ctx = document.getElementById('courseLineChart').getContext('2d');
  lineChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: courses.map(course => ({
              label: course.name,
              data: course.completionHistory,
              borderColor: getRandomColor(),
              fill: false
          }))
      },
      options: {
          responsive: true,
          scales: {
              x: { title: { display: true, text: 'Months' }},
              y: { title: { display: true, text: 'Progress (%)' }}
          }
      }
  });
}

// Overall Stacked Bar Chart for course completion percentages
function createOverallBarChart() {
  const ctx = document.getElementById('courseBarChart').getContext('2d');
  barChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: courses.map(course => course.name),
          datasets: [
              {
                  label: 'Completed (%)',
                  data: courses.map(course => course.totalProgress),
                  backgroundColor: '#4CAF50',
              },
              {
                  label: 'Remaining (%)',
                  data: courses.map(course => 100 - course.totalProgress),
                  backgroundColor: '#FFC107',
              }
          ]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  title: { display: true, text: 'Progress (%)' }
              }
          },
          plugins: {
              legend: { position: 'top' }
          }
      }
  });
}

// Generate random color for charts
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Initialize with overall progress if no course is selected
document.addEventListener('DOMContentLoaded', () => {
  updateProgress();
});
