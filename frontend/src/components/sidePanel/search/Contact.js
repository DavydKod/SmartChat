import SearchBar from "./SearchBar";
import friendAvatar from "../../../images/avatar.png";


const Contact = ( { contact }) => {

    return (
        <li className="">

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