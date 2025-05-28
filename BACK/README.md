# Super Express
Little wrapper for express that can be used for small/medium monolitics apps.

You easily call the initializer with your db models, and build some custom express routers to dynamically create all the endpoints and the swagger-ui.

I prefer to leave it as a template and not a package as it must be implemented based on your project needings for now.

### Env file
For the database, there is a default sqlite3 in the packages too, if you need postgres or any other engine, check out the [typeorm packages](https://typeorm.io/#installation) required for your db.

```python
SERVER_PORT=3000 # required
API_URL="http://127.0.0.1:3000/api" # not required
ERROR_FILE_PATH="logs/errors.log" # not required
TOKEN_KEY="your-ultra-secret-key" # required if you want to use tokens

# ---
# Db parameters are required depending on the DB_DIALECT (check typeorm requirements)
# Use the next lines how you want, the template comes from a configuration for a sqlite3 db.
# ---
# DB_DIALECT="postgres"
# DB_HOST="127.0.0.1"
# DB_PORT=5432
# DB_USER="username"
# DB_PASSWORD="mystrongbdpassword"
# DB_NAME="expresso"

DB_DIALECT="sqlite"
DB_NAME="db/expresso.db"



# Not for the expresso-macchiato package but inside the template because i often use it.
MINIO_ENDPOINT="127.0.0.1"
MINIO_PORT=9000
MINIO_SSL=false
MINIO_ACCESS_KEY="in minio container you can use your root username but in prod use amazon s3 keys"
MINIO_SECRET_KEY="in minio container you can use your root password but in prod use amazon s3 keys"
```



### Swagger
Check swagger on `<url:port>/swagger` or `/swagger-ui`




# Library explaination

The library is as it follows:
* `Starter.ts`:
	> A class that accepts a whole configuration as a constructor.
	> You can pass:
	> 1. The db configurations
	> 2. Express plugins
	> 3. Custom Routes (made by the class RouterWrapper),
	> 4. A boolean for mounting swagger ()default true)
	> 5. A client path, if not specified, there won't be client builded
	> 6. Some socket configuration **(needs implementations tho)**
	> 7. A "beforeListen" callback to do other missing stuff.

	* `SocketWrapper.ts`
		> Needs implementations

	* `DbConnector.ts`
		> A class that help connecting to the db direclty reading the envs as configurations.
		> It uses **TypeOrm** as orm
		> It's internally used but you can check the getDataSource method to get the db metadata for reflections or stuff.

	* `RouterWrapper.ts`
		> The main class that you'll need to build your express routes.
		> The constructor will help:
		> 1. Building the swagger scheme.
		> 2. Returning a standardized api (check the examples)
		> 3. if wanted, dynamically building LIST, GET, POST, PUT, DELETE endpoints ready with your entity (this is made by the DynamicDbRouter).

		* `DynamicDbRouter.ts`  | *(internally used)*
			> A class that devs don't see while building the app.
			> It helps building the dynamic routes and the swagger document inside the **RouterWrapper** class, through the dedicated sections in the RouterWrapper constructor (see the types/examples/ts linter/ecc...)

		* `Swagger.ts`
			> A static instance that build the swagger document throughout the RouterWrapper initializations. If present, the final json will be parsed and used to serve the swagger-ui document on the related path

* `Token.ts`
	>  A class that manages the JWE logics and backend authorizations.
	> Feel free to use the auth method you want and remove/change this class as you want.
	> It is meant to be used inside the api to check the token or other operations, at the moment **it is used inside the DynamicDbRouter so check this too**
