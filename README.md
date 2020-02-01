/api/user/ GET
only returns posts made by the currently logged in user
(i will get the id from the token)
{
    id: 0,
    username: 'example',
    password: 'example',
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