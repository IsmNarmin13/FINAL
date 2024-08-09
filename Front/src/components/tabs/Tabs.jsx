import React, { useState } from 'react'

const Tabs = ({ book }) => {
    const [activeTab, setActiveTab] = useState('aboutBook');

    console.log(book);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'aboutBook':
                return <div className='w-full md:w-1/3 ms-4 md:ms-36'>
                    <h3 className='md:text-2xl mt-10'>Introduction</h3>
                    <p className='text-gray-600'>{book.description}</p>
                </div>;
            case 'aboutAuthor':
                return <div className='w-full md:w-1/3 ms-4 md:ms-[520px]'>
                    <h3 className='md:text-2xl mt-10'>Author</h3>
                    <p className='text-gray-600  leading-relaxed'>{book.author.pseudonym}</p>
                </div>;
            case 'reviews':
                return <div className='w-full md:w-1/3 ms-4 md:ms-36 mt-10'>{
                    <div >
                        <p className='font-bold text-xl'>Perfect</p>
                    </div>
                }</div>;
            default:
                return null;
        }
    };
    return (
        <div>
            <div className='tabs mt-16 border-b-2 flex justify-around font-bold text-xl'>
                <button
                    onClick={() => handleTabClick('aboutBook')}
                    className={`tab-button ${activeTab === 'aboutBook' ? 'active underline decoration-orange-500 underline-offset-8' : ''}`}
                >
                    About Book
                </button>
                <button
                    onClick={() => handleTabClick('aboutAuthor')}
                    className={`tab-button ${activeTab === 'aboutAuthor' ? 'active underline decoration-orange-500 underline-offset-8' : ''}`}
                >
                    About Author
                </button>
                <button
                    onClick={() => handleTabClick('reviews')}
                    className={`tab-button ${activeTab === 'reviews' ? 'active underline decoration-orange-500 underline-offset-8' : ''}`}
                >
                    Reviews
                </button>
            </div>

            <div className='tab-content'>
                {renderTabContent()}
            </div>
        </div>
    )
}

export default Tabs
