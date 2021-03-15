# Fossil Sites Map

Map of fossil hunting localities.  Location data is stored in a SQLite database, and the map is rendered using Leaflet.js.  See it in action [here](https://fossilsites.goodguyscience.com/).

## Deployment

Setting up for deployment, in Linux:

1. Open a terminal in the project directory.
2. Change to the data directory: `cd data`.
3. Remove fossil.db (if it exists): `rm fossil.db`.
4. Recreate the database: `make create`.
5. Load the database with site data: `make import`.
6. Copy fossil.db to the www directory: `cp fossil.db ../www/`.

If you want to run it locally:

1. `cd ../www`
2. `php -S localhost:8080`
3. Open your browser, and go to localhost:8080.

If you want to deploy it to your own web host, open the file transfer utility of your choice (e.g., Filezilla), and transfer the contents of the www directory to your host.
