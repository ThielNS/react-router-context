# React Router Context

A React router wrapper based on React Context API

## Installation

```shell
$ npm install react-router-context
```
Or
```shell
$ yarn add react-router-context
```

## How to use

```ts
import { ReactRouterContext } from 'react-router-context';
import { HomePage, UsersPage, UserDetailPage } from '@pages';

function App(){
  return (
    <ReactRouterContext
      defaultRole="user"
      routes={[
        { path: '/', element: <HomePage />, params: { title: 'Home'} }
        {
          path: 'users',
          roles: ['admin']
          element: <UsersPage />,
          children: [
            { path: ':userId', element: <UserDetailPage /> }
          ]
        }
      ]}
    />
  )
}

export default App;
```

For more information about routes, visit the official [react-router-dom](https://reactrouter.com/docs/en/v6/getting-started/overview) documentation

## ReactRouterContext

### Properties

- routes:
- defaultRole:
- browserRouterConfig:

## Hooks

### useRoutes()

### useRouteRole()
