import { withRouter } from 'react-router-dom';
import React from 'react';
// this also works with react-router-native

const Redirect = withRouter(({ history }) => (
  <button
    type='button'
    onClick={() => { history.push('/home') }}
  >
    Click Me!
  </button>
))

export default Redirect;
