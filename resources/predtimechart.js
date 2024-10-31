import App from 'https://cdn.jsdelivr.net/gh/reichlab/predtimechart@v3/dist/predtimechart.bundle.js';
document.predtimechart = App;  // for debugging

function replace_chars(the_string) {
    // replace all non-alphanumeric characters, except dashes and underscores, with a dash
    return the_string.replace(/[^a-zA-Z0-9-_]/g, '-');
}

// NOTE: if this value is not replaced with a URL
//       or a path that ends with a slash, then
//       this script will throw a 404 error
const root = "https://raw.githubusercontent.com/hubverse-org/hub-dashboard-template/refs/heads/ptc/data/";

function _fetchData(isForecast, targetKey, taskIDs, referenceDate) {
    // ex taskIDs: {"scenario_id": "A-2022-05-09", "location": "US"} . NB: key order not sorted
    console.info("_fetchData(): entered.", isForecast, `"${targetKey}"`, taskIDs, `"${referenceDate}"`);

    const targetKeyStr = replace_chars(targetKey);

    // get .json file name: 1) get taskIDs values ordered by sorted keys, 2) clean up ala `json_file_name()`
    const taskIDsValsSorted = Object.keys(taskIDs).sort().map(key => taskIDs[key]);
    const taskIDsValsStr = replace_chars(taskIDsValsSorted.join(' '));

    let target_path;
    const file_name = `${targetKeyStr}_${taskIDsValsStr}_${referenceDate}.json`;
    if (isForecast) {
        target_path = `${root}/forecasts/${file_name}`;
    } else {
        target_path = `${root}/targets/${file_name}`;
    }
    return fetch(target_path);  // Pwomise?
}


// load options and then initialize the component
fetch(`${root}/predtimechart-options.json`)
    .then(response => response.json())
    .then((data) => {
        console.info("fetch(): done. calling App.initialize().", data);

        // componentDiv, _fetchData, isIndicateRedraw, options, _calcUemForecasts:
        App.initialize('forecastViz_row', _fetchData, false, data, null);
    })
    .then(function() {
        // ZNK 2024-09-16: update for bootstrap 5
        var divs = document.querySelectorAll("div[class^='col-md']");
        for (var div of divs) {
          if (div.className.match("g-col") == null) {
            var n = div.className.match("col-md-(.{1,2})")[1];
            div.classList.add("g-col-"+n);
          }
        }
    });

window.addEventListener('DOMContentLoaded', function() {
  var divs = document.querySelectorAll("div[class^='col-md']");
  for (var div of divs) {
    if (div.className.match("g-col") == null) {
      var n = div.className.match("col-md-(.{1,2})")[1];
      div.classList.add("g-col-"+n);
    }
  }
});



