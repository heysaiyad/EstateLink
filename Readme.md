## Real Estate Web App
1. Create a directory that is a REAL ESTATE WEB APP.
2. Create a directory that is an API. (back end)
3. routes: auth, post, user
4. controllers -> auth controller -> make register api
5. Install Prisma
6. Create a database using MongoDB.
7. Create a user model (schema file).
    After making any changes to prisma.schema, run "npx prisma db push."
8. Create a new user and save it to the database.
    install prismaClient
Make a directory lib->prisma.js, then export prisma and use it in the auth controller file to create a new user.

When I hit the register API, I got some errors.
PrismaClientValidationError:
Invalid `prisma.user.create()` invocation:

then I install 'npx prisma generate' in the run
9. npx prisma db push: any changes in db

10. Make login API
install cookie-parser
also use a JWT token.
11. Make a logout API
## Client Side
1. Register routes.
2. login routes
3. In the library directory, create apirequest.js for the base URL.
4. Registration and login are completed (bugs fixed).
5. Logout features completed
6. Authentiaction: should-be-logged-in, should-be-admin
7. Make a middleware -> verifyToken










