# Daug mobile app

This repo is the mobile app for Daug.

## What's Daug?

**Daug is a social network for pets.**

- Your pets can **sign up or login** using their paws.
- They can **upload selfies** or **post their thoughts** for other pets to see.
- They can also look at **other pets posts** and either **paw** (like) or **scratch** (dislike) it.

### [Demo - Try it on Expo](https://exp.host/@thomashzhu/daug-mobile)

## Getting started

```
git clone git@github.com:mobilespace/daug-mobile.git

exp start

exp ios
```

## Assignment #1

### Objectives

- Learn how to build & organize screens in RN
- Learn advanced RN styling and use LinearGradient, Image, Icons & Custom Fonts
- Learn how to use mock data for prototyping UI screens
- Learn how to use NPM libaries such as React Native Elements, Expo & React Native Vector Icons

## Designs

Intro, Login & Sign up screen based on Robinhood App.

Profile screen based on Instagram.

Social feed screen based on Facebook.

### Other design ideas

- [Login screen designs on Pinterest](https://www.pinterest.com/timoa/mobile-ui-logins/?lp=true)
- [Mobile UI on Dribble](https://dribbble.com/search?q=mobile+UI)
- [Instagram UI kit - Sketch file](https://www.sketchappsources.com/free-source/2023-instagram-based-ui-kit-sketch-freebie-resource.html)

### TODO

- [x] Design & build an Intro Screen
  - [x] :star: **Bonus:** Add [Snap Carousel](https://github.com/archriss/react-native-snap-carousel) with [Lottie animations](https://docs.expo.io/versions/latest/sdk/lottie.html) to Intro Screen
- [x] Design & build an Signup Screen
  - [x] :star: **Bonus:** Add buttons to sign up with Facebook & Twitter
- [x] Design & build an Login Screen
  - [x] :star: **Bonus:** Add buttons to login with Facebook & Twitter
- [x] Design & build an Profile Screen
  - [x] :star: **Bonus:** Add the Logout button
- [x] Design & build an Social Feed Screen with [Mock Data](https://raw.githubusercontent.com/mobilespace/daug-mobile/master/app/utils/constants.js?token=AHejrmtQeRKU4ntCxaYLoNiWDlF-kQdKks5am8vHwA%3D%3D)
- [x] Attach screenshots/gif of screens to `README.MD`

### Demo
<br />Intro Screen (with Carousel)
<div style={{display: flex; flex-direction: row}}>
  <img src="screenshots/Assignment-1/Intro_Screen_Slide_1.JPG" width="250" />
  <img src="screenshots/Assignment-1/Intro_Screen_Slide_2.JPG" width="250" />
</div>
<br />Login & Sign up
<div style={{display: flex; flex-direction: row}}>
  <img src="screenshots/Assignment-1/Login_Screen.JPG" width="250" />
  <img src="screenshots/Assignment-1/Sign_Up_Screen.JPG" width="250" />
</div>
<br />Facebook & Twitter Auth
<div style={{display: flex; flex-direction: row}}>
  <img src="screenshots/Assignment-1/Facebook_Auth.JPG" width="250" />
  <img src="screenshots/Assignment-1/Twitter_Auth.JPG" width="250" />
</div>
<br />Social Feed & Profile
<div style={{display: flex; flex-direction: row}}>
  <img src="screenshots/Assignment-1/Social_Feed.JPG" width="250" />
  <img src="screenshots/Assignment-1/Profile_Screen.JPG" width="250" />
</div>

## Assignment #2

### Objectives

- Learn how to build navigation for Daug app using [React Navigation](https://reactnavigation.org/)
- Learn mobile design patterns for navigation & screen layouts
- Learn how to quickly build RN screens and hook them up using navigation

### TODO

- [x] Understand the 3 main navigation patterns for mobile apps:
  - [x] [StackNavigator](https://reactnavigation.org/docs/hello-react-navigation.html#creating-a-stacknavigator)
  - [x] [TabNavigator](https://reactnavigation.org/docs/tab-based-navigation.html)
  - [x] [DrawerNavigator](https://reactnavigation.org/docs/drawer-based-navigation.html)
- [x] Setup a **IntroStack** (using StackNavigator) for the Intro Screen (root), Login Screen (push) & Sign Up Screen (push)
- [x] Setup a **HomeTabs** (using TabNavigator) for the Social Feed Screen (default) and Profile Screen
- [x] Setup a **RootNavigator** (using StackNavigator) with the **IntroStack** & **HomeTabs** with `mode: "modal"`
- [x] Design & build an Edit Profile Screen
- [x] Setup a **ProfileStack** (using StackNavigator) for the Profile Screen (root), Post Details Screen (push) & Edit Profile Screen (modal) with mode: "modal" and custom RNE header component
- [x] Design & build a Post Details Screen
- [x] Design & build a Create Post Screen
- [x] Setup a **SocialStack** (using StackNavigator) for the Social Feed Screen (root), Post Details Screen (push) & Create Post Screen (modal) with mode: "modal" and custom RNE header component
- [x] :star: **Bonus:** Display Posts on ProfileScreen
- [ ] :star: **Bonus:** Setup a **HomeNavigator**(using DrawerNavigator) with the **HomeTabs** (as root) and update **RootNavigator** to use **HomeNavigator** instead of **HomeTabs**
- [x] Add working gif of app to `README.MD`

### Demo
<br />Home Tab and Profile Tab
<div style={{display: flex; flex-direction: row}}>
  <img src="screenshots/Assignment-2/Home_Tab.JPG" width="250" />
  <img src="screenshots/Assignment-2/Profile_Tab.JPG" width="250" />
</div>
<br />Post Detail Screens
<div style={{display: flex; flex-direction: row}}>
  <img src="screenshots/Assignment-2/Post_Detail_Screen_1.JPG" width="250" />
  <img src="screenshots/Assignment-2/Post_Detail_Screen_2.JPG" width="250" />
</div>
<br />Modal Screens
<div style={{display: flex; flex-direction: row}}>
  <img src="screenshots/Assignment-2/Create_Post_Screen.JPG" width="250" />
  <img src="screenshots/Assignment-2/Edit_Profile_Screen.JPG" width="250" />
</div>
<br />
Miscellaneous (Separate comment and liked status)
<div style={{display: flex; flex-direction: row}}>
  <img src="screenshots/Assignment-2/Separated_Comment_and_Like_Status.JPG" width="250" />
</div>
Miscellaneous (Log out)
<div style={{display: flex; flex-direction: row}}>
  <img src="screenshots/Assignment-2/Log_Out.JPG" width="250" />
</div>

## Submission

Once you have completed the assignment, please create a new issue on this repo with the title as your name and add the link to your repo in the description. One of the TA's will review your code and add your name to the list of completed submissions below if all looks good.

### Completed submissions

- [ ] Ryan Liszewski
- [ ] Thomas Zhu
- [ ] Bhavesh Chowdhury
- [ ] Sukhjit Singh
- [ ] Prakash Gurung
- [ ] Nicholas Szeto
- [ ] Emanuel Saunders
- [ ] William Hua
- [ ] Mitul Savani
- [ ] Jakhongir Khusanov
- [ ] Teodora Caneva
- [ ] Affaan Ghazzali
- [ ] Girish Rawat
- [ ] Karan Gupta

## Problems?

In case you run into any problems or issues, please post it on #questions channel on the MobileSpace Slack.

## Finally

For any other questions about this repo or MobileSpace in general please reach out to [**@monte9**](https://github.com/monte9) on Github.

