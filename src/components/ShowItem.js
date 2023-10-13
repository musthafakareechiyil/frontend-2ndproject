import React from 'react';

function ShowItem({ feedItem, closeModal }) {

  const handleContendClick = (e) => {
    e.stopPropagation();
  }

  return (
    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center backdrop-brightness-75" onClick={closeModal}>
      <div className="w-3/5 h-4/5 bg-gray-900"onClick={handleContendClick}>

        {/* image and video show here */}
        <div className="w-3/5 h-full flex">
          {feedItem.post_url.toLowerCase().endsWith('.mp4') ? (
            // Video rendering
            <div>
              <video autoPlay muted className="w-full h-full object-cover">
                <source src={feedItem.post_url} type="video/mp4" />
              </video>
            </div>
          ) : (
            // Image rendering
            <img src={feedItem.post_url} className="w-full h-full object-cover" alt="Post" />
          )}
        </div>
        
      </div>
    </div>
  );
}

export default ShowItem;
