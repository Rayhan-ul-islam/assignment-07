import React from 'react';
import Hero from './Hero';
import PriceIncrease from './PriceIncrease';
import PriceDecreased from './PriceDecreased';

const HomePage = () => {
    return (
        <div>
            <Hero></Hero>
            <PriceIncrease></PriceIncrease>
            <PriceDecreased></PriceDecreased>
        </div>
    );
};

export default HomePage;