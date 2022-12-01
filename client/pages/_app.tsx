import React from 'react';
import { AppProps } from 'next/app';

import { wrapper } from '../store/';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(MyApp);

// import React, { FC } from 'react';
// import { Provider } from 'react-redux';
// import { wrapper } from '../store/';
// import { AppProps } from 'next/app';

// const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
//   const { store, props } = wrapper.useWrappedStore(rest);
//   return (
//     <Provider store={store}>
//       <Component {...props.pageProps} />
//     </Provider>
//   );
// };

// export default MyApp;
