import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import classes from './main-navigation.module.css';
import { redirect } from 'next/dist/server/api-utils';

function MainNavigation() {
  const { data: session, status } = useSession();
  if (status === 'authenticated') {
    console.log(`Signed in as ${session.user?.email}`);
  }
  // console.log('status: ', status);
  // console.log('session: ', session);

  const logoutHandler = () => {
    signOut();
  };
  return (
    <header className={classes.header}>
      <Link href="/" legacyBehavior>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && status !== 'loading' && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
