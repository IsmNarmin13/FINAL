// import React, { useState } from 'react';
// import { BsBag } from 'react-icons/bs';

// const AddToCart = ({ book, addToCart }) => {
//   const [addedToCart, setAddedToCart] = useState(false);

//   const handleAddToCart = () => {
//     addToCart(book);
//     setAddedToCart(true);
//     setTimeout(() => {
//       setAddedToCart(false);
//     }, 1000);
//   };

//   return (
//     <div >
//       <button
//         className=" text-white text-sm flex justify-center items-center"
//         onClick={handleAddToCart}
//       >
//         {addedToCart ? (
//          <>
//             Added!
//           </>
//         ) : (
//           <>
//             Add to Bag <BsBag className="ms-2 mb-1 w-3 h-3" />
//           </>
//         )}
//       </button>
//     </div>
//   );
// };

// export default AddToCart;