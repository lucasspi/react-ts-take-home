# Withours Take Home - Lucas Spirandeli

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and the solution was based on [Withours Takehome](https://withours.notion.site/OURS-Engineering-Takehome-Project-70e4dadd78fc474d92fad13d83f13b9b)

## Running this project

In the project directory, run:

    yarn && yarn start

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Deploying this project

### Requirements

Before starting: make sure you have the aws cli installed in your machine == https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

To be able to run the deploy script you'll need to setup your aws cli Running `aws configure`

### Script

    yarn build && yarn deploy


Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Once the build is complete the deploy will start to S3 bucket called `withours.spirandeli.com`


## How this project is organized

    src
    ├── assets                  # Images and Icons
    ├── components              # Separated UI components
    ├────── atoms               # Granular UI components
    ├────── molecules           # UI pieces
    ├────── organisms           # UI Block components
    ├── constants               # constants/data
    ├── hooks                   # Custom hooks
    ├── store                   # zustand store files
    ├── utils                   # utils/reusable files
    └── App.tsx                 # Entry point


There are two approaches to handle the Video actions:
- Using `zustand` as required in the Take home description
- Using a simple hook called `useVideoPlayer`. Since this is a very small case for web player, the hook would be useful.

In case you want to try boths approaches just go to `App.tsx` and uncomment the import `import { VideoBlock } from "components/organisms/VideoBlockUsingHook";`

## Tech Stack

**Client:** @chakra-ui/react, typescript, zustand


## 🚀 About Me

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://portfolio.spirandeli.com/)

I love taking care of my family, reading books, mountain biking and producing music in my free time. My focus is to be as good at soft skills as I am at tech skills.

I'm a Computer Engineer with more than 6 years of experience working both as a Front-end and as a Full-stack Engineer.

### Intersting Fact
In the last 4 years I have read over 300 books on personal growth, leadership, emotional intelligence and business.




