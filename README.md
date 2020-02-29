# oscars_project
## The Website
#### Live at https://gfunk68.github.io/oscars_project/web_page/
#### Local at web_page/index.html


## The API
#### Live at https://oscars-dataset.herokuapp.com/
#### Local at flask_app/app.py
##### Running app.py will connect to a mongoDB hosted on Heroku so there is one source of data. This can be changed in app.py by uncommenting the local MongoDB connection string and commenting out the heroku URL.
##### Clicking Refresh on the Flask App will run a function from merger.py and that functions call functions from scraper.py.
##### If the website goes down or if you have website/404 errors exist in the scraper, it will default to the most recent CSVs in the flask_app/ETL/clean_data/ folder.


## The notebooks
#### The working notebooks are in the notebooks/ folder. They do not necessarily do everything that scraper.py or merger.py do, they were only to get the project started. The final touches were made directly to the .py files themselves.


### Enjoy the project and please feel free to come back March 1st, 2021 (day after the 93rd Academy Awards) to click refresh!