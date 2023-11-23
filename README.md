# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

I want to build a website and app that has 11 questions on it that you answer daily. Once answered it saves the results with a time and date stamp and shares them with other members of the site that are part of your group. it also has the option to send them to individual emails and text their phone.

Things that must be on the website and app:
Must be a full-stack app.
The homepage has 11 questions with boxes to answer them. These can be answered without logging in with the option to copy all 11 questions with their answers.
The same homepage for users that are logged in but with additional functionality that can send their answers to their friends with just a click through email, text, or an internal text system.
Time and date stamps are attached to all 11 questions and answers.
Login for users.
Ability to make groups with other users.
Ability to have friends.
Ability to block users.
A separate page that shares recent answers to all 11 questions anonymously that people can reply to anonymously.
Have the option for each user to display their phone number and email.
A page for each user that can edit their profile and a toggle to make you anonymous to all other users.
backend server to store data
The 11 questions:
When we retire at night we constructively review our day. Was I resentful today? (Check box with yes or no.)
Was I selfish today? (Check box with yes or no.)
Was I dishonest today? (Check box with yes or no.)
Was I afraid? (Check box with yes or no.)
Do I owe an apology? (Check box with yes or no.)
Have I kept something to myself which should be discussed with another person at once? (Check box with yes or no.)
Was I kind and loving toward all? (Check box with yes or no.)
What could I have done better?
Was I thinking of myself most of the time?
Did I think of what I could do for others?
What could I pack into the stream of life?

Minimum viable project.
Frontend: React (vite)
Zustand or Redux Toolkit
Toastify for notifications/alerts
More presentable
Light and dark mode
Backend: Node.JS, Express, and Mongoose
API calls? maybe
Create users
Authentication, OAuth, FireBase or JWT
Data Base: Atlas MongoDB.
Stores:
Email
Password or token
First Name
Last Name
Phone #
Anonymous Flag
State
City
AA Flag
CA Flag
NA Flag
Home Group (stretch look for api for this)
Question answers
Date
Response
Responses to Response (stretch)
Gratitudes (stretch)
Date
Responses: 5 optional.
Spot Inventories (stretch) (review this format before I make it.)
Date
Resentment (optional)
I am resentful at:
The cause it:
Affects my: (Options: fear, self-esteem, security, personal relations, sex relations and pride.
My part:
Fear (optional)
I am fearful of:
Why do I have the fear:
Affects my: (Options: fear, self-esteem, security, personal relations, sex relations and pride.
My part:
Harm (optional)
Who did I harm:
What did I do:
Affects my: (Options: fear, self-esteem, security, personal relations, sex relations and pride.
My part:
Relationship (optional)
Who did I harm:
What did I do:
Affects my: (Options: fear, self-esteem, security, personal relations, sex relations and pride.
My part:
Journal
Date:
Topic:
Text:

Dependencies:
FrontEnd:
React
React Dom
React Router
Dotenv
Dev:
Vite
EsLint
Backend:
Express
Mongoose
MongoDB
Cookie Parser
Cors
Dev:
Nodemon

Objective:
Build a website a community can use to make things easier. (revise)

Procedures:
Plan in Google Docs and Excalidraw.
Look into authentication with FireBase, OAuth or jwt.
Create a react app using Vite.
Set up components that are needed.
Set up the non logged in version
Set up the db schema
Code backend
Code frontend.
Set up logged in features and start adding additional features.
CSS or look into other options
Look into AWS
Deploy

Routes:
/
/login
/account
/anonymous11
/uponawakening
/sobercalculator
/gratitude
/prayers (stretch)
/spotinventory (stretch)
/conversations (stretch)
/conversations/[threadID] (stretch)
/dailyreflection (stretch API needed or lots of typing)

Components:
Main
Header
Header Account
Navbar
Footer
11 Questions Form
Account Modal
Register
Login
Account/Profile
Anonymous 11
Anonymous 11 Response Modal
Upon Awakening (come back to)
Sober Calculator (come back to)
—-------------------
(Stretch)
10th Step stuff (come back to)
Gratitude (come back to)
Journal (come back to)
Prayers (come back to)
Conversation List
Conversation

Project Reasoning:
Background info:
What problem am we are trying to solve:
What is the solution:
What are the details, stack, architecture: Frontend, React with Vite. and for the Backend, Node.JS, express and mongoose. For the Database, MongoDB atlas. And we used **\_\_** for authentication
What is the value of this:
Future Features:
