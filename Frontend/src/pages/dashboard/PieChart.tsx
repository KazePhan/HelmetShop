import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useAppDispatch, useAppSelector } from '../../redux';
import { getOrdersList } from '../../redux/orders/slice-list';
import { getAllProduct, getProducts } from '../../redux/products/product-list';
import { getFilterProducts } from '../../redux/products/search-list';
import { useParams } from 'react-router';
import publicAxios from '../../utils/public-axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { setError } from '../../utils/error';
import cartSlice from '../../redux/cart/cart-slice';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart() {
   
    const { products } = useAppSelector((state) => state.productAll);
  const dispatch = useAppDispatch();
 

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);


    const data1:any[] = [0, 0, 0, 0, 0, 0];
    const data2:any[] = ['1/2(Nửa đầu)', '3/4', '3/4 Có kính', 'Fullface', 'Kính mũ bảo hiểm', 'Mũ bảo hiểm xe đạp'];
    for (let i = 0; i < 6; i++) {
    for(let j = 0; j < products.length; j++) {
      if( products[j].category===data2[i]) {
        data1[i]+=1;
        console.log(products[j].category);
      }
    
    }
  
    }
    console.log(data1);
   
    const data = {
        labels: ['1/2(Nửa đầu)', '3/4', '3/4 Có kính', 'Fullface', 'Kính mũ bảo hiểm', 'Mũ bảo hiểm xe đạp'],
        datasets: [
          {
            label: '# of Votes',
            data:data1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    

  return <Pie data={data} />;
}
