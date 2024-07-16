### Project Report

#### Introduction

This document explains the work done on the advanced `UserProfileCard` component project using Vue.js. The goal was to create a component that can load user data, handle searches, and display user posts, all dynamically.

#### Features Implemented

1. **Loading Data Asynchronously**
    - **Using Vuex**: I added Vuex to manage the state of user details and posts. This means storing information like names, emails, profile pictures, and posts.
    - **Fetching Data from API**: I used the JSONPlaceholder API to get user details and posts. The data is loaded when needed.

2. **Search Functionality**
    - **Search Component**: I built a `UserSearch` component that allows users to type and search for other users.
    - **Filtering Users**: I added methods to filter and show users based on what is typed in the search bar. When a search is done, it also loads the user details and posts dynamically.

3. **Component Creation and Styling**
    - **Post Component**: I made a `UserPost` component to display individual posts.
    - **Using Slots**: I used Vue.js slots in the `UserProfileCard` component to allow customization of how posts are displayed. This makes it easy to change the look and feel.
    - **Styling**: I styled the components to look good and be responsive. I also added loading indicators to show when data is being fetched.

4. **Event Handling**
    - **Toggle Button**: I added a button to show or hide user posts.
    - **Event Emission**: When the toggle button is clicked, it emits an event (`toggle-posts`) to inform the parent component about the action.

#### Installation and Setup

To set up the project locally, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone [<repository-url>](https://github.com/pratibhabarad99/certree-user-profile-card)
    cd certree-user-profile-card
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Run the Application**:
    ```bash
    npm run serve
    ```

#### Usage Instructions

1. **Search Users**: Use the search bar to find users dynamically.
2. **View User Details**: Users List displayed as cards where we can find users details.
3. **Toggle Post Visibility**: Use the toggle button to show or hide posts.

#### Potential Improvements

Even though the project works well, there are some areas for improvement:

1. **Better Styling**: The current CSS and UI work but can be improved to look more modern and appealing.
2. **Error Handling**: Adding better error handling for API requests would make the app more reliable.
3. **Performance**: As the app grows, optimizing performance for larger datasets will be important.
4. **Tests**: Adding tests for components and Vuex actions would help ensure everything works as expected.

#### Conclusion

This project shows how to create an advanced Vue.js component that can load data dynamically, handle searches, and display user posts. Although the CSS and UI are basic, the project is fully functional. By following the setup instructions, you can run the application locally and explore its features. This project is a good example of using Vue.js for more complex tasks.

#### Disclaimer

The CSS and UI design in this project are basic but functional. The main focus was to show how to implement the features. Future improvements can make the visuals better and more user-friendly.
