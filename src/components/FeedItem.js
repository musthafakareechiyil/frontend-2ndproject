import { faAnglesDown, faBookmark, faComment, faEllipsisVertical, faHeart, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { UserUrl } from '../APIs/BaseUrl';
import { UserAxios } from '../config/Header_request';
import FeedItemModal from './FeedItemModal';
import { setPosts } from '../Redux/feedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ShowItem from './ShowItem';
import useToggleLike from './useTogleLike';

function FeedItem() {
  const [ showItem, setShowItem ] = useState(false)
  // const [liked, setLiked] = useState(false);
  const [muted, setMuted] = useState(true)
  const userAxios = UserAxios();
  const videoRef = useRef(null)
  const videoIntersectionObserver = useRef(null)
  const [ page, setPage ] = useState(1)
  const [ commentsCount, setCommnetsCount ] = useState(null)
  const [ isOpen, setIsOpen ] = useState(false)
  const [ selectedFeed, setSelectedFeed ] = useState(null)
  const dispatch = useDispatch()
  const { toggleLike,liked } = useToggleLike()
  const feeds = useSelector((state) => state?.feedData?.feedItems)

  const closeModal = () => {
    setIsOpen(false)
    setSelectedFeed(null)
    setShowItem(false)
  }

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
      if (entry.isIntersecting) {
        const video = entry.target;

        // Check if the video can play
        if (video.readyState >= 2) {
          video.play();
        } else {
          // Listen for the 'canplay' event before playing
          video.addEventListener('canplay', () => {
            video.play();
          }, { once: true });
        }
      } else {
        entry.target.pause();
      }
    });
  }

  const loadMorePosts = async () => {
    try {
      const response = await userAxios.get(UserUrl + 'posts', {
        params: {
          page: page + 1,
        }
      });

      const newFeeds = response.data.posts;
      const newComments = response.data.comment_counts
      // setFeeds([...feeds, ...newFeeds]);
      setCommnetsCount({...commentsCount, ...newComments})
      setPage(page + 1);

      dispatch(setPosts(newFeeds))
    } catch (e) {
      console.error("Error loading more pages", e);
    }
  }

  // initial render of post (page one)
  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const response = await userAxios.get(UserUrl + 'posts', {
          params: {
            page: 1,
          }
        });

        dispatch(setPosts(response.data.posts))
      } catch (error) {
        console.error("error while fetching feed data", error);
      }
    };
    fetchInitialPosts();

    videoIntersectionObserver.current = new IntersectionObserver(handleVideoIntersection, {
      root: null,
      threshold: 0.5
    });

    const handleScroll = () => {
      if(
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ){
        loadMorePosts()
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup the event listener
    return () => {
      if (videoIntersectionObserver?.current) {
        videoIntersectionObserver?.current?.disconnect();
      }
    };
  // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* maping feeds */}
      {feeds &&
        feeds.map((feed) => (

          // feed section
          <div className="bg-gray-900 text-white p-1 mx-24 mt-9 shadow-2xl rounded-lg" key={feed?.id}>
            {console.log(feed,"form mapped items")}
            {/* head part of post */}
            <div className="flex justify-between items-center">

              {/* profile change for current user */}
              <Link to={`${feed?.user?.username}`} className="flex items-center ms-3 mt-2 mb-3 cursor-pointer">
                <img
                  src={feed?.user?.profile_url}
                  alt="User Profile"
                  className="w-9 h-9 rounded-full object-cover mr-2"
                />
                <span className="font-semibold">{feed?.user?.username}</span>
              </Link>

              {/* three dots on feed */}
              <div>
                <button
                  className="text-white"
                  onClick={() => {
                    setSelectedFeed(feed);
                    setIsOpen(true);
                  }}
                >
                  <svg className="h-6 w-6 transform transition-transform hover:scale-110 duration-300">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </svg>
                </button>

                {/* Conditionally render FeedItemModal with the selected feed.id */}
                {isOpen && selectedFeed === feed && (
                  <FeedItemModal feedItem={selectedFeed} closeModal={closeModal}/>
                )}
              </div>
            
            </div>

            {/* post part (image and video) */}
            <div style={{ maxHeight: 'calc(85vh - 4rem)', overflow: 'hidden' }}
              onClick={()=>{
                setSelectedFeed(feed)
                setShowItem(true)
              }}
            >
              {/* contitional render for video and image */}
              {feed?.post_url?.toLowerCase().endsWith('.mp4') ? (

              // video part
              <div>
                <video autoPlay muted={muted} controls={false} className="w-full" loop muteref={videoRef} onClick={handleVideoClick}
                ref = {(el) => {
                  if (el) {
                    videoIntersectionObserver?.current?.observe(el)
                  }
                  videoRef.current = el;
                }}
              >
                  <source src={feed?.post_url} type="video/mp4"/>
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
                <img src={feed?.post_url} alt="Post" className="w-full" />
              )}
            </div>

            {/* likes count section */}
            <div className='text-gray-400 flex text-sm m-1'>
              {feed?.likes_count > 0 && (
                <p>{feed.likes_count} {feed.likes_count === 1 ? 'Like' : 'Likes'}</p>
              )}
            </div>

            {/* post footer(like button, comment and archive) */}
            <div className="flex justify-between mt-4 mb-2 mx-2">

              {/* like and comment */}
              <div>

                {/* like button */}
                <button
                  className={` transform transition-transform hover:scale-110 duration-300`}
                  onClick={() => toggleLike(feed.id, 'Post')}
                >
                  {feed?.liked ? (
                    <lord-icon
                      src="https://cdn.lordicon.com/gfabuoru.json"
                      trigger="hover"
                      state="hover-match"
                      colors="primary:#c71f16,secondary:#ebe6ef,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#f24c00"
                    />
                  ):(
                    <lord-icon
                      src="https://cdn.lordicon.com/gfabuoru.json"
                      trigger="morph"
                      state="morph-two-hearts"
                      colors="primary:#ffffff,secondary:#911710,quaternary:#e83a30"
                    />
                  )}
                   
                </button>
                
                {/* comment button */}
                <button className="text-gray-200 ml-2 transform transition-transform hover:scale-110 duration-300">
                  <lord-icon
                      src="https://cdn.lordicon.com/ayhtotha.json"
                      trigger="hover"
                      colors="primary:#ffffff"
                  />
                </button>
                
              </div>

              {/* archive button */}
              <button className="text-gray-200 transform transition-transform hover:scale-110 duration-300">
                  <lord-icon
                      src="https://cdn.lordicon.com/prjooket.json"
                      trigger="morph"
                      state="morph-marked-bookmark"
                      colors="primary:#ffffff"
                  />
              </button>

            </div>

          </div>

      ))}

      {/* show item component */}
      { showItem &&  (
          <ShowItem feedItem={selectedFeed} closeModal={closeModal}/>
      )}

      {/* new page load button */}
      <div className="flex justify-center mt-4">
          <button onClick={loadMorePosts} className="bg-gray-700 text-white px-4 py-1 rounded-md hover:bg-gray-600">
            <FontAwesomeIcon icon={faAnglesDown} />
          </button>
      </div>

    </>
  );
}

export default FeedItem;
