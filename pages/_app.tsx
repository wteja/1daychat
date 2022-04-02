import type { AppProps } from 'next/app'
import '../assets/styles/reset.scss';
import '../assets/styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
