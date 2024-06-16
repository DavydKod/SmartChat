import friendAvatar from "../../../images/avatar.png";
import {useDispatch, useSelector} from "react-redux";
import {createChat} from "../../../redux/actions/chatActions";


const Contact = ( { contact, setSearchResults, inputRef, setInputValue }) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state)=>state.user)

    const values = {
        userId: user._id,
        memberIds: [contact._id],
        token: user.token,
    };

    const openChat = async () => {
        await dispatch(createChat(values));
        setSearchResults([]);
        inputRef.current.value = '';
        setInputValue('');
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