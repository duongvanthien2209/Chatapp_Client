import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoute = ({ path, component: Component }) => (
  <Route path={path} component={Component} />
);

PublicRoute.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  path: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.object.isRequired,
};

export default PublicRoute;
