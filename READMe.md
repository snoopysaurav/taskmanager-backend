
# Taskmanager

Taskmanager is a backend project which consist of following features:

- Signup and Signin
- Role based Authorization
- Create, Read, Update, Delete task


## Run Locally

Clone the project

```bash
  git clone https://github.com/snoopysaurav/taskmanager-backend
```

Go to the project directory

```bash
  cd taskmanager-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment variables

```
# Server
PORT = 

# DB Config
DB_HOST= 
DB_USERNAME= 
DB_PASSWORD= 
DB_NAME= 

# JWT
JWT_SECRET=
```


## API Reference

#### Signup

```http
  GET /signup
```

#### Signin

```http
  GET /
```

#### Get task

```http
  GET /api/task/
```

#### Get single task

```http
  GET /api/task/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of item to fetch |



