import Logo from '@/logo/Logo';
import React from 'react';

const MyProfileLoading = () => {
    return (
          <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-4 animate-bounce">
        {/* <FaHeart className="text-5xl  text-[#1479C9]" /> */}
        <Logo></Logo>
        
      </div>

      <h2 className="text-xl font-semibold text-base-content">Loading...</h2>

      <p className="mt-1 text-sm text-base-content/60">Please wait a moment</p>

      <span className="loading loading-dots loading-sm mt-3 text-primary"></span>
    </div>
    );
};

export default MyProfileLoading;