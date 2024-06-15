import SearchBar from "./SearchBar";
import friendAvatar from "../../../images/avatar.png";
import {useDispatch, useSelector} from "react-redux";
import {createChat} from "../../../redux/actions/chatActions";


const Contact = ( { contact, setSearchResults, setSearchPerformed }) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state)=>state.user)
    //const users = convo.members;
    //const receiverId = users[0]._id === user._id ? users[1]._id : users[0]._id;

    const values = {
        userId: user._id,
        receiverId: contact._id,
        token: user.token,
    };

    const openChat = async () => {
        await dispatch(createChat(values));
        //setSearchResults([]);
        setSearchPerformed(false)
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