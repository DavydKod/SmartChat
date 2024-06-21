import 'reactjs-popup/dist/index.css';

const MenuChat = ( { setShowChatMenu, setShowChatInfo } ) => {

    return (

        <div className="absolute right-1 mt-8 z-50 bg-white shadow-lg rounded-md w-52">
            <ul>

                <li
                    className="py-3 pl-5 cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:text-white rounded-t-md"
                    onClick={() => setShowChatInfo(true)}
                >
                    <span>Chat Info</span>
                </li>

            </ul>
        </div>


    );
};

export default MenuChat;