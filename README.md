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
      defaultRole="viewer"
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

Route typing:

```ts
type Route = {
  path?: string;
  index?: boolean;
  element?: ReactElement;
  roles?: string[];
  params?: any;
  children?: Route[];
}
```

For more information about routes, visit the official [react-router-dom](https://reactrouter.com/docs/en/v6/getting-started/overview) documentation

## ReactRouterContext

### Properties

- <b>routes</b>: Property that receives the list of route objects that will be mapped for navigation.
- <b>defaultRole (Optional)</b>: Property used to inform the default role, for route access validation.
- <b>browserRouterConfig (Optional)</b>: Property used to override `BrowserRouter` component parameters.

## Hooks

### useRoutes()

This hook is used to access the list of routes from any functional component, which is linked to the component `ReactRouterContext`

```ts
// HomePage.tsx
import { useRoutes } from 'react-router-context';
import { Link } from 'react-router-dom';

function HomePage() {
  const routes = useRoutes<{ title: string }>();

  return (
    <div>
      <ul>
        {routes
          .filter((item) => !!item.params)
          .map((item, i) => (
            <li Key={String(i)}>
              <Link to={item.path}>
                {item.params.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default HomePage;
```

### useRouteRole()

This hook is used to set the role of the current client, it helps in creating rules for page access permissions.

```ts
// LoginPage.tsx
import { useRouteRole } from 'react-router-context';

...

const [role, setRole] = useRouteRole();

async function singIn(values: FormValues) {
  await authService.access(values)
    .then((response) => {
      setRole(response.user.role);
      navigate('/panel');
    })
    .catch(() => {
      setRole('viewer');
      navigate('/')
    });
}

...

```

