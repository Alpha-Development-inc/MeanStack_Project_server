import react from 'react';
//import './Categories.css';
import { CardView } from 'react-card-with-image'
import 'react-card-with-image/dist/index.css'
import axios from "axios";

import React, { useState, useEffect } from 'react';

import catdefault from './images/Categories.jpg';

const Categories =()=>{

    const [items,setItems] = useState([
        {
          id: '',
          header:'',
          description: '',
          image:(catdefault)
        }]);
        
        useEffect(() => {
              axios.get(process.env.REACT_APP_BACKEND_URL + 'categories').then((response) => {
                  console.log(response.data);
                  setItems(response.data);
                  
              });
             },[]);

        return(
        <CardView
        items={items}
        activeColor='#000'
        imageHeight='650px'
        imageWidth='800px'
      />
      );
}
export default Categories;