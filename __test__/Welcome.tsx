import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './../src/components/Welcome';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Welcome name="John Doe"/>, div);
  ReactDOM.unmountComponentAtNode(div);
});