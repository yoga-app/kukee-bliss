# MERN Fullstack Application Kukee Bliss Yoga

See readme in a form of [mindmap](https://mind42.com/public/cbb3de54-0e78-43d8-b5fa-6b465066e96f).

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
### GET /quote/allQuotes
response 101 objects like that
```
 {
        "_id": "5d404c3fcf065b1e0741bfce",
        "text": "Almost any decision is better than no decision — just keep moving.",
        "author": " Danielle LaPorte",
        "__v": 0
    }
```
### POST /quote/data/seed/quotes
expects:
```
key: coolboy55
seeds Quote db with 101 quotes from quotes.json
```
### POST /asanas/data/seed/asanas
expects:
```
key: coolboy55
seeds Asana db with 48 asanas from yoga_api.json 
```
### GET /asanas
response:
List of 48 objects like that
```
{
_id : 5d406d78a256cb201f5053e3
sanskrit_name : "Navasana"
english_name : "Boat"
img_url : "https://www.dropbox.com/s/4m64ztxkj8a4dab/boatstraightlegs.svg?raw=1"
}
```
### GET /asanas/ + :id
response
Single asana object
```
{
    "_id": "5d406ff99818c5205704b72b",
    "sanskrit_name": "Dhanurasana",
    "english_name": "Bow",
    "img_url": "https://www.dropbox.com/s/wizj5kwxvez4c0a/bow.svg?raw=1",
    "__v": 0
}
```

### POST /api/auth/signup
expects
```
username: String
password: String
firstName: String
lastName: String
```
creates:
```
{
    "level": "yogi",
    "picture": "https://res.cloudinary.com/ironhack55/image/upload/v1564588169/default-profile_tlj5l0.png",
    "_id": "5d41bb1047c6142e39b5fd27",
    "username": "coolboy55",
    "password": "$2a$10$/Kzzbjr9/8hv/k0zs1njie7RoShwW95gfipZ4rUzoElG24vOb4oK.",
    "firstName": "Gaz",
    "lastName": "Johnson",
    "created_at": "2019-07-31T16:00:16.693Z",
    "updated_at": "2019-07-31T16:00:16.693Z",
    "__v": 0
}
```
### POST /api/auth/login
### POST /api/auth/logout
### GET /api/auth/getcurrentuser
Response
```
{
    "username": "coolboy55",
    "_id": "5d41bb1047c6142e39b5fd27",
    "firstName": "Gaz",
    "lastName": "Johnson",
    "picture": "https://res.cloudinary.com/ironhack55/image/upload/v1564588169/default-profile_tlj5l0.png",
    "subscription": {},
    "package": {},
    "created_at": "2019-07-31T16:00:16.693Z"
}
```
### POST /api/auth/updateuserinfo/:id
passes the whole req.body to update the database entry
returns updated user object
### POST /api/auth/deleteprofile/:id
removes user with this id from DB
returns confirmation message 
### GET /api/auth/getuserbyid/:id
response
```
{
    "level": "yogi",
    "picture": "https://res.cloudinary.com/ironhack55/image/upload/v1564588169/default-profile_tlj5l0.png",
    "_id": "5d41bb1047c6142e39b5fd27",
    "username": "coolboy55",
    "password": "$2a$10$/Kzzbjr9/8hv/k0zs1njie7RoShwW95gfipZ4rUzoElG24vOb4oK.",
    "firstName": "Garry",
    "lastName": "Goodridge",
    "created_at": "2019-07-31T16:00:16.693Z",
    "updated_at": "2019-07-31T16:22:49.264Z",
    "__v": 0
}
```
### GET /api/auth/getallusers
response: Array 
```
[
    {
        "level": "yogi",
        "picture": "https://res.cloudinary.com/ironhack55/image/upload/v1564588169/default-profile_tlj5l0.png",
        "_id": "5d41bb1047c6142e39b5fd27",
        "username": "coolboy55",
        "password": "$2a$10$/Kzzbjr9/8hv/k0zs1njie7RoShwW95gfipZ4rUzoElG24vOb4oK.",
        "firstName": "Garry",
        "lastName": "Goodridge",
        "created_at": "2019-07-31T16:00:16.693Z",
        "updated_at": "2019-07-31T16:22:49.264Z",
        "__v": 0
    }
]
```
### POST /api/auth/updatefavorited/:id
expects
- direction
"add" or "remove"
- itemID
response
#### add
```
{
    "message": "Added to favorited successfully",
    "updatedUser": {
        "level": "yogi",
        "isAdmin": true,
        "picture": "https://res.cloudinary.com/ironhack55/image/upload/v1564588169/default-profile_tlj5l0.png",
        "favoritedItems": [
            "5d475f42dae1474f140da49e"
        ],
        "_id": "5d474aa9e675bd4c39d5acca",
        "username": "admin@admin.com",
        "password": "$2a$10$/2tu4/VP/QoAisp9xXfFvO8o8Oy46WXX0hBLlg.xLEAKgDdcm8Za2",
        "firstName": "Boss",
        "lastName": "Man",
        "created_at": "2019-08-04T21:14:17.196Z",
        "updated_at": "2019-08-05T16:06:24.671Z",
        "__v": 0
    }
}
```
#### remove
```
{
    "message": "Removed from favorited successfully",
    "updatedUser": {
        "level": "yogi",
        "isAdmin": true,
        "picture": "https://res.cloudinary.com/ironhack55/image/upload/v1564588169/default-profile_tlj5l0.png",
        "favoritedItems": [
            "5d475f42dae1474f140da49e"
        ],
        "_id": "5d474aa9e675bd4c39d5acca",
        "username": "admin@admin.com",
        "password": "$2a$10$/2tu4/VP/QoAisp9xXfFvO8o8Oy46WXX0hBLlg.xLEAKgDdcm8Za2",
        "firstName": "Boss",
        "lastName": "Man",
        "created_at": "2019-08-04T21:14:17.196Z",
        "updated_at": "2019-08-05T16:08:44.803Z",
        "__v": 0
    }
}
```
### GET /comment/getall
response: Array
```
[
    
    {
        "_id": "5d41f9d7d6338633affd75c2",
        "title": "Fresh italian joy",
        "text": "Fresh yoga flavored cake directly from Italy",
        "edited": true,
        "liked": 6,
        "author": {
            "level": "yogi",
            "picture": "http://res.cloudinary.com/ironhack55/image/upload/v1564690468/yoga-one/Tim_HQ.jpg.jpg",
            "_id": "5d41bb1047c6142e39b5fd27",
            "username": "coolboy88",
            "password": "$2a$10$/Kzzbjr9/8hv/k0zs1njie7RoShwW95gfipZ4rUzoElG24vOb4oK.",
            "firstName": "Garryson old soul",
            "lastName": "Goodboy guru ",
            "created_at": "2019-07-31T16:00:16.693Z",
            "updated_at": "2019-08-01T20:14:30.859Z",
            "__v": 0
        },
        "created_at": "2019-07-31T20:28:07.557Z",
        "updated_at": "2019-07-31T21:06:31.685Z",
        "__v": 0
    }
]
```
populates authors

### GET /comment/getbyid/:id
populates author object
response
```
{
    "_id": "5d41f9d7d6338633affd75c2",
    "title": "Fresh french joy",
    "text": "Fresh yoga flavored cake directly from Germany",
    "edited": false,
    "liked": 2,
    "author": {
        "level": "yogi",
        "picture": "http://res.cloudinary.com/ironhack55/image/upload/v1564596679/yoga-one/ag1brbljxx.jpg.jpg",
        "_id": "5d41bb1047c6142e39b5fd27",
        "username": "coolboy55",
        "password": "$2a$10$/Kzzbjr9/8hv/k0zs1njie7RoShwW95gfipZ4rUzoElG24vOb4oK.",
        "firstName": "Garry",
        "lastName": "Goodridge",
        "created_at": "2019-07-31T16:00:16.693Z",
        "updated_at": "2019-07-31T18:11:20.031Z",
        "__v": 0
    },
    "created_at": "2019-07-31T20:28:07.557Z",
    "updated_at": "2019-07-31T20:28:07.557Z",
    "__v": 0
}
```
### POST /comment/create
- expects
```
    title: String,
    text: String,
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    edited: Boolean,
    liked: Number,
```
- response
```
{
    "message": "New comment created successfully",
    "newComment": {
        "_id": "5d41f9d7d6338633affd75c2",
        "title": "Fresh french joy",
        "text": "Fresh yoga flavored cake directly from Germany",
        "edited": false,
        "liked": 2,
        "author": "5d41bb1047c6142e39b5fd27",
        "created_at": "2019-07-31T20:28:07.557Z",
        "updated_at": "2019-07-31T20:28:07.557Z",
        "__v": 0
    }
}
```
### POST /comment/deletebyid/:id
response
```
{
    "message": "Comment deleted"
}
```

### POST /comment/updatebyid/:id
- response
```
{
    "message": "Comment successfully updated",
    "updatedComment": {
        "_id": "5d41f9d7d6338633affd75c2",
        "title": "Fresh italian joy",
        "text": "Fresh yoga flavored cake directly from Italy",
        "edited": true,
        "liked": 6,
        "author": "5d41bb1047c6142e39b5fd27",
        "created_at": "2019-07-31T20:28:07.557Z",
        "updated_at": "2019-07-31T21:06:31.685Z",
        "__v": 0
    }
}
```
- sets "edited" to true, then passes the whole req.body to update DB

### GET /faq/getall
- response
Array of objects
```
  {
        "_id": "5d43597b9913634083fe92d1",
        "question": "Can I practice yoga if I’m not flexible?",
        "answer": "Absolutely! We do not practice yoga because we are flexible, we are flexible because we practice yoga. 
        "__v": 0
    }
```

### POST /faq/create
- expects
```
question: String,
answer: String,
```
- response
```
{
    "message": "FAQ created successfully",
    "newFAQ": {
        "_id": "5d435dd1274ce740de552ae9",
        "question": "Can yoga help me lose weight?",
        "answer": "Yes, yoga can help you lose weight. The gentle postures coupled with",
        "__v": 0
    }
}
```
### POST /faq/data/seed/faq
- expects
```
key : coolboy55
```
- seeds the DB with FAQs from json in /bin
### POST /faq/deletebyid/:id
response
```
{
    "message": "Deleted successfully"
}
```
### POST /faq/updatebyid/:id
- expects:
    - question
    - answer
response
```
{
    "message": "Updated successfully",
    "updated": {
        "_id": "5d443cb87d070a42db85717b",
        "question": "new 2123",
        "answer": " 213",
        "__v": 0
    }
}
```
### GET /testimonial/getall
response: array
```
[
    {
        "picture": "http://res.cloudinary.com/ironhack55/image/upload/v1564763813/yoga-one/PHOTO-2019-05-23-16-29-37-1.jpg.jpg",
        "_id": "5d4466a581ac96ebf5082e5b",
        "text": "blablabla",
        "author": "Person 123",
        "attended": "this class",
        "rating": "5/5",
        "__v": 0
    }
]
```

### POST /testimonial/create
- expects:
```
    text: String,
    author: String,
    attended: String,
    rating: String,
```
- response
```
{
    "message": "Created testimonial successfully",
    "newTestimonial": {
        "picture": "http://res.cloudinary.com/ironhack55/image/upload/v1564763813/yoga-one/PHOTO-2019-05-23-16-29-37-1.jpg.jpg",
        "_id": "5d4466a581ac96ebf5082e5b",
        "text": "blablabla",
        "author": "Person 123",
        "attended": "this class",
        "rating": "5/5",
        "__v": 0
    }
}
```

### POST /testimonial/deletebyid/:id
response:
```
{
    "message": "Deleted successfully"
}
```
### POST /testimonial/updatebyid/:id
response:
```
{
    "message": "Updated successfully",
    "updatedTestimonial": {
        "picture": "https://res.cloudinary.com/ironhack55/image/upload/v1564588169/default-profile_tlj5l0.png",
        "_id": "5d44672d81ac96ebf5082e5c",
        "text": "updated",
        "author": "updated",
        "attended": "updated",
        "rating": "5/5",
        "__v": 0
    }
}
```
### POST /testimonial/data/seed/testimonials
- expects
```
key: coolboy55
```
- seeds the DB with testimonials from bin/testimonials.json

### GET /galleryitem/getall
response: Array of objects like this
```
 {
        "picture": "https://images.unsplash.com/photo-1524863479829-916d8e77f114?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=220&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9",
        "category": [
            "beginners stuff",
            "new",
            "other",
            "fresh"
        ],
        "_id": "5d4719e23cf6824a094d910f",
        "video": "https://www.youtube.com/embed?v=CIbR7odQklk",
        "title": "yoga video",
        "text": "description",
        "__v": 0
    }
```

### GET /galleryitem/getbyid/:id
response
```
{
    "picture": "https://images.unsplash.com/photo-1524863479829-916d8e77f114?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=220&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9",
    "category": [
        "beginners stuff",
        "other"
    ],
    "_id": "5d4719763cf6824a094d910c",
    "video": "https://www.youtube.com/embed?v=CIbR7odQklk",
    "title": "yoga video",
    "text": "description",
    "__v": 0
}
```

### POST /galleryitem/create
response
```
{
    "message": "Gallery Item created successfully",
    "newGalleryItem": {
        "picture": "https://images.unsplash.com/photo-1524863479829-916d8e77f114?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=220&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9",
        "category": [
            "beginners stuff",
            "new",
            "other",
            "fresh"
        ],
        "_id": "5d4719e23cf6824a094d910f",
        "video": "https://www.youtube.com/embed?v=CIbR7odQklk",
        "title": "yoga video",
        "text": "description",
        "__v": 0
    }
}
```
- expects
   - picture: String or will assign default picture
    category: comma separated String of categories. Will store each category as an element of the array
   - video: Sting - link from youtube. Will replace "watch?v=" with "embed/" so the video can be embeded on the website
### POST /galleryitem/deletebyid/:id
### POST /galleryitem/updatebyid/:id
### POST /galleryitem/data/seed/galleryitem 
- expects
```
key: coolboy55
```
- seeds DB with gallery items from /bin/galleryItemStorage.json 

### POST /galleryitem/likebyid/:id
- expects
direction
"add" or "remove"
- userID
response
#### add
```
{
    "message": "Liked successfully",
    "updatedGalleryItem": {
        "picture": "http://res.cloudinary.com/ironhack55/image/upload/v1564964075/yoga-one/artem-startup-life.PNG.png",
        "category": [
            "collboy",
            "check this out"
        ],
        "likedBy": [
            "5d474aa9e675bd4c39d5acca"
        ],
        "_id": "5d475f42dae1474f140da49e",
        "__v": 0,
        "text": "Relaxing music that helps to concentrate",
        "title": "Simple Map"
    }
}
```
#### remove
```
{
    "message": "Like removed successfully",
    "updatedGalleryItem": {
        "picture": "http://res.cloudinary.com/ironhack55/image/upload/v1564964075/yoga-one/artem-startup-life.PNG.png",
        "category": [
            "collboy",
            "check this out"
        ],
        "likedBy": [
            "5d474aa9e675bd4c39d5acca"
        ],
        "_id": "5d475f42dae1474f140da49e",
        "__v": 0,
        "text": "Relaxing music that helps to concentrate",
        "title": "Simple Map"
    }
}
```

