<div align="center">
	<img src="./logo.png" width="400" alt="Laravel + Angular Logo"/>
</div>

# Laravel + Angular + Ngrx (State Management) + i18n Admin Template
Quick start With Admin Template for Laravel 8.0 + Angular 10.0 With And With Out NGRX projects with JWT auth.

## Includes:

### Front-end:
- Angular CLI boilerplate files
- JWT authentication service
- Login components
- i18n

<div style="margin-bottom : 30px;">
	<img src="./login_page.png" width="800" alt="Laravel + Angular Logo"/>
</div>
<div style="margin-bottom : 30px;" >
	<img src="./dashboard.png" width="800" alt="Laravel + Angular Logo"/>
</div>
<div style="margin-bottom : 30px;">
	<img src="./listing.png" width="800" alt="Laravel + Angular Logo"/>
</div>


### Back-end:
- Composer build file
- Boilerplate files
- JWT authentication

## Server
- Go to `Server` folder and run `composer install` to install dependencies.

- Set your DB connections in `.env`

- run `php artisan key:generate` to generate app key.

- import sql file placed in root directory

- In migrations, the default user is created for which username is **"admin@gmail.com"** and password is **"123456"**.

## frontend
- Open *Client* folder in terminal/console and run `npm install` to install all dependencies.

- Add URL to your local server to  `/Client/src/environments/environment.ts`.

- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## License: [MIT](https://opensource.org/licenses/MIT)
