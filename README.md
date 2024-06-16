# Exhibiteur

A website for compiling art into a locally-stored collections, primarily for creating exhibitions.
This is primarily built around 2 APIs, [Rijksmuseum](https://www.rijksmuseum.nl/en) & [The Art Institute Of Chicago](https://www.artic.edu/).
  

# Setup

In order to use Exhibiteur, you require an API Key provided by [Rijksmuseum](https://data.rijksmuseum.nl/object-metadata/api/). The Art institute of Chicago does not require an API key.

Follow the example seen in .env.example, and create your own .env file in order for this api to function. It should look something like VITE_API_KEY=mG8PRw%g  <-(Not a real API key)
You must also install the required node modules, through your program of choice (I.E "npm install")
After this, the website can be run locally under the command "npm run dev" or "vite dev"
The website can also be built for server usage on the "vite build" command.

# Usage

Exhibiteur is a program for searching art across two APIs, and then being able to compile the into lists.
FIrst you must create your list from the My Lists tab at the top of the screen.
Then simply search a query you want, and then click on the images that you wish to inspect at a larger size and add to a list of your choosing.

If you are unsure about the usability of it, follow the link to the origin of the piece to see more precise information directly from the museums they come from.

Inside the My Lists page, you can view similar things, such as its origin and title, and also delete the image from the list.
