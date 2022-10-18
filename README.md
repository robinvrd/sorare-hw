## Context

This project was created as a technical assignment during Sorare recruiting process for a frontend engineer position.

### Part 1, 2 and 3

These parts of the homework are the code itself where each part can be found on a different commit.


### Part 4

*Question: From there, how would you proceed to generate a PNG version of the card? (no code required)*

The easiest way for me to generate a PNG version in a frontend environnement would be to use the [html2canvas](https://www.npmjs.com/package/html2canvas) javascript library as discussed in that article for example https://blog.logrocket.com/export-react-components-as-images-html2canvas.

### Possible improvements

- Generate types from GraphQL API instead of creating them manually
- Use images as card background to make the cards prettier and more customized (could also use some animated background with particles to make them even more customized)
- Add the possibility to reveal card one by one in addition to the "reveal cards" action button (like in Sorare application)

## Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) as it is the recommanded way of creating new React project according to the official document.

Setup is very easy using yarn command:
```
yarn
```

 ## Running

 To run the project, you can use:
 ```
 yarn start
 ```

 Project will be accessible on http://localhost:3000.

## How it works ?

The project is listing some cards on http://localhost:3000/cards page. 

To display some cards you need to add Sorare slug name after the url separated with a comma.

#### Example

```
http://localhost:3000/cards/marco-verratti-2021-rare-1,kylian-mbappe-lottin-2020-super_rare-1
```

This page will display two different cards, one rare of Marco Verratti and one super rare of Kylian Mbappé.

The cards are hidden by default, to reveal them you need to click on the "Reveal cards" button as they will flip to reveal the other side of the cards.

## Technical details

### File structure

Main files are inside `src` folder according to Create React App initial file structure.

- `components`: React components used in routes or other components
- `helpers`: generic functions used in the project
- `pages`: React components used in the router to render page layout
- `types`: Typescript types defined for GraphQL schema queried

### Dependencies

- `react-router-dom` (routing and url parameters)
- `@apollo/client` (GraphQL queries)
- `styled-components` (components with style-only purpose)
- `react-sprint` (flip cards animation)
- `react-spinners` (loading animation)