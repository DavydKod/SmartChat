

const GroupName = ({ groupName, setGroupName}) => {
    return (
        <div className="mt-4">
            <input
                type="text"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full bg-transparent border-b border-black text-black outline-none pl-1 placeholder-gray-500"
            >

            </input>

        </div>
    );
}

export default GroupName;