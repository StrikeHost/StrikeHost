# Strike-Host

A solution for creating and managing game servers for multiplayer games. This is built with React/TypeScript/NestJS.

### How it works

The app is split into three core parts:

- Frontend - the web interface is built around React, using a REST API to start/manage/control the user's servers (instances). When a user views one of their instances, the frontend communicates with the backend using a websocket to ensure a timely flow of data from their instance console. We also plan to allow users to issue commands to their instances in the same way.
- Backend - the backend is built using NestJS, whcih allows us to easily build up a well-structured and easy-to-maintain backend that leverages TypeORM/MySQL for the database. As mentioned above, we use a REST API for the main endpoints, but NestJS also allows us to easily integrate websocket gateways into the project, which allow us to relay time-sensitive information to the user.
- The Agent - the agent is the piece of the system that is installed on the machine where the servers are hosted. This manages the physical starting/stopping/modification of the users' instances. This communicates with the backend via a websocket connection which is established when the agent is first started. Commands are then issued by the backend to the agent, which will relay back information to the backend. If a user is viewing an instance overview, then the agent will start to relay time-sensitive information back to the user, via the backend.

We're also working on the ability to integrate the system with Discord, providing users a way of managing their instances without having to load up a separate website.
