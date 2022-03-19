import {FiMoreVertical} from "react-icons/fi"
import {FiEdit3} from "react-icons/fi"
import {FiTrash2} from "react-icons/fi"
import EditBook from "./EditBook"
import  { useState, useEffect } from 'react';
import axios from 'axios';
function BookItem(props){
    const [showForm, setShowForm] = useState(false)
    const deleteBook =async (e)=>{
        e.preventDefault()
        console.log(props.id)
        try {
            const res =  axios.get(`https://serverbookstore.herokuapp.com/api/Books/delete/${props.id}`);
            console.log("da xoa")
        } catch (error) {
            console.log(error)
        }
  
    }
    return(
        <tr>
            <td className="bookItem_td"><img src={props.img} width="50" height="50" alt="Anh sach" /></td>
            <td className="bookItem_td">{props.name}</td>            
            {/* <td className="bookItem_td">{props.publisher}</td>
            <td className="bookItem_td">{props.author}</td> */}
            <td className="bookItem_td">{props.price}</td>
            <span className="badge bg-label-primary me-1"></span>
            <td className="bookItem_td">
                <FiEdit3 onClick={()=>setShowForm(true)}/> &ensp;
                <FiTrash2 onClick={deleteBook}/>
                {showForm && <EditBook 
                    onCloseForm={()=>setShowForm(false)}
                name={props.name}
                id={props.id}/>}
              
            </td>
           
        </tr>     
    )
}
export default BookItem