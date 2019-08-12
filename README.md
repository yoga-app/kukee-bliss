# MERN Fullstack Application Kukee Bliss Yoga

### Files to add

You should have a `server/.env` file, with for example the following values:
```
PORT=5000
ENV=...
MONGODB_URI = ...

//Cloudinary credentials:
CLOUDKEY = ...
CLOUDSECRET = ...
CLOUDNAME = ...

//For nodemailer to work:
GMAILEMAIL=...
GMAILPASS=...
```

### Models

#### User(Full CRUD)
  - Level (enum only can be)
    - yogi
    - guruji
  - First name
  - username (email)
  - password
  - Last name
  - picture
  - favoritedItems: [{type: Schema.Types.ObjectId, ref: 'GalleryItem'}]
  - subscription
    - startedDate
    - endDate
  - package
  - classesLeft
 - type (enum only can be)
    - beginner
    - medium
    - advanced
#### Comments(Full CRUD)
- title
- text
- created_at
- author
- edited: Boolean
- Liked: Number
#### Quote
- text
- author
#### FAQ (Full CRUD)
- question
- answer
#### Testiimonials(Full CRUD)
- text
- author
- picture
- rating
- attended
#### Gallery Item(Full CRUD)
- picture:String,  
- video: String,
- title: String,
- text: String,
- category: [{type: String}],
- likedBy: Array of UserIds

## Routes

### GET /quote/randomQuote
Response:
```
{
    "_id": "5d4056db576fc31e8e7ded27",
    "text": "Sometimes thinking too much can destroy your momentum.",
    "author": "Tom Watson",
    "__v": 0
}
```
### POST /quote/addQuote
expects:
```
text: String
author: String
```



