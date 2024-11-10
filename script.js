// Course and Certification Completion
const courseCompletion = 75;  // 75% completion
const totalCourses = 5;  // Assume total number of courses
const certificationsEarned = 2;  // Assume 2 certifications earned
const totalCertifications = 5;  // Total certifications to be earned
const certificationCompletion = (certificationsEarned / totalCertifications) * 100;  // Certification completion percentage

// Line Chart: Courses Completed Over Time (Achieving 75% completion)
const ctxLine = document.getElementById('courseLineChart').getContext('2d');
new Chart(ctxLine, {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May'],  // Monthly progress
    datasets: [{
      label: 'Courses Completed',
      data: [15, 30, 50, 60, courseCompletion],  // Distribute the 75% completion over the months
      borderColor: 'blue',
      fill: false,
      tension: 0.1 // Smooth line
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
    labels: ['Python Programming', 'Web Design Fundamentals', 'Data Analysis with R'], // Example certifications
    datasets: [{
      data: [40, 30, 30],  // Certification completion percentages (40% for Python, 30% for others)
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      datalabels: {
        display: true,
        formatter: (value) => `${value}%`,  // Show percentage on the chart
        color: '#fff',
        font: { weight: 'bold' }
      }
    },
    cutoutPercentage: 40,  // Makes the center hole smaller but keeps it as a full pie
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
      data: [courseCompletion, certificationCompletion],  // Use the completion percentages
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
