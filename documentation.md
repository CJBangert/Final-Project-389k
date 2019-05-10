# Final-Project-389k
# By: Ryan Dietz and CJ Bangert

https://soundplow.herokuapp.com/

1. Schemas
	1. const UserSchema = new Schema({
    	username: { type: String, index:{unique: true}, required: true },
    	password: { type: String, required: true },
    	sex:{type:String, required: true},
    	age:{type:Number, required: true},
    	music_interests:{type: [String],default: []},
    	concerts_going:{type: [String], default: []},
    	online:{type: Boolean, default: false},
    	createdDate: { type: Date, default: Date.now }
	});
	2. const ArtistSchema = new Schema({
    	name: { type: String, index:{unique: true}, required: true },
    	genre: { type: String, required: true },
    	tour_id:{type:[Number], default: [], required: 	true}
	});

	3. const ConcertSchema = new Schema({
    	lineup: { type: [String], required: true },
    	date: { type: String, required: true },
    	price: { type: Number, required: true},
    	location: { type: String, required: true},
    	friends_going: {type; [String], default: [] required: true},
    	id:{type:String, required: true}
	});

	4. const VenueSchema = new Schema({
    	name: { type: String, index:{unique: true}, required: true },
    	id:{ type:[Number], default: [], required: true}
	});

2. Updates
	We used sockets for live updates on the connectivity of the user.

3. View Data
	Below is listed all the handle bar pages in our app
	1. allUsers
	2. artist
	3. concerts
	4. location
	5. register
	6. authenticate
	7. home
	8. main
	9. descriptions

4. API
	Below are all the api requests in our app
	1. '/artists'
	2. '/allUsers'
	3. '/concerts'
	4. '/location'
	5. '/descriptions'
	6. '/authenticate'
	7. '/api/register' (Post)
	8. '/api/authenticate' (Post)
	9. '/'
	10. '/api/delete_id' (Delete)
	11. '/api/delete_venue' (Delete)
	12. '/api/addConcert' (Post)

5. Modules
	These were the three modules that we created 
	1. './users/user.service.js'
	2. './users/user.controller.js'
	3. './users/user.model.js'

6. NPM Packages
	We used the follow npm packages that we did not use in class
	1. bcrypt
	2. jsonwebtoken
	3. express-jwt

7. User Interface
	Used HTML and CSS to make it look very nice

8. Deployment
	https://soundplow.herokuapp.com/

9. README
	This is the README