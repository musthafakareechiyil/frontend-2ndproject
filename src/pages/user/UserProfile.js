import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { useSelector } from 'react-redux';
import { UserAxios } from '../../config/Header_request';
import { UserUrl } from '../../APIs/BaseUrl';
import axios from 'axios';
import { cloudinary_url } from '../../APIs/Cloudinary_url';
import { faComment, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import ShowItem from '../../components/ShowItem';
import useFollowUnfollow from '../../components/useFollowUnfollow.js';
import useToggleLike from '../../components/useTogleLike';
import Followers from '../../components/Followers';
import Following from '../../components/Following';
import Chat from '../../components/Chat';

function UserProfile() {
  const [ selectedFeed, setSelectedFeed ] = useState('')
  const [ showProfileItem, setShowProfileItem ] = useState(false)
  const userAxios = UserAxios();
  const [ userData, setUserData ] = useState(null);
  const currentUser = useSelector((state) => state?.userDetails?.user);
  const [ currentDp, setCurrentDp ] = useState();
  const { username } = useParams()
  const {followUser, unfollowUser} = useFollowUnfollow([], false, setUserData)
  const { toggleLike } = useToggleLike()
  const [likedPosts, setLikedPosts] = useState([]);
  const [ showFollowers, setShowFollowers ] = useState(false)
  const [ selectedUser, setSelectedUser ] = useState(null)
  const [ showFollowing, setShowFollowing ] = useState(false)
  const [ showChats, setShowChats ] = useState(false)
  const [ showSaved, setShowSaved ] = useState(false)
  const [ savedPostData, setSavedPostData ] = useState(null)

  console.log(userData, 'user data consoling from profile')

  const handleToggleLike = async (postId) => {
    try {
      await toggleLike(postId, 'Post');
  
      // Check if the post is already in the likedPosts array.
      const isLiked = likedPosts.includes(postId);
  
      if (isLiked) {
        setLikedPosts(likedPosts.filter((id) => id !== postId));
      } else {
        setLikedPosts([...likedPosts, postId]);
      }
    } catch (error) {
      console.error("Error toggling like", error);
    }
  };
  

  const handleDelete = (feedItemId) => {
    if(userData) {
      const updatedPosts = userData?.posts?.filter((post) => post?.id !== feedItemId)
      setUserData((preUserData) => ({
        ...preUserData,
        posts: updatedPosts,
      }))
    }
  }

  const closeModal = () => {
    setShowProfileItem(false)
    setShowFollowers(false)
    setShowFollowing(false)
    setShowChats(false)
  }

  const updateLocalStorageProfileUrl = (newProfileUrl) => {
    const userData = JSON.parse(localStorage.getItem('user'))
    if(userData){
      userData.profile_url = newProfileUrl;
      localStorage.setItem('user',JSON.stringify(userData))
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await userAxios.get(UserUrl+`user/${username}`)
        setUserData(response?.data);
        const initialLikedPosts = response.data.posts
          .filter((post) => post.liked)
          .map((post) => post.id)
        setLikedPosts(initialLikedPosts)
      } catch (error) {
        console.error('Error fetching user data ', error);
      }
    }
    fetchUserData();
    // eslint-disable-next-line
  }, [username]);

  const handleProfilePicChange = async (e) => {
    const selectedProfilePic = e.target.files[0];
    if (selectedProfilePic) {
      try {
        const data = new FormData();
        data.append('file', selectedProfilePic);
        data.append('upload_preset', 'V_world');
        data.append('cloud_name', 'dbpcfcpit');

        const response = await axios.post(cloudinary_url, data);
        const imageUrl = response.data.url;

        // Update the profile picture URL in the state
        setCurrentDp(imageUrl);

        // Send a patch request to update the profile URL on the server if needed
        await userAxios.patch(`${UserUrl}update_profile`, {
          profile_url: imageUrl,
        });

        updateLocalStorageProfileUrl(imageUrl)

        console.log('Profile picture uploaded successfully');
      } catch (error) {
        console.error('Error uploading profile picture', error);
      }
    }
  };

  const showSavedPosts = async() => {
    try {
      const response = await userAxios.get(UserUrl+ '/saved_posts')
      console.log("consoling saved posts response", response)
      setSavedPostData(response.data)
    }catch(e){
      console.error("Error while showing saved posts", e)
    }
  }

  return (
    <div className="bg-gray-800 w-screen h-screen text-white flex">

      {/* Sidebar component */}
      <Sidebar type="user" styleprop="profile" />

      {/* profile page */}
      <div className="w-4/5 h-screen p-4 flex flex-col justify-center items-center md:w-full">

        {/* profile head details section */}
        <div className="w-9/12 h-96 flex flex-col justify-center items-center border-b">

          {/* Profile pic */}
          <div className="w-48 h-48 flex justify-center items-center">
          { username === currentUser.username? (
            <img
              src={currentDp || userData?.user.profile_url}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover"
              onClick={() => document.getElementById('profilepic').click()}
            />
          ):(
            <img
              src={userData?.user.profile_url}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover"
            />
          )}

            <input
              type="file"
              id="profilepic"
              accept="image"
              style={{ display: 'none' }}
              onChange={handleProfilePicChange}
            />
          </div>

          {/* Username */}
          <h1 className="text-2xl font-semibold mt-2 mb-3">{userData?.user.username}</h1>

          {/* Edit and View Archive Buttons */}
          <div className="flex mt-4">

            {/* edit profile button if currentUser */}
            {currentUser.username === username && (
              <button
                className={`text-gray-200 mr-4 px-4 py-1 cursor-pointer rounded-md w-32 ${
                  username === currentUser.username
                    ? 'bg-gray-600 hover:bg-gray-700'
                    : 'bg-indigo-600 hover:bg-indigo-800'
                }`}
              >
                Edit Profile
              </button>
            )}

            {/* follow and unfollow button */}
            {!currentUser.is_following && userData?.user?.username !== currentUser.username && (
              <button
                className="text-gray-200 mr-4 px-4 py-1 cursor-pointer rounded-md w-32 bg-blue-600 hover:bg-blue-800"
                onClick={() => {
                  if (userData?.is_following) {
                    unfollowUser(userData?.user.username);
                  } else {
                    followUser(userData?.user.username);
                  }
                }}
              >
                {userData?.is_following ? 'Following' : 'Follow'}
              </button>
            )}

            {/* view archive or Message button */}
              {username === currentUser.username ? (
                <button
                  className={'text-gray-200 mr-4 px-4 py-1 cursor-pointer rounded-md w-32 bg-gray-600 hover:bg-gray-700'}
                  onClick={() => { setShowSaved(!showSaved);
                    showSavedPosts();
                  }}
                > {showSaved ? 'My Posts' : 'Show Saved'}
                </button>
              ): (
                <button
                  className={'text-gray-200 mr-4 px-4 py-1 cursor-pointer rounded-md w-32 bg-gray-600 hover:bg-gray-700'}
                  onClick={()=> setShowChats(true)}
                > Message
                </button>
              )}

          </div>

          {/* posts following followers */}
          <div className="flex mt-6">

            {/* post count */}
            <div className="mr-6 text-center">
              <p className="font-semibold">{userData?.post_count}</p>
              <p className="text-gray-400">Posts</p>
            </div>

            {/* followers count */}
            <div className="mr-6 text-center cursor-pointer"
              onClick={() => {
                setShowFollowers(true)
                setSelectedUser(userData?.user)
              }}
            >
              <p className="font-semibold">{userData?.followers_count}</p>
              <p className="text-gray-400">Followers</p>
            </div>
            
            {/* following count */}
            <div className="text-center mb-9 cursor-pointer"
              onClick={() => {
                setShowFollowing(true)
                setSelectedUser(userData?.user)
              }}
            >
              <p className="font-semibold">{userData?.following_count}</p>
              <p className="text-gray-400">Following</p>
            </div>

          </div>

        </div>

        {/* profile posts show section */}
        <div className='w-9/12 h-4/5 mt-10 overflow-y-scroll grid-cols-4 grid gap-2'>
          {userData && showSaved === false ?
            (userData?.posts?.map((post) => (
              <div className='relative' key={post?.id}>
                <div style={{ paddingBottom: '100%' }} onClick={()=> {
                  setSelectedFeed(post)
                  console.log(post,'post from the userprfile')
                  setShowProfileItem(true)
                  }}
                  // hower image in mouseEnter and Leave
                  onMouseEnter = { () => {
                    const tooltip = document.getElementById(`tooltip-${post.id}`)
                    if (tooltip) {
                      tooltip.style.display = 'block';
                    }
                  }}
                  
                  // Hide on mouse leave
                  onMouseLeave={() => {
                    const tooltip = document.getElementById(`tooltip-${post.id}`);
                    if (tooltip) {
                      tooltip.style.display = 'none';
                    }
                  }}
                >
                  {post?.post_url.toLowerCase().endsWith('.mp4') ? (
                    // Render video for .mp4 files
                    <div>
                      <video
                        src={post?.post_url}
                        alt='Video'
                        className='absolute inset-0 w-full h-full object-cover'
                      />
                      <FontAwesomeIcon icon={faPlay} className='absolute m-3 '/>
                    </div>
                  ) : (
                    // Render image for other file types
                    <img
                      src={post?.post_url}
                      alt='post'
                      className='absolute inset-0 w-full h-full object-cover'
                    />
                  )}

                  {/* hidden tooltip with like and commment counts */}
                  <div
                    id={`tooltip-${post.id}`}
                    className="h-full w-full hidden text-white p-2 absolute backdrop-brightness-75"
                  >
                    <div className='flex justify-center items-center h-full'>

                      {/* like buttons and count */}
                      <div className='flex items-center'
                      >
                        { likedPosts.includes(post.id) ? (
                          <span className='flex '>
                            <lord-icon
                              src="https://cdn.lordicon.com/igciyimj.json"
                              trigger="hover"
                              colors="primary:#c71f16,secondary:#c71f16,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#f24c00,senary:#ebe6ef"
                              style={ {width:'25px'} }
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleLike(post.id)
                                if (likedPosts.includes(post.id)) {
                                  post.likes_count -= 1
                                }else{
                                  post.likes_count += 1
                                }
                              }}
                            />
                            <p className='font-bold mt-1 ml-1'>{post?.likes_count}</p>
                          </span>
                        ):(
                          <span className='flex'>
                            <lord-icon
                              src="https://cdn.lordicon.com/igciyimj.json"
                              trigger="hover"
                              colors="primary:#ffffff,secondary:#ffffff,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#f24c00,senary:#ebe6ef"
                              style={ {width:'25px'} }
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleLike(post.id)
                                if (likedPosts.includes(post.id)) {
                                  post.likes_count -= 1
                                }else{
                                  post.likes_count += 1
                                }
                              }}
                            />
                            <p className='font-bold mt-1 ml-1'>{post?.likes_count}</p>
                          </span>  

                        )}
                      </div>

                      {/* comment button and count (no action on button) */}
                      <div className='ml-2 flex items-center'>
                        <FontAwesomeIcon icon={faComment} className='h-5 w-5 mr-2'/> 
                        <p className='font-bold'>{post?.comments_count}</p>
                      </div>
                    </div>
                  </div>
                            
                </div>
              </div>
            ))):(savedPostData?.map((post) => (
              <div className='relative' key={post?.id}>
                <div style={{ paddingBottom: '100%' }} onClick={()=> {
                  setSelectedFeed(post.post)
                  console.log(post,'post from the userprfile')
                  setShowProfileItem(true)
                  }}
                  hower image in mouseEnter and Leave
                  onMouseEnter = { () => {
                    const tooltip = document.getElementById(`tooltip-${post.id}`)
                    if (tooltip) {
                      tooltip.style.display = 'block';
                    }
                  }}
                  
                  // Hide on mouse leave
                  onMouseLeave={() => {
                    const tooltip = document.getElementById(`tooltip-${post.id}`);
                    if (tooltip) {
                      tooltip.style.display = 'none';
                    }
                  }}
                >
                  {post?.post?.post_url.toLowerCase().endsWith('.mp4') ? (
                    // Render video for .mp4 files
                    <div>
                      <video
                        src={post?.post?.post_url}
                        alt='Video'
                        className='absolute inset-0 w-full h-full object-cover'
                      />
                      <FontAwesomeIcon icon={faPlay} className='absolute m-3 '/>
                    </div>
                  ) : (
                    // Render image for other file types
                    <img
                      src={post?.post?.post_url}
                      alt='post'
                      className='absolute inset-0 w-full h-full object-cover'
                    />
                  )}

                  {/* hidden tooltip with like and commment counts */}
                  <div
                    id={`tooltip-${post.id}`}
                    className="h-full w-full hidden text-white p-2 absolute backdrop-brightness-75"
                  >
                    <div className='flex justify-center items-center h-full'>

                      {/* like buttons and count */}
                      {/* <div className='flex items-center'
                      >
                        { likedPosts.includes(post.id) ? (
                          <span className='flex '>
                            <lord-icon
                              src="https://cdn.lordicon.com/igciyimj.json"
                              trigger="hover"
                              colors="primary:#c71f16,secondary:#c71f16,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#f24c00,senary:#ebe6ef"
                              style={ {width:'25px'} }
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleLike(post.id)
                                if (likedPosts.includes(post.id)) {
                                  post.likes_count -= 1
                                }else{
                                  post.likes_count += 1
                                }
                              }}
                            />
                            <p className='font-bold mt-1 ml-1'>{post?.likes_count}</p>
                          </span>
                        ):(
                          <span className='flex'>
                            <lord-icon
                              src="https://cdn.lordicon.com/igciyimj.json"
                              trigger="hover"
                              colors="primary:#ffffff,secondary:#ffffff,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#f24c00,senary:#ebe6ef"
                              style={ {width:'25px'} }
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleLike(post.id)
                                if (likedPosts.includes(post.id)) {
                                  post.likes_count -= 1
                                }else{
                                  post.likes_count += 1
                                }
                              }}
                            />
                            <p className='font-bold mt-1 ml-1'>{post?.likes_count}</p>
                          </span>  

                        )}
                      </div> */}

                      {/* comment button and count (no action on button) */}
                      {/* <div className='ml-2 flex items-center'>
                        <FontAwesomeIcon icon={faComment} className='h-5 w-5 mr-2'/> 
                        <p className='font-bold'>{post?.comments_count}</p>
                      </div> */}
                    </div>
                  </div>
                            
                </div>
              </div>
            )))}
        </div> 
        
        {/* rendering the ShowItem component */}
        { showProfileItem && (
          <ShowItem feedItem = { selectedFeed } closeModal = { closeModal } userData = { userData } onDelete={ handleDelete } from = "userProfile"/>
        )}

        {/* Follwers component */}
        { showFollowers && (
          <Followers closeModal={closeModal} user = {selectedUser}/>
        )}

        {/* following component */}
        { showFollowing && (
          <Following closeModal={closeModal} user = { selectedUser}/>
        )}

        {/* show chat component */}
        { showChats && (
          <Chat closeModal={closeModal} userData={userData?.user}/>
        )}

      </div>
      
    </div>
  );
}

export default UserProfile;
