import "./book.css"
import AddBook from "./components/AddBook"
import BookItem from "./components/BookItem"

import React, { useContext, useEffect } from 'react'


import  { useState } from 'react';
import axios from 'axios';
function BookAdmin (){
  const [showForm, setShowForm] = useState(false)
  const [list,setList] = useState([]);
  useEffect(()=>{
    axios.get(`https://serverbookstore.herokuapp.com/api/Books`)
    .then(res => {
      setList(res.data);
    })
    .catch(error => console.log(error));
    
  },[])
  // console.log(list);
    return(
      <>
       <div style={{width:"500px",alignItems:"center"}}>
     
      {showForm && <AddBook 
             onCloseForm={()=>setShowForm(false)}
               />}
      </div>
        <div className="content-wrapper">
         <div className="container-xxl flex-grow-1 container-p-y">
         <button type="button" className="btn btn-primary" onClick={()=>setShowForm(true)}>
             Thêm
          </button>
            <div className="card">
                <h5 className="card-header">Danh sách Sách</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Hình ảnh</th>
                        <th>Tên sách</th>
                        {/* <th>Nhà xuất bản</th>
                        <th>Tác giả</th> */}
                        <th>Giá</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {list.map((e)=>{                       
                        return(
                          <>
                          <BookItem 
                          key={e._id}
                          id={e._id}
                          name={e.name}
                          publisher={e.publisher}
                          author={e.author}
                          price={e.price}
                          img={e.img[0]}/>                          
                          </>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
        </div>
       
      </div >
     
       
      </>
      
    )
}
export default BookAdmin