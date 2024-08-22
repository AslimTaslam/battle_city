import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { GlobalStyle } from 'src/styles/global';
import AppRoutes from 'src/routes';

const App: FC = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
};

export default App;
