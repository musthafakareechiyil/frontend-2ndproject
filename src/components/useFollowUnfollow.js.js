import { useState } from "react"
import { UserAxios } from "../config/Header_request";
import { UserUrl } from "../APIs/BaseUrl";

const useFollowUnfollow = (initialFollowingUsers, shouldFilter = true, setUserData) => {
  const [followingUsers, setFollowingUsers] = useState(shouldFilter ? initialFollowingUsers : []);

  const userAxios = UserAxios();

  // follow user
  const followUser = async (username) => {
    try {
      await userAxios.post(UserUrl + `${username}/follow_user`);
      // Add the followed user to the followingUsers state
      setFollowingUsers([...followingUsers, username]);

      // from user profile
      if (setUserData){
        setUserData((prevUserData) => ({ ...prevUserData, is_following: true ,followers_count: prevUserData.followers_count + 1}));
      }
    } catch (error) {
      console.error("Error while following user:", error);
      throw error;
    }
  };

  // unfollow user
  const unfollowUser = async (username) => {
    try {
      const confirmUnfollow = window.confirm(`Are you sure you want to unfollow ${username}`);
      if (confirmUnfollow) {
        const response = await userAxios.post(UserUrl + `${username}/unfollow_user`);
        console.log(response);
        // Remove the unfollowed user from the followingUsers state
        setFollowingUsers(followingUsers.filter((user) => user !== username));

        // for profile follow and unfollow
        if(setUserData){
          setUserData((prevUserData) => ({ ...prevUserData, is_following: false, followers_count: prevUserData.followers_count - 1 }));
        }
      }
    } catch (error) {
      console.error("Error while unfollowing user", error);
      throw error;
    }
  };

  return { followingUsers, followUser, unfollowUser };
};


export default useFollowUnfollow;
