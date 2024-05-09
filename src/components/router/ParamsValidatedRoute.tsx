import { Navigate, useParams } from 'react-router-dom';
import { ROUTES } from 'router';
import { FC } from 'react';
import { FCWithChildren } from 'types';

type ParamsValidatedRouteProps = {
  paramName: string;
  recordToCheck: Record<string, string>;
} & FCWithChildren;

const ParamsValidatedRoute: FC<ParamsValidatedRouteProps> = ({
  children,
  paramName,
  recordToCheck,
}) => {
  const { [paramName]: paramValue } = useParams();
  const isRouteValid = paramValue && recordToCheck[paramValue];

  return isRouteValid ? children : <Navigate to={ROUTES.root.path} replace />;
};

export default ParamsValidatedRoute;
