# Template Hubverse Dashboard Repository

## Quickstart

Use this template to create a dashboard repository for your hub and then do
the following:

1. Add markdown content to `pages/`
2. Update `site-config.yml`
    i. `hub` is the github slug for your active hub. This example defaults to the CDC FluSight hub
    ii. `title` is the title of your dashboard
    iii. `pages` is a list of pages you want included in the top bar after the home page (index.html) and forecasts (forecast.html).
3. Update `predtimechart-config.yml` according to the instructions at [hub_predtimechart](https://github.com/hubverse-org/hub-dashboard-predtimechart/tree/main?tab=readme-ov-file#required-hub-configuration).
4. (Optional) Add `predevals-config.yml` if you have oracle output that you can use to generate predevals data. (See [reichlab/flusight-dashboard](https://github.com/reichlab/flusight-dashboard/blob/main/predevals-config.yml) for an example).

Once these steps are performed, the workflows will automatically generate the website on the `gh-pages` branch on your behalf. Once this branch is created, you can activate your website to deploy from this branch.

> [!NOTE]
>
> At the moment, the first time you create your repository, you will need to
> manually switch on your github pages by going to `<repo>/settings/pages` and
> selecting `gh-pages` as the branch to deploy from:
>
> ![screenshot of the "Build and Deployment" section of the pages setting. There are two sub-headings that say "source" and "branch". The Source heading has a dropdown that is selected to "Deploy from a branch". The Branch heading shows a dropdown with `gh-pages`, `main`, `ptc/data`, and `None` as options for the "branch" dropdown. A red arrow is pointing to the `gh-pages` option, which is highlighted.](pages.png)

## Configuration

### PredTimeChart Forecasts Visualization

Edit the [`predtimechart-config.yml`](predtimechart-config.yml) file to match your hub schema.
TODO: update this with useful information.

### Dashboard Website

#### Configuration

The [`site-config.yml`](site-config.yml) Is a simplified form of [A Quarto Website](https://quarto.org/docs/websites/#config-file). This simplified form is intended to allow you to set up a dashboard website in a manner of minutes while allowing for flexibility of theme.

A simple configuration is presented in [the template `site-config.yml`](https://github.com/hubverse-org/hub-dashboard-template/blob/main/site-config.yml) file
with three keys:

 - hub: the GitHub slug to your active hub that contains quantile forecast data
 - title: the title of your hub dashboard website
 - pages: a [YAML array](https://www.commonwl.org/user_guide/topics/yaml-guide.html#arrays) that lists files _relative to [the `pages` directory](pages/)_ that should be included in the dashboard site. The name of each page is encoded in the `title:` element of the file header (but this can be overridden with [site customization](#customization)).

Other than the `hub` field all remaining fields have the following mapping equivalents in the Quarto configuration file:

| `site-config.yml`  | `_quarto.yml` |
| ------------------ | ------------- |
| `.title`           | `.website.title` |
| `.pages`           | [`.website.navbar.left`](https://quarto.org/docs/websites/website-navigation.html#top-navigation) |
| `.html` (optional) | [`.format.html`](https://quarto.org/docs/reference/formats/html.html#format-options) |

#### Customization

When the page is built with [the hub dashboard site builder](https://github.com/hubverse-org/hub-dash-site-builder), this configuration file is merged with [the default quarto config file](https://github.com/hubverse-org/hub-dash-site-builder/blob/main/static/_quarto.yml). This allows for customization of the page. Below
are examples of customization.

##### Icons added to pages

You can add icons to the page title bars with a YAML map. If you wanted to add an icon of people for the "about" page, you would use `.pages.icon: "people-fill"`

```yaml
pages:
  - icon: "people-fill"
    href: "about.md"
  - icon: "mortarboard-fill"
    href: "citation.md"
```

##### Theme

The default site is built on top of the [Bootstrip yeti theme](https://bootswatch.com/yeti/) with [custom CSS](https://github.com/hubverse-org/hub-dash-site-builder/blob/main/static/resources/css/styles.css).

If you wanted to use [a different theme](https://quarto.org/docs/output-formats/html-themes.html), you can change it by setting `.html.theme`. You can reset the css by setting `.html.css: null`

```yaml
html:
  theme: "litera"
  css: null
```

##### Contents

If you wanted to add custom HTML to appear at the bottom or top of every page,
you can use `.html.include-after-body` or `.html.include-before-body`. Remeber
that all resources are _relative to the `pages/` directory_, so if you wanted
to include an HTML snippet at the end of every page you would:

1. add a file called `resources/after-body.html` into `pages/`
2. add this to your yaml:
   ```yaml
   html:
     include-after-body: "resources/after-body.html"
   ```
