/*  2023-09-16 03:56:41

이번 75강 과제는, 
1. API 구축 부터 시작하는 게 좋겠다. 
   API 구조는 단순하지만, react-router 의 설정 코드에 거의 모든 것을 의존할 것이다. 

2. API Structure... 
GET /posts - Returns all of the posts
GET /posts/:id - Returns a single post
GET /posts/:id/comments - Returns all of the comments for a single post
GET /users - Returns all of the users
GET /users/:id - Returns a single user
GET /posts?userId=<userId> - Returns all of the posts for a single user
GET /todos - Returns all of the todos
GET /todos?userId=<userId> - Returns all of the todos for a single user


도전과제... 
*. 로컬에서 빌드된 API 에서 데이터를 fetch 해와서, 리액트 뷰를 구성해준다. 
1. Create a nav bar that contains links to the following pages:
    Posts
    Users
    Todos
2. Create a Posts page that renders out all of the posts from the API in a card based grid where each card contains the title, body, and a link to view the post.
3. Create a Users page that renders out all of the users from the API in a card based grid where each card contains the user name, company name, email, website, and a link to view the user.
4. Create a Todos page that renders out all of the todos from the API in a list where each item contains the todo title and is crossed off if completed.
5. Create a Post page that renders out the post title, and body.
6. Create a User page that renders out the user name, company name, email, website, and address.
/////////////////////////////////////////////////////////////////
[API]
1. API 는 사실, router 가 전부 아닐까?
    /posts - Returns all of the posts
    /posts/:id - Returns a single post
이 두가지 부터 접근해보자. 
전체 파일만 제공하고 있으니까, 일단 json 파일 전체를 읽어온 뒤에,
json.map() 으로, posts 데이터 만 추출해서 어레이로 리턴하는 코드로 해결할 수 있을 것 같다. 


[CLIENT]
1. <Navbar />
2. <Posts />
3. <Users />
4. <Todos />
5. <Post />
6. <User />

파일 트리 구조를 잘 잡아줘야겠다. 
이번 과제를 모두 담는 디렉토리를 하나 만들자. 
그렇게 하고, router 에서 디렉토리 위치 지정만 잘 해주면 될 것 같다. 

File Tree Structure
-[project75]-
    -Navbar.jsx
    -[pages]-
        Posts.jsx
        Post.jsx
        Users.jsx
        User.jsx
        Todos.jsx
        Todo.jsx
[api]
-router75.jsx
-index.jsx
-package.json

*/
