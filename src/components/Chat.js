import React, { useEffect, useRef, useState } from 'react';
import { UserAxios } from '../config/Header_request';
import { UserUrl } from '../APIs/BaseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { setChats, setNewMessageIntoHistory } from '../Redux/chatSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

function Chat({ closeModal ,userData}) {
  const userAxios = UserAxios()
  const currentUser = useSelector((state) => state?.userDetails?.user)
  const [ chattedUsers, setChattedUsers ] = useState([])
  const [ receiver_id, setReciever_id ] = useState(null)
  const dispatch = useDispatch()
  const chatHistory = useSelector(s => s.chat.chatHistory);
  const scrollDownRef = useRef(null)
  const [ selectedUser, setSelectedUser ] = useState(null)

  console.log(userData, "consoling profile id")

  useEffect(() =>{
    scrollDownRef.current?.scrollIntoView();
  },[chatHistory])


  // connection and boradcast from the action cable
  useEffect(() => {
    const ws = new WebSocket("wss://api.v-app.tech/cable");

    // subscribing to the actioncable channel
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            channel: "ChatsChannel",
            sender_id: currentUser.id,
            receiver_id: receiver_id
          }),
        })
      );
    };

    // recieving message from the boradcast
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "ping" || data.type === "welcome" || data.type === "confirm_subscription") {
        return;
      }

      const message = data.message;
      dispatch(setNewMessageIntoHistory(message));
    };

    return () => {
      ws.close();
    };
    //eslint-disable-next-line
  }, [currentUser, receiver_id]);

  // submitting the new messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = e.target.message.value;
    e.target.message.value = '';
  
    try {
      const response = await userAxios.post(UserUrl + 'chats', {
        receiver_id: receiver_id,
        body: body,
      });
  
      if (response.status === 201) {
        // const newMessage = response.data
        // setChatHistory([...chatHistory, newMessage]);
      } else {
        console.error('Error in chat request:', response.status, response.data);
      }
    } catch (e) {
      console.error(e, 'error while chatting');
    }
  }

  // showing the chatted users
  const getChattedUsers = async () => {
    try {
      const response = await userAxios.get(UserUrl + 'chatted_users');
      if (response.status === 200) {
        const responseData = response.data
        if (userData) {
          responseData.unshift(userData)
        }
        setChattedUsers(responseData);
        console.log(response.data, 'chatted users')
      } else {
        console.error('Error getting chatted users: Invalid response status');
      }
    } catch (e) {
      console.error(e, 'Error getting chatted users');
    }
  }

  useEffect(() => {
    getChattedUsers();
    // eslint-disable-next-line
  },[])
  
  // fetching the user chat history
  const getChatHistory = async() => {
    try {
      const response = await userAxios.get(UserUrl+'chats',{
        params: {
          receiver_id: receiver_id
        }
    })
    // setChatHistory(response?.data)
    dispatch(setChats(response?.data));

    }catch (e) {
      console.error(e," Error while fetching chat history ")
    }
  }

  useEffect(() => {
    getChatHistory()
    // eslint-disable-next-line
  },[receiver_id])

  return (
    <div className='fixed h-full w-full backdrop-brightness-50 flex items-center justify-center top-0 left-0 z-50'>
      <div className='absolute h-4/5 w-3/5 bg-gray-800 rounded-xl flex'>
        {/* Left Side */}
        <div className='w-2/5 bg-gray-700 rounded-lg p-4 overflow-y-auto'>
        {chattedUsers ? (
          <ul className='text-white cursor-pointer'>
            {chattedUsers?.map((user) => (
              <li key={user?.id} className="mb-2">
                <div className="flex items-center "
                  onClick={() =>{
                    setReciever_id(user.id)
                    setSelectedUser(user)
                  }}
                >

                  {/* profile image */}
                  <img
                    src={user?.profile_url}
                    alt={user?.username}
                    className="w-10 h-10 object-cover rounded-full m-2 mr-4"
                  />

                  {/* username */}
                  <div
                    className="text-white"
                  >
                    <p className='font-bold'>{user?.username}</p>
                    <p className='text-gray-400'>{user?.fullname}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          'Loading...'
        )}
      </div>

        {/* Right Side */}
        <div className="flex flex-col w-4/5 p-4 relative">

          {/* close button */}
          <div className="absolute top-0 right-0 p-3 cursor-pointer"
            onClick={closeModal}
          >
            <lord-icon
              src="https://cdn.lordicon.com/nqtddedc.json"
              trigger="hover"
              colors="primary:#ffffff"
            />
          </div>

          {/* username profile on top of chatbox */}
          { receiver_id && (
            <Link className='h-10 w-5/6 flex'
              to={`/${selectedUser?.username}`}
            >
              <img src={selectedUser?.profile_url} alt='profile pic'
                className='h-10 w-10 rounded-full object-cover mr-3 mt-1'
              />
              <span>
              <p className='font-bold text-white'>
                {selectedUser?.username}
              </p>
              <p className='text-gray-400'>
                {selectedUser?.fullname}
              </p>
              </span>
            </Link>
          )}

          {/* Content for the right side */}
          <div className="flex-grow my-8 mx-2 overflow-y-auto">
          {/* Chat messages display */}
            {receiver_id ? (
              chatHistory?.map((message) => (
                <div
                  key={message.id}
                  className={`m-5 flex ${
                    message.sender_id === currentUser.id
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <p
                    className={`flex ${
                      message.sender_id === currentUser.id
                        ? 'bg-blue-700 rounded-l-full shadow-2xl rounded-br-full'
                        : 'bg-blue-700 shadow-2xl rounded-r-full rounded-bl-full'
                    }`}
                  >
                    <span className='mx-3 my-1 text-white max-w-xs flex flex-wrap' key={message.id}>
                      {message.body}
                    </span>
                  </p>
                </div>
              ))
            ):(
              <div className="flex justify-center items-center" style={{ height: '100%'}}>
                <motion.img animate={{ y:-80, x:70, rotate: 10 }}
                  src='https://res.cloudinary.com/dbpcfcpit/image/upload/v1699075385/3d-render-hand-throw-paper-plane-business-concept-removebg-preview_vcvipt.png'
                  alt='send_message'
                  transition={{ duration: 30 }}
                />
              </div>
            )}

            <div ref={scrollDownRef}/>
          </div>
          {/* input form */}
          { receiver_id && (
            <form
              className="mt-4 flex"
              onSubmit={handleSubmit}
            >
              {/* Input for messages */}
              <input
                type="text"
                name="message" // Add a name to your input element
                placeholder="Type your message..."
                className="w-5/6 p-2 border border-gray-400 rounded text-black"
              />
              <button
                className="text-white p-2 bg-blue-600 rounded-xl ml-3 w-16"
                type="submit" // Make sure the button type is "submit"
              >
                Send
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}

export default Chat;
