import SidePanel from "../components/SidePanel";
import ChatWindow from "../components/ChatWindow";

const Home = () => {

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-custom-image">
            {/* ChatWindow App container below. Background above. */}
            <div className="flex w-[90vw] h-[90vh] bg-[rgba(255,255,255,0.50)] shadow-lg rounded-[12px] p-8 backdrop-blur-saturate border-custom">
                <SidePanel />
                <ChatWindow />
            </div>
        </div>
    );
}

export default Home;
