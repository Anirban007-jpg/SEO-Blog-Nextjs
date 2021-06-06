import Document, { Html, Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()

class MyDocument extends Document {
  
  // setGoogleTags() {
  //   if(publicRuntimeConfig.PRODUCTION) {
  //     return {
  //       __html:
  //       window.dataLayer = window.dataLayer || [];
  //       function gtag(){dataLayer.push(arguments);}
  //       gtag('js', new Date());
      
  //       gtag('config', 'G-4T0FJGYHG9');
  //     };
  //   }
  // }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
          />
          {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" /> */}
          <link rel="stylesheet" hre="/static/css/styles.css" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-4T0FJGYHG9"></script>
          {/* <script dangerouslySetInnerHTML={this.setGoogleTags()}></script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;