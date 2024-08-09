import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../../../components/navbar/Navbar';

export default function Genres() {
    const [name, setName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const handleButtonClick = async () => {
        try {
            let token = Cookies.get('accessToken');

            const response = await axios.post(
                'http://localhost:6060/api/v1/genres',
                { name },
                {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Genre added successfully:', response.data);
            setName('');
            setIsModalOpen(true);

        } catch (error) {
            console.error('Error adding genre:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Navbar />
            <div className=" flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-6">Add Genre</h1>
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full shadow appearance-none border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </label>
                    <button
                        onClick={handleButtonClick}
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                            <h2 className="text-lg font-bold mb-4">Success</h2>
                            <p className="mb-4">The genre was successfully added!</p>
                            <button
                                onClick={closeModal}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
