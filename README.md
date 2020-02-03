|| GET ||

/api/user/ GET
only returns posts made by the currently logged in user
(i will get the id from the token)
{
    id: 0,
    username: 'example',
    password: 'example',
    email: "example@xx.com"
    name: 'example',
    role: 'example',
    phone: 'example',
    numberOfChildren: 'example',
    location: 'example', 
    posts:[
        {
            id: 0,
            title: 'example 2',
            content: 'example',
            postedBy: 'example',
        },{
            id: 0,
            title: 'example 1',
            content: 'example',
            postedBy: 'example',
        },
    ]
}

/api/user/:id GET
only returns posts made by user specified in params
(this will be used to look at another users data)
{   
    id: 0,
    username: 'example',
    password: 'example',
    email: "example@xx.com"
    name: 'example',
    role: 'example',
    phone: 'example',
    numberOfChildren: 'example',
    location: 'example', 
    posts:[
        {
            id: 0,
            title: 'example 2',
            content: 'example',
            postedBy: 'example',
        },{
            id: 0,
            title: 'example 1',
            content: 'example',
            postedBy: 'example',
        },
    ]
}

/api/posts/:id/ GET
takes a posts unique id and returns that post and all comments on that post
{
    id: 0,
    title: 'example 1',
    content: 'example',
    postedBy: 'example',
    comments: [
        {
            id: 0,
            comment: 'example 2',
            postedBy: 'example'
        },{
            id: 0,
            comment: 'example 1',
            postedBy: 'example'
        },
    ]
}

/api/posts GET
gets all posts in chronological order most recent post first.
[
    {
        id: 0,
        title: 'example 3',
        content: 'example',
        postedBy: 'example',
    },{
        id: 0,
        title: 'example 2',
        content: 'example',
        postedBy: 'example',
    },{
        id: 0,
        title: 'example 1',
        content: 'example',
        postedBy: 'example',
    }
]

|| POST ||

/api/users/register
creates an account for the user

{
    username: 'example',
    password: 'example',
    email: "example@xx.com"
    name: 'example',
    role: 'example',
    phone: 'example',
    numberOfChildren: 'example',
    location: 'example', 
}


/api/users/login  POST
logs user in if the credentials are good and returns a token

{
    username: "example",
    password: "example"
}

/api/posts POST
will take the user id from the decoded token, and will autogenerate its own id
{
    title: 'example 3',
    content: 'example'
}

/api/posts/:id/comments POST
will get post id from the params and user id from the token

{
    comment: 'example'
}

api/user/ POST (register acct)

{
    username: 'example',
    password: 'example',
    name: 'example',
    role: 'example',
    phone: 'example',
    numberOfChildren: 'example',
    location: 'example'
}

|| PUT ||

/api/users PUT
can change any value on the profile of the currently logged in user gets id from the token


/api/posts/:id PUT
will get post id from the params :id === id of post that will be changed
{
    title: 'example 3',
    content: 'example'
}

/api/posts/:id/comments PUT
will get post id from the params :id === id of comment that will be changed

{
    comment: 'example'
}

|| DELETE ||

/api/posts/:id/comments DELETE
will get post id from the params :id === id of comment that will be removed

/api/posts/:id DELETE
will get post id from the params :id === id of post that will be removed

/api/users DELETE
deletes currently logged in acct. gets id from token.