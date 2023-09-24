import React from 'react'

function UserShow({ user, isOpen, closeModal }) {
  return (
    <div>
      <div
        id="defaultModal"
        className={`flex justify-center items-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="relative min-w-fit w-1/4 max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow-2xl dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user.id}. {user.username}
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-200">
                <span className='font-bold mr-2'>Username :</span> {user.username}
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-200">
                <span className='font-bold mr-2'>Email :</span> {user.email || "nil"}
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-200">
                <span className='font-bold mr-2'>Phone :</span> {user.phone || "nil"}
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-200">
                <span className='font-bold mr-2'>Full Name :</span> {user.fullname}
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-200">
                <span className='font-bold mr-2'>Blocked :</span> {user.blocked ? "Yes" : "No"}
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-200">
                <span className='font-bold mr-2'>Created_at :</span> {user.created_at}
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-200">
                <span className='font-bold mr-2'>Updated_at :</span> {user.updated_at}
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-200">
                <span className='font-bold mr-2'>Deleted :</span> {user.deleted_at || 'Nil'}
              </p>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserShow
