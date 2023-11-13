import { PropsWithChildren } from 'react';
import hivefiveLogo from '@images/logo.png';

/**
 * Blank layout for the most simple pages (login, logout, transitions, …)
 */
export default function BlankLayout({ children }: PropsWithChildren) {

  return <>
    <Header />

    <main>
      {children}
    </main>
  </>;
}

function Header() {
  return <header>
    <img src={hivefiveLogo} alt="Hivefive LOGO"/>
  </header>;
}
