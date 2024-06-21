import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {UpdateUser} from "../../../redux/actions/userActions";
import axios from "axios";

const UserProfile = ({ setUserPr }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [isEditable, setIsEditable] = useState(false);
    const [serverError, setServerError] = useState('');

    const toggleEditMode = () => {
        setIsEditable(!isEditable);
    };

    const checkUniqueTag = async (tag) => {
        const response = await axios.post('http://localhost:4000/api/user/checkUnique', { tag });
        return response.data.tagExists;
    };

    const checkUniqueEmail = async (email) => {
        const response = await axios.post('http://localhost:4000/api/user/checkUnique', { email });
        return response.data.emailExists;
    };

    const validationSchema = Yup.object({
        name: Yup.string().max(64, 'Name must be 64 characters or less'),
        tag: Yup.string().max(16, 'Tag must be 16 characters or less')
            .test('checkUniqueTag', 'Tag is already in use', async (value) => {
                if (value && value !== user.tag) {
                    const isUnique = await checkUniqueTag(value);
                    return !isUnique;
                }
                return true;
            }),
        email: Yup.string().email('Invalid email address').max(64, 'Email must be 64 characters or less')
            .test('checkUniqueEmail', 'Email is already in use', async (value) => {
                if (value && value !== user.email) {
                    const isUnique = await checkUniqueEmail(value);
                    return !isUnique;
                }
                return true;
            }),
        newPassword: Yup.string().min(6, 'Password must be at least 6 characters').max(64, 'Password must be 64 characters or less'),

    });

    const formik = useFormik({
        initialValues: {
            name: user.name,
            tag: user.tag,
            email: user.email,
            newPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            const updateData = {
                name: values.name,
                tag: values.tag,
                email: values.email,
                token: user.token
            };

            if (values.newPassword) {
                updateData.newPassword = values.newPassword;
            }

            try {
                let response = await dispatch(UpdateUser(updateData));
                setServerError('');
                setIsEditable(false);
                setUserPr(false);
            } catch (error) {
                if (error.response && error.response.data) {
                    setServerError(error.response.data.message);
                } else {
                    setServerError('An unexpected error occurred');
                }
            }
        },
    });

    const deleteUser = async () => {

        try {
            const response = await axios.delete('http://localhost:4000/api/user/delete', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setUserPr(false);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }


    return (
        <div className="p-10 rounded-lg shadow-xl relative bg-white max-w-2xl mx-auto mt-20">
            <h2 className="text-3xl mb-6 text-center font-semibold">User Profile</h2>

            {serverError && <div className="text-red-500 mb-4">{serverError}</div>}

            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly={!isEditable}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500">{formik.errors.name}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tag</label>
                    <input
                        type="text"
                        name="tag"
                        value={formik.values.tag}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly={!isEditable}
                    />
                    {formik.touched.tag && formik.errors.tag ? (
                        <div className="text-red-500">{formik.errors.tag}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly={!isEditable}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly={!isEditable}
                    />
                    {formik.touched.newPassword && formik.errors.newPassword ? (
                        <div className="text-red-500">{formik.errors.newPassword}</div>
                    ) : null}
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                    {isEditable ? (
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                            disabled={!(formik.isValid && formik.dirty)}
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                            onClick={toggleEditMode}
                        >
                            Edit
                        </button>
                    )}

                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                        onClick={() => setUserPr(false)}
                    >
                        Close
                    </button>

                    {/*<button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                        onClick={deleteUser}
                    >
                        Delete Profile
                    </button>*/}
                </div>
            </form>
        </div>
    );
};

export default UserProfile;