# Adventure Tracker

<img width="1920" alt="adventure-tracker-screenshot" src="https://user-images.githubusercontent.com/81662051/128973134-b0c86ba1-8fe8-44ad-b85a-539fee6eae87.png">

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Features](#features)
- [Illustrations](#illustrations)
- [Possible Future Extensions](#possible-future-extensions)
- [Set Up](#set-up)
- [Organizational Resources](#organizational-resources)
- [Sources](#sources)
- [Contributors](#contributors)
- [Project Specs](#project-specs)

## Introduction

Adventure Tracker is a travel dashboard which allows the user to see upcoming trips, past adventures, as well as get quotes travel and book the trips they want.

## Technologies

- Javascript
- HTML
- SCSS
- Webpack
- API Fetch calls
- [Glide.js](https://glidejs.com/)
- [Dayjs](https://day.js.org/en/)

## Features

After logging in, the dashboard displays..

- Search options for booking a new trip
- Past trips
- Upcoming trips
- A current trip
- Pending Trips
- A summary of annual trip spending

Booking a trip is easy too. After selecting a destination, a departure date, the number of travelers and the length of the trip, the user can get a bundled quote for flights and lodging. With a single click, they can book their trip and it will immediately display in their pending trips.

## Illustrations

![Laptop View](![Screen Shot 2021-08-10 at 11 12 50 PM](https://user-images.githubusercontent.com/81662051/128973134-b0c86ba1-8fe8-44ad-b85a-539fee6eae87.png))

<!-- tablet view                   |  mobile view
:-------------------------:|:-------------------------:
![get-fit-tablet](https://user-images.githubusercontent.com/80136642/126420111-1f1d0285-84c6-45a6-94dc-f9cb51efd868.gif) | ![get-fit-mobile](https://user-images.githubusercontent.com/80136642/126420083-041e9209-4b44-4368-bdb8-5ded3b8852ea.gif) --> -->

## Possible Future Extensions

- Refine styling
- Set up a adminstrator class to be able to approve pending trips, add suggested activities and update destinations
- Add more robust login credentials

## Set Up

<!-- 1. Fork this repo
2. In your terminal run `git clone git@github.com:rachelJensen/get-fit.git`
3. In your terminal clone down this API [repo](https://github.com/turingschool-examples/fitlit-api)
4. In a new terminal window cd into the API directory and run npm install and then npm start
5. Finally, open a browser and go to `localhost:8080` -->

## Organizational Resources

- [Project-Board](https://github.com/rachelJensen/travel-tracker/projects/1)
- [Miro-Wireframing](https://miro.com/app/board/o9J_l3gbd9Y=/)

## Sources

- [MDN](http://developer.mozilla.org/en-US/)
- [CSS-TRICKS](https://css-tricks.com/)

## Contributors

- [Rachel Jensen](https://github.com/rachelJensen)

## Project Specs

- The details of this project are outlined in [this project spec](https://frontend.turing.edu/projects/travel-tracker.html).

### JavaScript

You have to be very intentional with where you add your feature code. This repo uses a tool called [webpack](https://webpack.js.org/) to combine many JavaScript files into one big file. Webpack enables you to have many, separate JavaScript files to keep your code organized and readable. Webpack expects all of your code files to be in a specific place, or else it doesn't know how to combine them all behind the scenes.

**Create all of your feature code files in the `src` directory.**

Since code is separated into multiple files, you need to use the `import` and `export` syntax to share code across file.

Here is a video that walks through some information about [import and export](https://www.youtube.com/watch?v=_3oSWwapPKQ). There are a lot of resources out there about `import` and `export`, and resources will sometimes call them `ES6 modules`. It's something you will see in React and beyond.

### HTML

Add the HTML you need in the `index.html` file in the `./dist` directory. There is some boilerplate HTML that exists from the start that you can modify.

### CSS (SCSS/SASS)

This project is setup to use SCSS/Sass files by default instead of your regular CSS files. Add your SCSS files in the `src/css` directory. There is a `base.scss` file already there, but you can change this file and add multiple SCSS files in this directory.

This might sound weird, but you need to `import` your SCSS files in the JavaScript entry file (`index.js`) for the styles to be applied to your HTML. The example `base.scss` file has already been imported in the JavaScript entry file as an example.

### Images

Add your image files in the `src/images` directory. Similar to CSS files, you need to `import` image files in the JavaScript entry file (`index.js`). Then go into the HTML and add an `img` element with the `src` attribute pointing to the `images` directory. There is an example in the `index.html` file for you to see.

## How to View Your Code in Action

In the terminal, run:

```bash
npm start
```

You will see a bunch of lines output to your terminal. One of those lines will be something like:

```bash
Project is running at http://localhost:8080/
```

Go to `http://localhost:8080/` in your browser to view your code running in the browser.

---

## Test Files Organization

Similar to feature code, your test code needs to be put in a specific place for it to run successfully.

**Put all of your test files in the `test` directory.** As a convention, all test filenames should end with `-test.js`. For instance: `box-test.js`.

## Running Your Tests

Run your test suite using the command:

```bash
npm test
```

The test results will output to the terminal.

---

## Linting Your Code

Run the command in your terminal `npm run lint` to run the linter on your JavaScript code. There will be errors and warnings right from the start in this starter kit - the linter is still running successfully.

Your linter will look at the JavaScript files you have within the `src` directory and the `test` directory.

## Webpack?

If you look in the `package.json` file, you'll see one of the library dependencies called `webpack`. If you're interested in learning more about what Webpack is and how it works behind the scenes, take a look through the [Webpack configuration documentation](https://webpack.js.org/concepts/).

## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
