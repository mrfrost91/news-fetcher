import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
} from 'react-router-dom';
import { ParamsValidatedRoute } from 'components/router';
import { NewsFeed } from 'components/NewsFeed';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { MainContainer } from 'layout/MainContainer';
import { ScrollTop } from 'components/ScrollTop';
import { API_SLUGS } from 'api';
import { ROUTE_PARAMS, ROUTES, SOURCE_ROUTES } from './routes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <>
          <Header />
          <MainContainer>
            <Outlet />
          </MainContainer>
          <Footer />
          <ScrollTop />
        </>
      }
    >
      <Route path={`${ROUTES.newsFeed.path}/${ROUTES.any.path}`}>
        <Route
          path={ROUTE_PARAMS.source.param}
          element={
            <ParamsValidatedRoute paramName={ROUTE_PARAMS.source.slug} recordToCheck={API_SLUGS}>
              <NewsFeed />
            </ParamsValidatedRoute>
          }
        />
        <Route
          path={ROUTES.any.path}
          element={<Navigate to={`../${SOURCE_ROUTES.theGuardian.path}`} replace />}
        />
      </Route>
      <Route path={ROUTES.any.path} element={<Navigate to={ROUTES.newsFeed.path} replace />} />
    </Route>,
  ),
);

export default router;
