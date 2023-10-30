import { UserAxios } from "../config/Header_request"
import { UserUrl } from "../APIs/BaseUrl"
import { useDispatch } from "react-redux"
import { updateLikedStatus } from "../Redux/feedSlice"

const useToggleLike = () => {
  const userAxios = UserAxios()
  const dispatch = useDispatch()
  // const [ liked, setLiked ] = useState(initialState || {}) 

  const toggleLike = async (likable_id, likable_type) => {
    try{
      const response = await userAxios.post(UserUrl+'likes', {
        likable_id: likable_id,
        likable_type: likable_type
      })

      console.log(response)
    
      dispatch(updateLikedStatus({
        liked: response.data.liked,
        likable_id: likable_id
      }))

    }catch(error){
      console.error( "Error while liking or dislike", error )
      throw error
    }
  }

  return { toggleLike }
}

export default useToggleLike