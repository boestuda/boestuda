import { lazy } from 'react';

const Home = lazy(() => import('@/screens/Home'));
const Entrar = lazy(() => import('@/screens/Entrar'));
const Cadastro = lazy(() => import('@/screens/Cadastro'));

const routes: Route[] = [
  {
    path: '*',
    component: Home
  },
  {
    path: '/',
    component: Home
  },
  {
    path: '/entrar',
    component: Entrar
  },
  {
    path: '/cadastro',
    component: Cadastro
  }
];

export default routes;
