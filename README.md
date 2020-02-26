
# Interview Scheduler 

Using the latest tools and techniques, this project builds and tests a React application that allows users to book and cancel interviews, which combines a concise API with a WebSocket server to build a realtime experience.
**Voila!** 

When the page is requested by a user, axios delivers persisted data in the form of available (or booked!) appointment spots for each day. The list of day can be easily navigated by touch or click, which will display the days specific availability -- sneak peak below if patience is null. When an appointment is booked, the webSocket will adjust all connect users to reflect your cool new appointment! 

## Powered by

<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://github.com/kabica/scheduler/blob/master/img/node.png?raw=true" alt="Logo" width="60" height="60">
    <img src="https://github.com/kabica/scheduler/blob/master/img/axis.png?raw=true" alt="Logo" width="160" height="50">
    <img src="https://github.com/kabica/scheduler/blob/master/img/reactL.png?raw=true" alt="Logo" width="160" height="50">
    <img src="https://github.com/kabica/scheduler/blob/master/img/storybook.png?raw=true" alt="Logo" width="220" height="50">
    <img src="https://github.com/kabica/scheduler/blob/master/img/webpack.png?raw=true" alt="Logo" width="85" height="80">
  </a>
</p>


## Technical Specifications

- [x] NodeJS + React
- [x] Webpack + Babel
- [x] Axios + Websockets
- [x] Storybook + Webpack Dev Server
- [x] Jest + Testing Library 
- [x] Cypress Web Testing




## Dependencies

    ✖️ axios ^0.19.2
    ✖️ classnames ^2.2.6
    ✖️ normalize.css ^8.0.1
    ✖️ react ^16.9.0
    ✖️ react-dom ^16.9.0
    ✖️ react-scripts 3.0.0


## Sneak-Peak
<p align="center">
  <a href="https://github.com/kabica/scheduler">
    <img src="https://github.com/kabica/scheduler/blob/master/img/1.png?raw=true" alt="">
    <img src="https://github.com/kabica/scheduler/blob/master/img/2.png?raw=true" alt="">
  
  </a>
</p>


# Getting Started

- Install all dependencies (using the `npm install` command).
- Launch React app (using `npm start`) and API server for persisted schedule data
- See below for further deatils :) 


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
