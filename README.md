# Dog Adoption Website

A multi-page dog adoption portal built with plain HTML, CSS, and JavaScript.

## Pages

| Page | File | Description |
|------|------|-------------|
| Dog List | `src/index.html` | Displays all available dogs in a flex-wrap card grid |
| Dog Details | `src/dog.html` | Shows full dog profile with prev/next navigation |
| Adoption Form | `src/adopt.html` | Inquiry form with email, name, and phone fields |
| Thank You | `src/thankyou.html` | Confirmation page after form submission |

## Project Structure

```
src/
  dogs_data.json        # Dog data (do not modify)
  index.html            # Main page - dog list
  dog.html              # Dog detail page
  adopt.html            # Adoption form page
  thankyou.html         # Thank you page
  styles.css            # Common styles (shared by all pages)
  index.css             # Styles for index.html
  dog.css               # Styles for dog.html
  adopt.css             # Styles for adopt.html
  thankyou.css          # Styles for thankyou.html
  script.js             # Common utility functions (shared by all pages)
  index.js              # Script for index.html
  dog.js                # Script for dog.html
  adopt.js              # Script for adopt.html
  thankyou.js           # Script for thankyou.html
```

## REST API

Data is served via a Postman mock server with the following endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/dogs` | GET | Returns all dogs |
| `/dogs/<id>` | GET | Returns a single dog by id |
| `/dogs/<id>` | POST | Submits adoption inquiry (email, fullname, phone) |

## How to Run

Open `src/index.html` in a browser (Google Chrome recommended).

## Tech Stack

- HTML5, CSS3, vanilla JavaScript
- No libraries or frameworks
- Postman mock server for REST API
