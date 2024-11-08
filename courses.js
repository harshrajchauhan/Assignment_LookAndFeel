// courses.js
function applyFilters() {
  const courseName = document.getElementById('course-name').value;
  const category = document.getElementById('category').value;
 
  const courses = [
    { name: 'Introduction to Programming', category: 'Programming', description: 'Learn the basics of programming with Python and JavaScript.' },
    { name: 'Web Design Fundamentals', category: 'Design', description: 'Master the essentials of web design and user experience.' },
    { name: 'Data Analysis with R', category: 'Data Analysis', description: 'Learn data analysis and visualization using R programming language.' }
  ];
 
  const filteredCourses = courses.filter(course => 
    (course.name.toLowerCase().includes(courseName.toLowerCase()) || course.category.toLowerCase().includes(category.toLowerCase()))
  );
 
  let courseInfo = '';
  filteredCourses.forEach(course => {
    courseInfo += `
<div class="course-card">
<h3>${course.name}</h3>
<p><strong>Category:</strong> ${course.category}</p>
<p>${course.description}</p>
</div>
    `;
  });
 
  document.getElementById('course-info').innerHTML = courseInfo;
}

