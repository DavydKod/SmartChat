import {useSelector} from "react-redux";


const Center = () => {
    const {currentChat} = useSelector((state) => state.chats);


    return (
        <div className="center">

        </div>

    );
}

export default Center;