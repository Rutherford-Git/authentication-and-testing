# Introduction

This project is an implementation of an authentication workflow for a web application, complete with account creation and login functionality. The authentication functionality is implemented in the api/auth/auth-router.js file, while middleware to restrict access to resources from non-authenticated requests can be found in api/middleware/restricted.js.

To ensure the reliability of the authentication workflow, a minimum of 2 tests have been written for each API endpoint in api/server.test.js.

With this authentication workflow in place, users will be able to create and manage their own accounts, and access protected resources within the application.
