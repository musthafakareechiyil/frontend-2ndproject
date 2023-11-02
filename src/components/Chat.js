import React, { useEffect, useState } from 'react';
import { UserAxios } from '../config/Header_request';
import { UserUrl } from '../APIs/BaseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { setChats, setNewMessageIntoHistory } from '../Redux/chatSlice';

function Chat({ closeModal }) {
  const userAxios = UserAxios()
  const currentUser = useSelector((state) => state?.userDetails?.user)
  const [ chattedUsers, setChattedUsers ] = useState([])
  const [ receiver_id, setReciever_id ] = useState(null)
  const [ chatHistory, setChatHistory ] = useState([])
  const dispatch = useDispatch()
  // const chatHistory = useSelector(s => s.chat.chatHistory);

  const ws = new WebSocket("ws://localhost:3000/cable");

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
  

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data)
    if (data.type === "ping") return
    if (data.type === "welcome") return
    if (data.type === "confirm_subscription") return

    const message = data.message
    console.log(message,"sended message from the action cable broadcasting")

    const newChatHistory = [...chatHistory, message];
    setChatHistory(newChatHistory)
    dispatch(setNewMessageIntoHistory(message));
  }

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
        const newMessage = response.data
        setChatHistory([...chatHistory, newMessage]);
      } else {
        console.error('Error in chat request:', response.status, response.data);
      }
    } catch (e) {
      console.error(e, 'error while chatting');
    }
  }

  const getChattedUsers = async () => {
    try {
      const response = await userAxios.get(UserUrl + 'chatted_users');
      if (response.status === 200) {
        setChattedUsers(response.data);
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
  
  const getChatHistory = async() => {
    try {
      const response = await userAxios.get(UserUrl+'chats',{
        params: {
          receiver_id: receiver_id
        }
    })
    setChatHistory(response?.data)
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
        <div className='w-2/5 bg-gray-700 rounded-lg p-4'>
        {chattedUsers ? (
          <ul className='text-white'>
            {chattedUsers?.map((user) => (
              <li key={user?.id} className="mb-2">
                <div className="flex items-center "
                  onClick={() => setReciever_id(user.id)}
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
          {/* Content for the right side */}
          <div className="flex-grow my-8 mx-2 overflow-y-auto">
          {/* Chat messages display */}
            {receiver_id && (
              chatHistory?.map((message) => (
                <div
                  key={message.id}
                  className={`m-5 max-w-xs flex ${
                    message.sender_id === currentUser.id
                      ? 'mr-auto'
                      : 'ml-auto'
                  }`}
                >
                  <p
                    className={` p-1 ${
                      message.sender_id === currentUser.id
                        ? 'bg-white rounded-r-full rounded-bl-full'
                        : 'bg-yellow-500 rounded-l-full rounded-br-full'
                    }`}
                  >
                    <span className='m-3 text-black' key={message.id}>
                      {message.body}
                    </span>
                  </p>
                </div>
              ))
            )}
          </div>


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

        </div>
      </div>
    </div>
  );
}

export default Chat;
