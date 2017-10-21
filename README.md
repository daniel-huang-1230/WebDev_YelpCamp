# Project Overview
 YelpCamp is a extensive project I worked on following the intructions from Udemy course **[Web Developer Bootcamp](https://www.udemy.com/the-web-developer-bootcamp/learn/v4/overview)**, taught by
 Colt Steele. In my current deployed version, I also added quite a few features beyond the part coded in class, including but 
 not limited to **Google Map API**, UI enhancements on Login, Sign Up, and the landing page, dynamic pricing feature, etc. 
 
 
  YelpCamp is designed to work with all modern browsers and serve as a exciting, feature-rich hub for users to share their       experience of campgrounds all over the world. It now supports full user authentication as well as authorization. 

  I coded the application from scratch on **Cloud9** and it has been deployed [here](https://pure-journey-94613.herokuapp.com/) at [Heroku](https://www.heroku.com/). I use [mLab](https://mlab.com/) for the cloud database, which hosts **MongoDB**.
 
 # Setup
  You will need different setups for running YelpCamp locally or on **Cloud9** versus running the app on **Heroku + mLab**.
 
 # Running locally/Cloud9 
  Run the following command in the terminal. Be sure to update information as necessary.(i.e. different name for the DB)
 ```
  export DATABASEURL=mongodb://localhost/yelp_camp
```

 # Heroku + mLab Setup
  Under your own Heroku dashboard, go to Settings, Reveal Config Vars, and then update the KEY and VALUE pair of the variable as:
  **DATABASEURL**, mongodb://<dbuser>:<dbpassword>@ds127105.mlab.com:27105/yelp_camp, respectively. Make sure you plug in
  your own database username and password.
  Alternatively, the setup can also be accomplished remotely through the terminal. Just run the following command: 
   ```
   heroku config:set DATABASEURL='mongodb://<dbuser>:<dbpassword>@ds127105.mlab.com:27105/yelp-camp'
   ```
  
 # Technologies Used
 
 
# To-Dos/Future Features
  1. solve the error handling bugs
  2. add user profile 
  3. add password reset 
  4. admin role
  5. add image upload


# Author

[@Daniel Huang](https://www.linkedin.com/in/daniel-huang-443546115/)
