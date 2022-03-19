import {useContext, useEffect, useState} from "react"
import { Context } from "../../../../Page/BooksPage/Context/Context"
import axios from "axios";
function EditBook(props){
    // console.log(props.id);
    const [bookEdit,setBookEdit] = useState({
        name:"",
        publisher:"",
        author:"",
        price:"",
        quantityOfPage:"",
        publishYear:"",
        suppiler:"",
        translator:"",
        numberInStock:"",
        describe:"",
        img: []
    });
    const number =(value,selector)=>{
        if(value<0){
            console.log("Vui long nhap so duong")
            document.getElementById(selector).classList.add("invalid");
        }
    }
    const require =(value,selector)=>{
        if(value==""){
            console.log("Vui long nhap truong nay")
            document.getElementById(selector).classList.add("invalid");
        }
    }
    const edit = async (e)=>{
        e.preventDefault()
        try {      
            const formData =new FormData();
            formData.append('name', bookEdit.name)
            formData.append('publisher',bookEdit.publisher)
            formData.append('author', bookEdit.author)
            formData.append('price', bookEdit.price)
            formData.append('quantityOfPage',bookEdit.quantityOfPage)
            formData.append('publishYear',bookEdit.publishYear)
            formData.append('suppiler', bookEdit.suppiler)
            formData.append('translator',bookEdit.translator)
            formData.append('numberInStock',bookEdit.numberInStock)
            formData.append('describe',bookEdit.describe)
            formData.append( 'image',bookEdit.img)
            const res = await axios.put(`https://serverbookstore.herokuapp.com/api/Books/updateBook/${props.id}`,
               formData,
               {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
            // console.log(res.data)
        } catch (error) {
            console.log(error)
        }
        props.onCloseForm();
    }
   
    const handleChange = e =>{
        setBookEdit({
            ...bookEdit,
            [e.target.name]:e.target.name === 'img' ? e.target.files[0] : e.target.value,
        })
    }
    useEffect(()=>{
        axios.get(`https://serverbookstore.herokuapp.com/api/Books/${props.name}`)
        .then(res => {          
          setBookEdit(res.data[0]);
          console.log(res.data[0])   
        })
        .catch(error => console.log(error));
    },[])
     
    return(
        <div className="_modal _modal-top fade_" id="modalTop_edit" >
            <div className="_modal-dialog">
                <form className="_modal-content" onSubmit={edit}>
                <div className="_modal-header">
                    <h5 className="_modal-title" id="modalTopTitle">
                   Thay đổi thông tin sách
                    </h5>
                    <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={()=>{
                        props.onCloseForm();
                      }}
                    />
                </div>
                <div className="_modal-body">
                    <div className="row">
                        <div className="col mb-3">
                            <img src={bookEdit.img[0]} width="150" height="150" alt="Anh sach" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-3">
                            <label htmlFor="nameSlideTop" className="_form-label">
                            Tên sách
                            </label>
                            <input
                            type="text"
                            id="nameSlideTop"
                            className="_form-control"
                            placeholder="Nhập tên sách..."
                            value={bookEdit.name}
                            name="name"
                            onChange={handleChange}
                            onBlur={(e)=>{
                                require(e.target.value,e.target.id)                                
                            }}
                            />
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col mb-0">
                            <label htmlFor="emailSlideTop" className="_form-label">
                            Nhà xuất bản
                            </label>
                            <input
                            type="text"
                            id="emailSlideTop"
                            className="_form-control"
                            placeholder="Nhập nhà xuất bản..."
                            value={bookEdit.publisher}
                            name="publisher"
                            onChange={handleChange}
                            onBlur={(e)=>{
                                require(e.target.value,e.target.id)                                
                            }}
                            />
                        </div>
                        <div className="col mb-0">
                            <label htmlFor="dobSlideTop" className="_form-label">
                           Tác giả
                            </label>
                            <input
                            type="text"
                            id="dobSlideTop"
                            className="_form-control"
                            placeholder="Nhập tên tác giả..."
                            value={bookEdit.author}
                            name="author"
                            onChange={handleChange}
                            onBlur={(e)=>{
                                require(e.target.value,e.target.id)                                
                            }}
                            />
                        </div>           
                    </div>
                    <div className="row g-2">
                        <div className="col mb-0">
                            <label htmlFor="emailSlideTop1" className="_form-label">
                            Giá
                            </label>
                            <input
                            type="number"
                            id="emailSlideTop1"
                            className="_form-control"
                            placeholder="Nhập giá..."
                            value={bookEdit.price}
                            name="price"
                            onChange={handleChange}
                            onBlur={(e)=>{
                                require(e.target.value,e.target.id)    
                                number(e.target.value,e.target.id)                            
                            }}
                            />
                        </div>
                        <div className="col mb-0">
                            <label htmlFor="dobSlideTop1" className="_form-label">
                           Số trang
                            </label>
                            <input
                            type="number"
                            id="dobSlideTop1"
                            className="_form-control"
                            placeholder="Nhập số trang..."
                            value={bookEdit.quantityOfPage}
                            name="quantityOfPage"
                            onChange={handleChange}
                            onBlur={(e)=>{
                                require(e.target.value,e.target.id)      
                                number(e.target.value,e.target.id)                          
                            }}
                            />
                        </div>           
                    </div>
                    <div className="row g-2">
                        <div className="col mb-0">
                            <label htmlFor="emailSlideTop2" className="_form-label">
                            Năm xuất bản
                            </label>
                            <input
                            type="number"
                            id="emailSlideTop2"
                            className="_form-control"
                            placeholder="Nhập năm xuất bản..."
                            value={bookEdit.publishYear}
                            name="publishYear"
                            onChange={handleChange}
                            onBlur={(e)=>{
                                require(e.target.value,e.target.id)    
                                number(e.target.value,e.target.id)                            
                            }}
                            />
                        </div>
                        <div className="col mb-0">
                            <label htmlFor="dobSlideTop2" className="_form-label">
                           Nhà cung cấp
                            </label>
                            <input
                            type="text"
                            id="dobSlideTop2"
                            className="_form-control"
                            placeholder="Nhập nhà cung cấp..."
                            value={bookEdit.suppiler}
                            name="suppiler"
                            onChange={handleChange}
                            onBlur={(e)=>{
                                require(e.target.value,e.target.id)                                
                            }}
                            />
                        </div>           
                    </div>
                    <div className="row g-2">
                        <div className="col mb-0">
                            <label htmlFor="emailSlideTop4" className="_form-label">
                            Người phiên dịch
                            </label>
                            <input
                            type="text"
                            id="emailSlideTop4"
                            className="_form-control"
                            placeholder="Nhập tên người phiên dịch..."
                            value={bookEdit.translator}
                            name="translator"
                            onChange={handleChange}
                            onBlur={(e)=>{
                                require(e.target.value,e.target.id)                                
                            }}
                            />
                        </div>
                        <div className="col mb-0">
                            <label htmlFor="dobSlideTop3" className="_form-label">
                           Số lượng
                            </label>
                            <input
                            type="number"
                            id="dobSlideTop3"
                            className="_form-control"
                            placeholder="Nhập số lượng..."
                            value={bookEdit.numberInStock}
                            name="numberInStock"
                            onChange={handleChange}
                            onBlur={(e)=>{
                                require(e.target.value,e.target.id)   
                                number(e.target.value,e.target.id)                             
                            }}
                            />
                        </div>           
                    </div>
                    <div className="row">
                        <div className="col mb-3">
                            <label htmlFor="inputGroupFile02" className="_form-label">
                                Hình ảnh
                            </label>
                            <div className="input-group">
                                <input type="file" className="_form-control" name="img" id="inputGroupFile02" 
                                onChange={handleChange} />
                                {/* <label className="input-group-text" htmlFor="inputGroupFile02">
                                    Upload
                                </label> */}
                            </div> 
                        </div>
                    </div>

                    <div class="mb-3">
                          <label class="_form-label" for="basic-default-message">Mô tả</label>
                          <textarea
                            id="basic-default-message"
                            class="_form-control"
                            placeholder="Nhập mô tả sách..."
                            value={bookEdit.describe}
                            name="describe"
                            onChange={handleChange}
                            onBlur={(e)=>{
                                require(e.target.value,e.target.id)                                
                            }}
                          ></textarea>
                    </div>
                </div>
                <div className="_modal-footer">
                    <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                    onClick={()=>{
                       props.onCloseForm();
                      }}
                    >
                   Đóng
                    </button>
                    <button type="submit" className="btn btn-primary"  
                    // onClick={()=>{
                    //    props.onCloseForm();
                    //   }}
                    onSubmit={edit}
                      >
                   Lưu thay đổi
                    </button>
                </div>
                </form>
            </div>
         </div>

    )
}
export default EditBook