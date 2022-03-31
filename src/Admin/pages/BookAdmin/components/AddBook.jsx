import {useState,useRef} from "react"
import axios from "axios";
import validator from "validator"
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
        img:[]
    });
    const [message, setMessage] = useState({
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
    const [imgMess, setImgMess] = useState("");
    const handleChange = e =>{
        if(e.target.name === 'img'){
            if(!e.target.files[0]){
                setImgMess("Vui lòng nhập trường này!")
            }
            if(!e.target.files[0].name.match(/\.(img|jpeg|png|gif|jpg)$/)){
                setImgMess("File ảnh không hợp lệ!")
            }else{
                setImgMess("")
            }
        }
       
        setBookAdd({
            ...bookAdd,
            [e.target.name]:e.target.name === 'img' ? e.target.files[0] : e.target.value
        })
        
    }   
    const validate = e =>{
        let flag=true;
        if(validator.isEmpty(e.target.value)){
            flag=false;
            setMessage({
                ...message,
                [e.target.name]: "Vui lòng nhập trường này!"
            })
        }
        else if(e.target.name==="price"||e.target.name==="quantityOfPage"||e.target.name==="numberInStock"){
            if(!validator.isNumeric(e.target.value,{no_symbols: true})){
                flag=false;
                setMessage({
                    ...message,
                    [e.target.name]: "Không đúng định dạng!"
                })
            }else{
                setMessage({
                    ...message,
                    [e.target.name]: ""
                })
            }
        }else if((!validator.isLength (e.target.value,{min:4, max: 4}))&&e.target.name==="publishYear"){
            flag=false;
            setMessage({
                ...message,
                publishYear: "Năm Không đúng định dạng!"
            })
        }else{
            setMessage({
                ...message,
                [e.target.name]: ""
            })
        }
        
       return flag;
    }
    
    const submit=async(e)=>{
        
            e.preventDefault()
            if(validate){
                try {
                    const formData =new FormData();
                    formData.append('name', bookAdd.name)
                    formData.append('publisher',bookAdd.publisher)
                    formData.append('author', bookAdd.author)
                    formData.append('price', bookAdd.price)
                    formData.append('quantityOfPage',bookAdd.quantityOfPage)
                    formData.append('publishYear',bookAdd.publishYear)
                    formData.append('suppiler', bookAdd.suppiler)
                    formData.append('translator',bookAdd.translator)            
                    formData.append('numberInStock',bookAdd.numberInStock)
                    formData.append('describe',bookAdd.describe)
                    formData.append( 'image',bookAdd.img)
                    const res= await axios.post("https://serverbookstore.herokuapp.com/api/Books/insertBook",
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                    )
                
                } catch (error) {
                    console.log(error)
                }
            
                props.onCloseForm();
            }
        
    }
   
   
    console.log(bookAdd)
   
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
                            onBlur={validate}
                            />
                            <div className="invalid" style={{ color:"#f33a58"}}>{message.name}</div>
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
                            onBlur={validate}
                            />
                            <div className="invalid" style={{ color:"#f33a58"}}>{message.publisher}</div>
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
                            onBlur={validate}
                            />
                            <div className="invalid" style={{ color:"#f33a58"}}>{message.author}</div>
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
                            onBlur={validate}
                            />
                            <div className="invalid" style={{ color:"#f33a58"}}>{message.price}</div>
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
                            onBlur={validate}
                            />
                            <div className="invalid" style={{ color:"#f33a58"}}>{message.quantityOfPage}</div>
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
                            onBlur={validate}
                            />
                            <div className="invalid" style={{ color:"#f33a58"}}>{message.publishYear}</div>
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
                            onBlur={validate}
                            />
                            <div className="invalid" style={{ color:"#f33a58"}}>{message.suppiler}</div>
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
                            onBlur={validate}
                            />
                            <div className="invalid" style={{ color:"#f33a58"}}>{message.translator}</div>
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
                            onBlur={validate}
                            />
                            <div className="invalid" style={{ color:"#f33a58"}}>{message.numberInStock}</div>
                        </div>           
                    </div>
                    <div className="row">
                        <div className="col mb-3">
                            <label htmlFor="inputGroupFile02" className="_form-label">
                                Hình ảnh
                                </label>
                            <div className="input-group">
                                <input type="file" className="_form-control" id="inputGroupFile02" 
                                 multiple
                                 name="img"
                                 onChange={
                                  handleChange                               
                                }
                                />
                                {/* <label className="input-group-text" htmlFor="inputGroupFile02">
                                    Upload
                                </label> */}
                            </div> 
                            <div className="invalid" style={{ color:"#f33a58"}}>{imgMess}</div>
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
                            // onBlur={validate}
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
                    onSubmit={submit}
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