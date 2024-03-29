import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../../config";
import axios from 'axios';

export const Main = (props) => {
    const [products, SetProducts] = useState([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
              const data = {
                id_category: props.categorie
                };
              const response = await axios.post(`${BASE_URL}products`, data);
              SetProducts(response.data);
            } catch (error) {
              console.error('Error fetching categories: ', error);
            }
          };
          fetchProducts();
    }, [props.categorie])
    return (
        <>
            <p>
             {props.categorie}
            </p>
        </>
    )
};