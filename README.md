# redbee-social

## 1 - Dependencies: 
 
 #### 1.2 - Core Project Dependencies: 
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
 
 
 #### 1.2 - Front End Dependencies: 
 *   angular - 1.6.4
 *   ngtweet
 *   bootstrap - 3.2.0
 *   font-awesome - 4.7.0
 *   momentJS - 2.7.0
 *   masonry - 3.1.5
 


 
## 2 - Project configuration file (config.sample.js) 
 
 
#### 2.1 Twetter api configuration
the configuration file has 4 main configuration , tweeter api credentials , instagram api credentials, db connection and  the scheduler config
 
 ```javascript
twitter: {
  	consumer_key: 'yourkey',
		consumer_secret: 'yourCustomerSecret',
		access_token: 'yourAccesToken',
		access_token_secret: 'yourTokenSecret'
	},

```
#### 2.2 Instagram api configuration
 ```javascript
	instagram:{
		  clientId: 'yourClientID',
		  accessToken:'yourAccesToken'
		},
```
#### 2.3 Twetter api configuration
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
  
#### 2.4 Scheduler configuration
  ```javascript
	schedulerConfig:{
		timeConfig:'*/30 * * * *',
	}
```

## 3 - DataBase details
There is 4 db 4 entities , 3 tables (users, tweet_posts, subscriptions) and one view (tweets_view)

#### 3.1 USERS
	* id 		<Primary> 	int(11)
	* username  			varchar(100)
	* name 				varchar(100)
	* lastname 			varchar(100)
	* email 			varchar(100)
	
#### 3.2 TWEET_POSTS
	* id_strPrimary <Primary> 	bigint(80) 			
	* user_id	<Primary> 	int(11) 
	* tagPrimary	<Primary> 	varchar(45)
	* created_at 			date 	
	* oEmbed 			varchar(1000) 
	* tweet_id 			bigint(70) 	

#### 3.3 SUBSCRIPTIONS
	* userid	<Primary> 	int(11) 	
	* network 	<Primary>	varchar(50) 
	* tag		<Primary> 	varchar(100)
	
	
#### 3.4 TWEETS_VIEW 
Used to get the db tweets and display them in UI,  order by tweet_id desc 
	* id_str 		bigint(80) 		
	* user_id 		int(11) 		
	* tag 			varchar(45) 	
	* created_at	 	date
	* oEmbed 		varchar(1000) 	
	* tweet_id 		bigint(70)
