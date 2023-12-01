import { UserUrl } from "../APIs/BaseUrl"
import { UserAxios } from "../config/Header_request"
import { useDispatch } from 'react-redux'
import { saveOrRemoveSaved} from "../Redux/feedSlice"

const useSavePost = () => {
  const userAxios = UserAxios()
  const dispatch = useDispatch()

  const savePost = async(post_id) => {
    try {
      const response = await userAxios.post(UserUrl + 'saved_posts',{
        post_id
      })
      dispatch(saveOrRemoveSaved({
        postId: post_id,
        saved: response?.data.saved
      }))

    }catch (e) {
      console.error("error saving post", e)
    }
  }

  const unSavePost = async(post_id) => {
    try{
      const response = await userAxios.delete(UserUrl+`saved_posts/ ${post_id}`, )
      dispatch(saveOrRemoveSaved({
        postId: post_id,
        saved: response?.data.saved
      }))
    }catch (e) {
      console.error("error unsaving post", e)
    }
  }
  return {savePost, unSavePost};
}

export default useSavePost
