import { useSession, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // const router = useRouter();
  // const { data: session, status } = useSession();

  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   getSession().then(session => {
  //     if (!session) {
  //       router.push('/auth');
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, [session, router]);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }
  async function changePasswordHandler(passwordData) {
    console.log('before passwordData: ', passwordData);
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('after passwordData: ', passwordData);
    const data = await response.json();
    console.log('data of patch operation: ', data);
  }
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
