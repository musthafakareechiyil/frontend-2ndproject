import { useState } from "react"
import { UserAxios } from "../config/Header_request";
import { UserUrl } from "../APIs/BaseUrl";


const useFollowUnfollow = (initialFollowinUsers) => {
  const [followingUsers, setFollowingUsers] = useState(initialFollowinUsers)
  const userAxios = UserAxios();

  const followUser = async (username) => {
    try {
      const response = await userAxios.post(UserUrl + `${username}/follow_user`);
      console.log(response, "You have followed the user successfully");
      // Add the followed user to the followingUsers state
      setFollowingUsers([...followingUsers, username]);
    } catch (error) {
      console.error("Error while following user:", error);
      throw error
    }
  };

  // unfollow user

  const  unfollowUser = async (username) => {
    try {
      const confirmUnfollow = window.confirm(`Are you sure you want to unfollow ${username}`)
      if (confirmUnfollow) {
        const response = await userAxios.post(UserUrl + `${username}/unfollow_user`)
        console.log(response);
        // Remove the unfollowed user from the followingUsers state
        setFollowingUsers(followingUsers.filter(user => user !== username));
      }
    } catch (error) {
      console.error("Error while unfollowing user", error);
      throw error
    }
  }
  return { followingUsers, followUser, unfollowUser}
}

export default useFollowUnfollow;