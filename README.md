# redbee-social

### 1 - Project dependencies: 
 *   "async": "^2.5.0",
 *   "body-parser": "~1.17.1",
 *   "ejs": "~0.8.5",
 *   "escape-html-in-json": "^1.0.0",
 *   "express": "~4.2.0",
 *   "mysql": "^2.14.1",
 *   "node-instagram": "^3.0.0",
 *   "node-schedule": "^1.2.4",
 *   "qs": "*",
 *   "twit": "^1.1.18"
 
 ### 2 - Project configuration file (config.sample.js) 
 
 
 2.1 Twetter api configuration
the configuration file has 4 main configuration , tweeter api credentials , instagram api credentials, db connection and  the scheduler config
 
 ```javascript
twitter: {
  	consumer_key: 'yourkey',
		consumer_secret: 'yourCustomerSecret',
		access_token: 'yourAccesToken',
		access_token_secret: 'yourTokenSecret'
	},

```
 2.2 Instagram api configuration
 ```javascript
	instagram:{
		  clientId: 'yourClientID',
		  accessToken:'yourAccesToken'
		},
```
 2.3 Twetter api configuration
 ```javascript
	connectionData:
	{
		host: 'db_ip',
		user: 'username',
		password: 'password',
		database: 'databaseName',
		supportBigNumbers:true
	},
  ```
  
 2.4 Scheduler configuration
  ```javascript
	schedulerConfig:{
		timeConfig:'*/30 * * * *',
	}
```


