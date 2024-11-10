# E-learning Course Tracker

## Overview

This project is a static prototype for an interactive, data-driven website designed to help users manage and visualize their progress in various courses. This website allows users to perform CRUD operations on course data, track progress, and view interactive data visualizations using JavaScript charting libraries. The prototype will be enhanced in future assignments by making it dynamic and deploying it on Azure.

## Objectives

- **Primary Objective**: Gain familiarity with web development technologies including HTML, CSS, and JavaScript.
- **Secondary Objective**: Develop user interface design skills and implement basic CRUD functionalities with hardcoded data.

## Features

- **User Interface**: Built with HTML and CSS, featuring a clean, user-friendly layout with master-detail views.
- **CRUD Functions**: Hardcoded Add, Edit, Delete, and Read functionalities for managing courses and progress.
- **Data Visualization**: Interactive charts created with JavaScript libraries for better data insights, including:


## Data Model

The data model includes the following components:

- **Users**: Stores user information, with:
  - One-to-many relationships to **Courses** and **Progress**.
  
- **Courses**: 
  - A list of courses each user is tracking, with a one-to-many relationship to **Progress**.
  
- **Login**:
  - Stores user login details, establishing a one-to-one relationship with **Users**.

- **Certifications**:
  - Lists certifications each user has obtained, connected through a one-to-many relationship with **Users**.

- **Progress**:
  - Tracks completion status for each user’s courses, establishing relationships with both **Users** and **Courses**.

This data model is visualized on the "About Us" page.

## Technologies

- **HTML**: For creating the page structure.
- **CSS**: For styling and layout.
- **JavaScript**: For interactivity and charting.
- **Charting Libraries**: JavaScript libraries for rendering the charts.

