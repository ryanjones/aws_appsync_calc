import * as React from 'react';

interface WelcomeProps {
  name: string,
}

const Welcome: React.FunctionComponent<WelcomeProps> = (props: WelcomeProps) => {
  return <h1>Hello, {props.name}</h1>;
};

export default Welcome;