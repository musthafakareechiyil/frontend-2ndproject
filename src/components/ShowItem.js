import React from 'react';

function ShowItem({ feedItem, closeModal }) {
  return (
    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center backdrop-brightness-75" onClick={closeModal}>
      <div className="w-3/5 h-4/5 bg-gray-900">
        <div className="w-3/5 h-full flex">
          {/* Image */}
          <img src={feedItem.post_url} className="w-full h-full object-cover" alt="Post" />

        </div>
      </div>
    </div>
  );
}

export default ShowItem;
