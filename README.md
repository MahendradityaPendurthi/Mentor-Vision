# Mentor-Vision
A full-stack web application that allows mentors to manage their mentees and view their competitive programming statistics (from CodeChef).
The platform is designed to streamline mentor-mentee interactions within college coding clubs and improve competitive programming tracking.

🎯 Purpose of the Application

The main purpose of this application is to provide a centralized dashboard where mentors can:

Log in securely using Clerk authentication

Add mentees (students) under their mentorship

Associate each mentee with their CodeChef username

View CodeChef stats such as:

Rating

Stars

Rank

Recent performance

Manage mentee lists (add/remove mentees)

Help mentees improve by tracking their competitive progress

This system simplifies the process of monitoring multiple students’ competitive programming growth and makes mentorship more data-driven and transparent.

🏗️ Tech Stack
🖥️ Frontend

React.js

React Router

Axios

React Query

Chart.js

Styled Components

Clerk (for authentication)

⚙️ Backend

Express.js

MongoDB Atlas

Mongoose

Axios

Clerk SDK

Helmet, CORS, Morgan

Express Validator

Cheerio (for CodeChef web scraping)

🔐 Features
👨‍🏫 Mentor Dashboard

Mentor can log in securely via Clerk Authentication

View all assigned mentees in a clean dashboard interface

🧑‍🎓 Mentee Management

Add mentees by name and CodeChef username

Remove mentees when needed

See a list of all mentees under a mentor

📊 CodeChef Stats Viewer

Fetches and displays real-time CodeChef stats using scraping APIs

Displays:

Current rating

Highest rating

Global & Country rank

Contest performance chart

Provides an overview of the mentee’s recent activity

<img width="1166" height="730" alt="Screenshot 2025-11-10 185009" src="https://github.com/user-attachments/assets/a71d2f69-8531-4e80-815d-5adddd23f43b" />
<img width="1320" height="576" alt="Screenshot 2025-11-10 185059" src="https://github.com/user-attachments/assets/7868ef03-1a4d-49be-8ad7-6d9b7c127a0b" />
<img width="665" height="532" alt="Screenshot 2025-11-10 185419" src="https://github.com/user-attachments/assets/e857f3d3-bb1e-4a45-803a-6ad7cae4fe34" />



💡 Future Enhancements

Integration with Codeforces API

Add performance comparison charts for mentees

Enable email notifications for mentors

Support for multiple mentors per mentee

🚀 Deployment

You can deploy:

Frontend: Vercel or Netlify

Backend: Render, Railway, or Heroku

Database: MongoDB Atlas

After deployment, update the environment variables in both client and server.
