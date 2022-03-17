import {useState} from "react"
import axios from "axios";
function AddBook(props){
    const [bookAdd, setBookAdd] =useState({
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
        img:""
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
    const submit=async(e)=>{
        e.preventDefault()
        try {
            const res= await axios.post("https://serverbookstore.herokuapp.com/api/Books/insertBook",{
                name:bookAdd.name,
                publisher:bookAdd.publisher,
                author:bookAdd.author,
                price:bookAdd.price,
                quantityOfPage:bookAdd.quantityOfPage,
                publishYear:bookAdd.publishYear,
                suppiler:bookAdd.suppiler,
                translator:bookAdd.translator,
                numberInStock:bookAdd.numberInStock,
                numberDelivery:0,
                describe:bookAdd.describe,
                img:bookAdd.img
            });
            console.log(res.data)
            props.onCloseForm();
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = e =>{
        setBookAdd({
            ...bookAdd,
            [e.target.name]:e.target.value
        })
    }
    return(
        <div className="_modal _modal-top fade_" id="modalTop" >
             <div className="_modal-dialog">
                <form className="_modal-content" onSubmit={submit}>
                <div className="_modal-header">
                    <h5 className="_modal-title" id="modalTopTitle">
                   Thêm sách mới
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
                            <label htmlFor="nameSlideTop" className="_form-label">
                            Tên sách
                            </label>
                            <input
                            type="text"
                            id="nameSlideTop"
                            className="_form-control"
                            placeholder="Nhập tên sách..."
                            value={bookAdd.name}
                            name="name"
                            onChange={handleChange }
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
                            value={bookAdd.publisher}
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
                            value={bookAdd.author}
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
                            value={bookAdd.price}
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
                            value={bookAdd.quantityOfPage}
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
                            value={bookAdd.publishYear}
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
                            value={bookAdd.suppiler}
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
                            value={bookAdd.translator}
                            name="translator"
                            onChange={handleChange}
                            onBlur={(e)=>{
                                require(e.target.value,e.target.id) 
                            }}
                            />
                        </div>
                        <div className="col mb-0">
                            <label htmlFor="dobSlideTop5" className="_form-label">
                           Số lượng
                            </label>
                            <input
                            type="number"
                            id="dobSlideTop5"
                            className="_form-control"
                            placeholder="Nhập số lượng..."
                            value={bookAdd.numberInStock}
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
                                <input type="file" className="_form-control" id="inputGroupFile02" 
                                 name="img"
                                 onChange={handleChange}
                                 onBlur={(e)=>{
                                    require(e.target.value,e.target.id) 
                                 }}/>
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
                            value={bookAdd.describe}
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
                    // onClick={()=>{ props.onCloseForm(); }}
                      >
                   Lưu 
                    </button>
                </div>
                </form>
            </div>
         </div>

    )
}
export default AddBook