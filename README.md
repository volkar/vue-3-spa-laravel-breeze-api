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

Go to folder

```shell
cd vue-3-spa-laravel-breeze-api
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

## Avoid 401 error in browser's console

By default Laravel will return 401 header if guest requests guarded route (`/api/user` as example) which will lead to browser's console error. Which is fine, but if you want to keep console clear you should return unauthenticated status as 200 response for all guarded routes.

Modify `/app/Exceptions/Handler.php` and add this in function `register`:

```php
$this->renderable(function (\Illuminate\Auth\AuthenticationException $e, $request) {
    if ($request->is('api/*')) {
        return response()->json([
            'status_code' => 401,
            'authenticated' => false,
            'message' => 'Unauthenticated.'
        ], 200);
    }
});
```

Also add two custom routes in Laravel's `api.php` (and delete default `/api/user` route if you don't need it anymore):

```php
Route::middleware(['auth:sanctum'])->get('/check-session', function () {
    return response()->json(['authenticated' => \Illuminate\Support\Facades\Auth::check()], 200);
});
Route::middleware(['auth:sanctum'])->get('/get-user', function (Request $request) {
    return $request->user();
});
```

And modify two functions in `auth.js` to use new separated routes we just added:

```js
async isAuthenticated() {
    // Check if user authenticated on the backend
    let userIsAuthenticated = false
    try {
        const response = await axios.get("/api/check-session")
        if (response.status === 200 && response.data.authenticated) {
            // Data valid, user authenticated
            userIsAuthenticated = true
        }
    } catch (error) {
        // Do nothing for now
    }
    return userIsAuthenticated
},
async getUserData() {
    // Get authenticated user data from backend
    let userData = false
    try {
        const response = await axios.get("/api/get-user")
        if (response.status === 200 && response.data.id) {
            // Data valid
            userData = response.data
        }
    } catch (error) {
        // Do nothing for now
    }
    return userData
},
```

## Contact me

You always welcome to write me
- E-mail: sergey@volkar.ru
- Telegram: @sergeyvolkar
