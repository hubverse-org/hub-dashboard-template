import App from "https://cdn.jsdelivr.net/gh/hubverse-org/predevals@v1/dist/predevals.bundle.js";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

document.predevals = App;  // for debugging
document.d3m = d3;  // for debugging

function replace_chars(the_string) {
    // replace all non-alphanumeric characters, except dashes and underscores, with a dash
    return the_string.replace(/[^a-zA-Z0-9-_]/g, '-');
}

// NOTE: if this value is not replaced with a URL
//       or a path that ends with a slash, then
//       this script will throw a 404 error
const root = "https://raw.githubusercontent.com/hubverse-org/hub-dashboard-template/refs/heads/predevals/data/";

async function _fetchData(target, eval_window, disaggregate_by) {
    // ex taskIDs: {"scenario_id": "A-2022-05-09", "location": "US"} . NB: key order not sorted
    console.info("_fetchData(): entered.", `"${target}"`, `"${eval_window}"`, `"${disaggregate_by}"`);

    let target_path;
    if (disaggregate_by === '(None)') {
      target_path = `${root}scores/${target}/${eval_window}/scores.csv`;
    } else {
      target_path = `${root}scores/${target}/${eval_window}/${disaggregate_by}/scores.csv`;
    }
    return d3.csv(target_path);
}


// load options and then initialize the component
fetch(`${root}/predevals-options.json`)
    .then(response => response.json())
    .then((data) => {
        console.info("fetch(): done. calling App.initialize().", data);

        // componentDiv, _fetchData, options:
        App.initialize('predEval_row', _fetchData, data);
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
