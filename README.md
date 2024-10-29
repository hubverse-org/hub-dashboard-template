# Template Hubverse Dashboard Repository

Use this template to create a dashboard repository for your hub and then do
the following:

1. Add markdown content to `pages/`
2. Update `site-config.yml`
    i. `hub` is the github slug for your active hub. This example defaults to the CDC FluSight hub
    ii. `title` is the title of your dashboard
    iii. `pages` is a list of pages you want included in the top bar after the home page (index.html) and forecasts (forecast.html).
3. Update `predtimechart-config.yml` according to the instructions at [hub_predtimechart](https://github.com/hubverse-org/hub-dashboard-predtimechart/tree/main?tab=readme-ov-file#required-hub-configuration).
4. Add [The hubDashboard App](https://github.com/apps/hubDashboard) to your dashboard repository.

Once these steps are performed, the App will automatically generate the website on the `gh-pages` branch on your behalf. Once this branch is created, you can activate your website to deploy from this branch.
