import Select from "react-select";
import userAvatar from "../../../../images/avatar.png"

const aaa = [
    { value: "chocolate", label: "Chocolate"},
    { value: "strawberry", label: "Strawberry"},
    { value: "vanilla", label: "Vanilla"}
];

const AddUsers = ({
                      searchResults,
                      setSelectedUsers,
                      handleSearch }) => {

    return (
        <div className="mt-4">
            <Select
                options={searchResults}
                onChange={setSelectedUsers}
                onKeyDown={(e) => handleSearch(e)}
                placeholder="Add members"
                isMulti
                formatOptionLabel={(user) => (
                    <div className="flex items-center gap-1">
                        <img
                            src={userAvatar}
                            alt=""
                            className="w-8 h-8 object-cover rounded-full"
                        />
                        <span className="text-black">{user.label}</span>
                    </div>
                )}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        border: "none",
                        borderColor: "transparent",
                        background: "transparent",
                    }),
                }}
            />
        </div>
    );
}

export default AddUsers;