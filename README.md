# Changa

An API and GUI interface for scraping manga. It uses the [chainy](https://github.com/hubble459/chainy) package to scrape based on simple actions. Changa includes a builder page where you can test your chains and debug them.

Additionally changa also keeps track of which scrapers and websites are working (and which don't).

## Contributing Scrapers

If you want to add support for some manga website, you can do so by going to the changa website and configuring a scraper. The configuration will have to be approved by the maintainer, because there's definitely a risk of XSS or misuse 😳

## Developing

Once you've cloned this repo and installed dependencies with `bun i`, start a development server:

```bash
bun run dev

# or start the server and open the app in a new browser tab
bun run dev --open
```

## Building

To create a production version:

```bash
bun run build
```

You can preview the production build with `bun run preview`.

## Contributing

Feel free to make a PR to add features or fix bugs.