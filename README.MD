# nodeTunes

Backend serving iTunes data, frontend plays music. Uses node, react, howl. Now written with React Hooks!!!

## To run locally

1. `npm install -g http-server`
1. `npm install`
1. `npm run server`
1. `npm run app`
1. `npm run music`
1. Set SERVERLOCATION to where you server your music and library xml 
1. Add `?{ SERVERLOCATION }` to end of music player url

## To run externally

1. Serve your music and library xml to SERVERLOCATION
1. Navigate to `https://drewmiley.github.io/nodeTunes/?{ SERVERLOCATION }`
