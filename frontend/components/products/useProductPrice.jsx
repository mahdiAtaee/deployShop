import { useEffect, useState } from 'react'
import _ from 'lodash'

const useProductPrice = (product, variations) => {
    const [price, setPrice] = useState({
        main: product.price,
        discounted: product.discountedPrice
    });

    useEffect(() => {
        if (_.isEmpty(variations)) {
            setPrice({
                main: product.price,
                discounted: product.discountedPrice
            });
            return;
        }

        // تبدیل آرایه‌ی variations به یک object مثل { color: "#000000", size: "L" }
        const selectedObject = variations.reduce((acc, curr) => {
            const key = Object.keys(curr)[0];
            acc[key] = curr[key];
            return acc;
        }, {});

        const matched = _.find(product.priceVariations, (variation) =>
            _.isMatch(selectedObject, variation.items)
        );

        if (matched?.price) {
            setPrice({ main: matched.price, discounted: 0 });
        } else {
            setPrice({
                main: product.price,
                discounted: product.discountedPrice
            });
        }
    }, [variations, product]);

    return price;
};

export default useProductPrice;