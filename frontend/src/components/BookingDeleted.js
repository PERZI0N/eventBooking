import React from "react";

const BookingDeleted = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-fourth">
      <div className="bg-second p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Booking Deleted
        </h1>
        <p className="text-lg mb-6">
          Your booking has been successfully deleted.
        </p>
        <a
          href="/"
          className="inline-block bg-third text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default BookingDeleted;
