import { faComment, faEllipsisVertical, faHeart, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { UserUrl } from '../APIs/BaseUrl';
import { useSelector } from 'react-redux';
import { UserAxios } from '../config/Header_request';

function FeedItem() {
  const [liked, setLiked] = useState(false);
  const [muted, setMuted] = useState(true)
  const currentUser = useSelector((state) => state?.userDetails?.user);
  const userAxios = UserAxios();
  const [feeds, setFeeds] = useState([]);
  const videoRef = useRef(null)
  const videoIntersectionObserver = useRef(null)

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleVideoClick = () => {
    if (videoRef.current){
      videoRef.current.muted = !videoRef.current.muted
      setMuted(videoRef.current.muted)
    }
  }

  const handleVideoIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting){
        entry.target.play()
      }else{
        entry.target.pause()
      }
    })
  }

  useEffect(() => {
    const feedData = async () => {
      try {
        const response = await userAxios.get(UserUrl + 'posts');
        console.log(response.data);
        setFeeds(response.data);
      } catch (error) {
        console.error("error while fetching feed data", error);
      }
    };
    feedData();

    videoIntersectionObserver.current = new IntersectionObserver(handleVideoIntersection,{
      root: null,
      threshold: 0.5
    })

    return () => {
      if (videoIntersectionObserver.current){
        videoIntersectionObserver.current.disconnect()
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {feeds &&
        feeds.map((feed) => (
          <div className="bg-gray-900 text-white p-1 mx-24 mt-9 shadow-2xl rounded-lg" key={feed.id}>
            <div className="flex justify-between items-center">
              <div className="flex items-center ms-3 mt-2 mb-3">
                <img
                  src={currentUser.profile_url}
                  alt="User Profile"
                  className="w-9 h-9 rounded-full object-cover mr-2"
                />
                <span className="font-semibold">{currentUser.username}</span>
              </div>
              <div>
                <button className="text-white">
                  <svg className="h-6 w-6">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </svg>
                </button>
              </div>
            </div>
            {feed.post_url.toLowerCase().endsWith('.mp4') ? (
              // Render the video with mute control button
              <div>
                <video autoPlay muted={muted} controls={false} className="w-full" loop muteRef={videoRef} onClick={handleVideoClick}
                ref = {(el) => {
                  if (el) {
                    videoIntersectionObserver.current.observe(el)
                  }
                  videoRef.current = el;
                }}
              >
                  <source src={feed.post_url} type="video/mp4"/>
                </video>
                <button onClick={toggleMute} className="text-white">
                  {muted ? (
                    <FontAwesomeIcon icon={faVolumeMute} className="h-3 w-3 border rounded-full p-1 hover:bg-gray-700" />
                  ) : (
                    <FontAwesomeIcon icon={faVolumeUp} className="h-3 w-3 border rounded-full p-1 hover:bg-gray-700" />
                  )}
                </button>
              </div>
            ) : (
              // Render the image
              <img src={feed.post_url} alt="Post" className="w-full" />
            )}
            <div className="flex justify-between mt-4 mb-2 mx-2">
              <div>
                <button
                  className={`text-gray-200 ${liked ? 'text-red-500' : ''}`}
                  onClick={toggleLike}
                >
                  {liked ? (
                    <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000" }} className="h-6 w-6" />
                  ) : (
                    <FontAwesomeIcon icon={faHeart} className="h-6 w-6" />
                  )}
                </button>
                <button className="text-gray-200 ml-2">
                  <FontAwesomeIcon icon={faComment} flip="horizontal" className="h-6 w-6 ml-2" />
                </button>
              </div>
              <button className="text-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
    </>
  );
}

export default FeedItem;
