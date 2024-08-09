import React, { useState } from 'react';
import { BsBookmark, BsCheck, BsBookmarkFill } from 'react-icons/bs';

const AddToBookmark = ({ book, addToBookmark }) => {
    const [addedToBookmarked, setAddedToBookmarked] = useState(false);
    const [changeIcon, setChangeIcon] = useState(false);

    const handleAddToBookmarked = () => {
        addToBookmark(book);
        setAddedToBookmarked(true);
        setTimeout(() => {
            setAddedToBookmarked(false);
            setChangeIcon(true);
        }, 1000);
    };

    return (
        <div>
            <button
                className="hover:bg-white hover:rounded-full hover:text-orange-700 text-white text-sm py-2 px-2 flex justify-center items-center"
                onClick={handleAddToBookmarked}
            >
                {addedToBookmarked ? (
                    <>
                        <BsCheck className='text-orange-500' />
                    </>
                ) : (
                    <>
                        {changeIcon ? (
                            <BsBookmarkFill className='text-orange-500' />
                        ) : (
                            <>
                                <BsBookmark />
                            </>
                        )}
                    </>
                )}
            </button>
        </div>
    );
};

export default AddToBookmark;