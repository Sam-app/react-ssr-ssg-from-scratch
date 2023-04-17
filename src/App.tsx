import { Link, Route, Routes } from 'react-router-dom';
import React from 'react';

const PagePathsWithComponents = import.meta.glob('./pages/*.tsx', { eager: true });

const routes = Object.keys(PagePathsWithComponents).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.tsx$/)![1];
  return {
    name,
    path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
    component: PagePathsWithComponents[path].default,
  };
});

export function App() {
  return (
    <div>
      <nav>
        <ul>
          {routes.map((route) => (
            <li key={route.name}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Routes>
        {routes.map((route) => (
          <Route key={route.name} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </div>
  );
}