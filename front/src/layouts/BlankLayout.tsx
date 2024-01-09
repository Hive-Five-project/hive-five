import { PropsWithChildren } from 'react';

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
  </header>;
}
