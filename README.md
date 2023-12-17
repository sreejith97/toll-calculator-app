# Toll Expert

The Toll Expert app is a vital tool for travelers, providing precise route planning with toll costs, fuel expenses, and travel time estimation. Unique features include support for waypoints, enabling users to add stops for dynamic adjustments in tolls, fuel estimates, and travel time. Unlike traditional calculators, our app offers a comprehensive and personalized planning experience.

## Features

- Providing precise route planning with toll costs
- Total fuel expenses
- Enabling users to add stops for dynamic adjustments in tolls

## Tech

Toll Expert relies on several open-source projects to function:

- [Nextjs] - HTML enhanced for web apps!
- [nodejs] - Node.js serves as the runtime for executing server-side JavaScript
- [Toll guru API] - The TollGuru API is a service offering toll-related information and functionalities
- [Google Polyline-codec] - Encode and decode polyines in Nodejs or the browser using this package
- [TailWind css] - Utility-first CSS framework

## Installation

Toll Expert requires [Node.js](https://nodejs.org/) v18+ to run.

Clone the project by retrieving it from my repository [toll-calculator-app].

```sh
git clone https://github.com/sreejith97/toll-calculator-app.git
```

Install the dependencies and devDependencies.

```sh
cd toll-calculator-app
npm i
```

Create a ".env.local" file to store the credentials and API key(get API_KEY from Toll GURU )

```sh
API_KEY="YOUR_API_KEY"
```

Start the server using npm or yarn.

```sh
yarn dev
```

Server will start running at local port 3000

```sh
http://localhost:3000/
```

## Live Demo

The project is live and hosted on Vercel. (Note: There is a potential for non-functionality due to the project relying on a free API with daily usage limitations.)

```sh
https://toll-expert-app-sreejiths-projects-693d5246.vercel.app/
```

## License

MIT

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[Nextjs]: https://nextjs.org/
[nodejs]: https://nodejs.org/en
[Toll Guru API]: https://tollguru.com/
[Google Polyline-codec]: https://www.npmjs.com/package/@googlemaps/polyline-codec
[Tailwind css]: https://tailwindcss.com/
[toll-calculator-app]: https://github.com/sreejith97/toll-calculator-app
