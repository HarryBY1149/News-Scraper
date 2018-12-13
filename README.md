# News-Scraper
A mongoose backed web scraper that collects articles from multiple sources.

This app is currently Kind of a nightmare: 

The Washington Post changed their website layout the day this project was due.

Handlebars is failing to read logic.js when rendered with the comment template. It's returning the rendered html instead of the contents of logic.js and I can't figure out why.  It's included in the main view, and works perfectly fine with the index template.  I am baffled.

Haven't been able to test the Comment storage and retrieval since I can't get my js file to load properly, but it's architected according to the mongoose docs so it would probably work with minor tweaking.

All in all a broken piece of crap, will rebuild at some point in the future.
