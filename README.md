# Fossil Sites Map

Map of fossil hunting localities, built with [Leaflet.js](https://leafletjs.com/).  Provides several base and overlay layers, including regular maps, satellite imagery, topographical data, geographical/strata information, and weather.  See it in action [here](https://fossilsites.goodguyscience.com/).

## What It Uses

In addition to Leaflet.js, the project uses the following:

Name | How It's Used
---------|----------
JavaScript | Everywhere, obviously: Leaflet is a JavaScript library.  :-)
[WMS (Web Map Service)](https://www.ogc.org/standards/wms) | In addition to the layers implemented using native Leaflet providers, several WMS sources are leveraged as well.
CSS | Custom styling to make the map more mobile-friendly.
SQLite | Stores site information (geographical coordinates, notes, etc)
PHP | Employed in an AJAX call to retrieve data from the SQLite database.
jQuery | Actually makes the AJAX call to the PHP script (for the database).

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
