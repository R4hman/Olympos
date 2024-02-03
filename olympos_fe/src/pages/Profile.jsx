import { useEffect, useState } from "react";

import Account from "../components/userAccount/Account";
import UserProfile from "../components/reusable/UserProfile";
import { getUserDetails } from "../services/apiAuth";
import { CustomContainer } from "../theme";
import { useClientUsers } from "../features/users/useUsers";
import Loader from "../components/reusable/Loader";
import EmptyFavorite from "../components/reusable/EmptyFavorite";
import UserOrders from "../components/userAccount/UserOrders";

const Profile = () => {
  const [user, setUser] = useState(null);

  const { isClientUsersLoading } = useClientUsers();

  useEffect(() => {
    getUserDetails().then((data) => {
      if (data.first_name) {
        setUser(data);
      }
    });
  }, []);

  if (isClientUsersLoading) {
    return <Loader />;
  }

  return (
    <div>
      <CustomContainer>
        <UserProfile
          tabsData={[
            {
              label: "Profil",
              content: user && <Account user={user} />,
            },
            {
              label: "Sifarişlərim",
              content: (
                <div>
                  {user?.user_orders.length ? (
                    <UserOrders orders={user} />
                  ) : (
                    <EmptyFavorite />
                  )}
                </div>
              ),
            },
          ]}
        />
      </CustomContainer>
    </div>
  );
};

export default Profile;
