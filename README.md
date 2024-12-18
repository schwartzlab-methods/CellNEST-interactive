# ![alt text](https://github.com/schwartzlab-methods/cellnest-interactive/blob/main/cellnest_logo.svg) CellNEST-Interactive

CellNEST-Interactive is an interacive exploration tool for
[CellNEST](https://github.com/schwartzlab-methods/CellNEST) output.

## Zoom and pan exploration

![](img/cell_nest_zoom_small.gif)

## Ligand-Receptor pair filtering

![](img/cell_nest_select_small.gif)

## Vertex (spot or cell) color changing

![](img/cell_nest_node_color_small.gif)

## Communication color changing

![](img/cell_nest_edge_color_small.gif)

## Increase range of reliable signals

![](img/cell_nest_edge_increase_small.gif)

## Python package dependencies:

```
django
numpy
scipy
matplotlib
pandas
altair
django-cors-headers
```

## Required preprocessed metadata and output files from the CellNEST model

We need the following five files:

1. cell*barcode*\*.csv file generated by CellNEST in the data preprocessing step.
2. coordinates\_\*.csv file generated by CellNEST in the data preprocessing step.
3. \*\_self_loop_record.gz file generated by CellNEST in the data preprocessing step.
4. Optional \*\_annotation.csv file, if available.
5. CellNEST\_\*\_top20percent.csv file generated by CellNEST in the data postprocessing step.

Keep these five files under the same directory and use that directory path (e.g., server/data/files/ ) while running the interactive version as explained below.

## Instructions to run CellNEST-Interactive:

Navigate into the pulled cellnest_interactive directory. Please run the following command with two arguments:

1. Desired port to run the frontend, e.g., 8080
2. Path to the directory having CellNEST output and required metadata files, e.g., barcode, coordinates, etc.

A sample command is provided below:

```
bash cellnest_interactive 8080 server/data/files/
```

However, if you are interested to run the frontend and backend separately, you can follow the instructions below.

#### Frontend:

1. If VSCode is installed, adding the "Live Server" extension from Ritwick Dey makes spinning up a server easy. Access the server hosted at http://127.0.0.1:5500/HTML%20file/CellNEST-vis.html
2. Otherwise
   - Run `python -m http.server 8080` from the root directory
   - Open http://localhost:8080/ and navigate to "HTML file" then "CellNEST-vis.html"
   - Server should be hosted at http://localhost:8080/HTML%20file/CellNEST-vis.html

#### Backend:

- Navigate into the server directory (`cd server`)
- Install pipenv
- Run `pipenv shell` then `pipenv install`

  - The required packages that are installed:

  ```
  django
  numpy
  scipy
  matplotlib
  pandas
  altair
  django-cors-headers
  ```

- Run `cd ..`
- Run `python ./server/manage.py setdata server/data/files/`
- Run `python ./server/manage.py runserver`
