FlatIron P4 Project 

-> Application Name: Builder Exchange

-> Description: Create a front and back end using React and Rails to produce a full web application.  The purpose of the application is to allow users to create, 
    read, update, and delete punch items, as well as see all projects they currently have active tasks on. Users can create accounts and will have authorizations and authentications to ensure only they have access to their data.


-> Installation:
  1. bundle install
  2. npm install --prefix client

-> Database Preperation:
  1. rails db:drop
  2. rails db:create
  3. rails db:migrate

-> Seeds
  1. Uncomment out desired lines in seeds.rb
  2. rails db:seed
  
-> Run Application:
  1. rails s
  2. npm start --prefix client

-> Using Application
  1.  Complete user signup
  2.  Before populating any Punch Items, navigate to Projects and create at least one project
  3.  User can then go back to Punch Items and create items
  4.  Active items can be updated and deleted by the user only
  5.  Projects show user all projects their items are associated with


-> Goals
  1. Use Rails backend with a React front end
  2. Proper RESTful routing
  3. Use authentication to persist sessions
  4. Include pertinent models for:
    a. one many-to-many
    b. join table
    c. implement associations
  5. Seperation of Concerns -> backend does work, frontend is show
  6. Full CRUD on a model
  7. Client side routing
  8. Implement authentication/authorization


-> Challenges
  1. Ensuring that updates will work with missing data in both database and state
  2. Filtering duplicates of contractors with many punch items to one project
  3. Finding multiple conditions that work for render changes without getting lost in loops
  4. Ability to show pertinent errors to the user


-> Contact/Support: michael.w.kolb@gmail.com

-> Roadmap: 
  1. Build metrics for early or overdue projects
  2. Additional project views  

-> Authors and Acknowledgment: A big thank you to the FlatIron School and even more so to all the contributors and authors for their hard work on the tools and libraries required for the production of this application!

-> License: Refer to any pertinent attached files

-> Project Status: Development