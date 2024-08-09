import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../../../components/navbar/Navbar';

export default function Authors() {
    const [pseudonym, setPseudonym] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e) => {
        setPseudonym(e.target.value);
    };

    const handleButtonClick = async () => {
        try {
            let token = Cookies.get('accessToken');

            await axios.post(
                'http://localhost:6060/api/v1/authors',
                { pseudonym },
                {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setPseudonym('');
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error adding author:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Navbar />
            <div className=" flex flex-col items-center">
                <div className="w-full max-w-xs mt-10">
                    <h1 className="text-2xl font-bold mb-4 text-center">Add Author</h1>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Pseudonym:
                            </label>
                            <input
                                type="text"
                                value={pseudonym}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleButtonClick}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Success</h2>
                        <p className="mb-4">Author was successfully added!</p>
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
    );
}
