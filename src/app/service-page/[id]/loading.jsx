import ServiceDetailsPageSkeleton from '@/components/service/ServiceDetailsPageSkeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <ServiceDetailsPageSkeleton></ServiceDetailsPageSkeleton>
        </div>
    );
};

export default loading;