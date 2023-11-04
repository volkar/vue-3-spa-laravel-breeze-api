# Vue 3 SPA for Laravel Breeze API

![Vue 3 SPA](https://github.com/volkar/vue-3-spa-laravel-breeze-api/blob/main/project-preview-1.jpg?raw=true)

[Vue 3](https://vuejs.org/) SPA boilerplate for consume all of [Laravel Breeze API](https://laravel.com/docs/10.x/starter-kits#breeze-and-next) default installation (sign in, create account, forgot password, reset password, get user data) with auth-guarded dashboard and all redirects.

## Features

- Sign in, crete account, forgot password, reset password and get user data functionality
- Page guards for authenticated/guest only users with redirect to their default endpoint if status mismatches
- Simple dashboard for authenticated users
- Form sending with CSRF and force logout logic when sending `create account`, `forgot password` and `reset password` forms (prevents Laravel's RedirectIfAuthenticated issue)
- Displays field errors and success messages
- Automatic session expiration check when page  focused after long inactivity period (with logout if session was expired)
- Page loading animation and form sending animation
- Adaptive main menu
- Markup and styles styles from [Amethyst Lite](https://github.com/volkar/amethyst-lite)

## Includes

- TailwindCSS
- Pinia
- Axios

## Screenshots

Index page
![Index page](https://github.com/volkar/vue-3-spa-laravel-breeze-api/blob/main/project-preview-1.jpg?raw=true)
Sign in page
![Login page](https://github.com/volkar/vue-3-spa-laravel-breeze-api/blob/main/project-preview-2.jpg?raw=true)
Form sending
![Form sending](https://github.com/volkar/vue-3-spa-laravel-breeze-api/blob/main/project-preview-3.jpg?raw=true)
Form errors
![Form errors](https://github.com/volkar/vue-3-spa-laravel-breeze-api/blob/main/project-preview-4.jpg?raw=true)
Dashboard
![Dashboard](https://github.com/volkar/vue-3-spa-laravel-breeze-api/blob/main/project-preview-5.jpg?raw=true)

## Installation

Install Laravel Breeze (API version), do all that standart stuff with migrations and database connection. Serve it (assumed it's run on http://127.0.0.1:8000/)

Copy this project to folder of your choice

```shell
gh repo clone volkar/vue-3-spa-laravel-breeze-api
```

Install dependencies
```
npm install
```

Run it
```
npm run dev
```
It will run on http://127.0.0.1:3000 by default.
Open it in browser and you good to go!

## Contact me

You always welcome to write me
- E-mail: sergey@volkar.ru
- Telegram: @sergeyvolkar
