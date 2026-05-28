import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { HomePage } from '@/pages/homepage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // Add other routes here, e.g.:
      // { path: 'about', element: <AboutPage /> },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
], {
  basename: import.meta.env.DEV ? '/' : '/i5_20',
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;



