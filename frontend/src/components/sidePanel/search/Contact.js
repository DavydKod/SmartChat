import friendAvatar from "../../../images/avatar.png";
import {useDispatch, useSelector} from "react-redux";
import {createChat} from "../../../redux/actions/chatActions";


const Contact = ( { contact, setSearchResults }) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state)=>state.user)

    const values = {
        userId: user._id,
        receiverId: contact._id,
        token: user.token,
    };

    const openChat = async () => {
        console.log("id:",contact._id);
        await dispatch(createChat(values));
    };

    return (
        <li
            onClick={() => openChat()}
            className="">

            <div className="item">
                <img src={friendAvatar} alt=""/>
                <div className="texts">
                    <span>{contact.name}</span>
                </div>
            </div>
        </li>
    )

}

export default Contact;