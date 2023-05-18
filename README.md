<h1><b>Todo App with Google Sign-in</b></h1>

<h3><b>Outline of Usage</b></h3>

Authenticates user using Google sign-in allowing user to access, add, edit or delete saved todo items associated with their userId. Redux Toolkit implemented to make async requests and store the state of the application.

User can only see and edit their todos associated with their userId and all other todos on the API are inaccessible.

<h3><b>How to use app</b></h3>

<b>You need a client ID from Google to use this app. Go <a href="https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid">here</a> and click "Configure a project" after logging in. See below under "Quick Start" where to add the client ID.</b>

<i>You must first start the api in the root directory to use this app (instructions at "Quick Start") </i>

You must be authenticated with Google first before you can add, edit or delete todo items. First log-in with your google account by first pressing the "Sign in with Google" button in the top right.

Once logged in you will have the ability to submit new todos and any todos associated with your userId will automatically generate in the body of the page.

From here you can use the edit and delete icons to the right of your todo text to edit or delete your todo. Once clicked, the edit icon will show a prompt and what you put into the input will change your todo. The delete icon requires a confirmation to delete your todo.

To sign out press the "Sign out" button in the top right.

<h3><b>Quick Start</b></h3>

<ul>
<li>Open your terminal and git clone the repository:

    $ git clone https://github.com/jordanss1/todo-app-react-redux

</li>
    
<li>Navigate to the "todo-app-react-redux/todo-app-react-redux" folder and create a .env file. Add the client ID you gained from Google from the above description into a variable called <b>REACT_APP_ID</b></li>
    


<li> Access the root folder containing the api and the project folder, "cd" into this directory and install the dependencies:

    $ npm install

</li>

<li> Access the "api" folder, "cd" into this directory and start it:

    $ npm start

</li>

<li> Then start the react application in the "todo-app-react-redux" folder

    $ npm start

</li>
</ul>

<h3><b>Technologies Used</b></h3>
<ul>
<li>ReactJS</li>
<li>JavaScript</li>
<li>HTML</li>
<li>Redux Toolkit</li>
<li>CSS</li>
<li>BootStrap</li>
<li>Semantic UI</li>
<li>Axios</li>
<li>API</li>
<li>NPM</li>
</ul>
