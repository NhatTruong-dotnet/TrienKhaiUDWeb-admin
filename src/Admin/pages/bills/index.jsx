import { getDefaultNormalizer } from '@testing-library/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Bill_detail from './bill_detail/bill_detail'
import Bill_Item from './bill_Item/Bill_Item'
import io from 'socket.io-client'
import './bill.css'
import DynamicModal from '../../../Common/DynamicModal/DynamicModal'
export default function BillPage() {
    const [bills, setBills] = useState([])
    const [selectedBill, setSelectedBill] = useState('')
    const [url, setUrl] = useState("https://serverbookstore.herokuapp.com/api/bills/status/all")
    const [loadingModal, setLoadingModal] = useState(false)
    
    let classNameInit = [
        ["card-header active","https://serverbookstore.herokuapp.com/api/bills/status/all"],
        ["card-header onway","https://serverbookstore.herokuapp.com/api/bills/status/onway"], 
        ["card-header fail","https://serverbookstore.herokuapp.com/api/bills/status/fail"], 
        ["card-header success","https://serverbookstore.herokuapp.com/api/bills/status/success"]
    ]

    useEffect(async () => {
        console.log('runn');
        setLoadingModal(true)
        let dataReturn = await axios.get(url)
        setBills(dataReturn.data)
        setLoadingModal(false)
        
    }, [url])

    function handleClick(item) {
        setSelectedBill(item)
    }

    function NavbarFilter(){
        return (<>
        <h5 style={{ cursor: "pointer" }} className={classNameInit[0][0]}  onClick={() => { hanleClickFilter(0) }}>Tất cả hóa đơn</h5>
                        <h6 style={{ cursor: "pointer" }} className={classNameInit[1][0]}  onClick={() => { hanleClickFilter(1) }}>Đang giao</h6>
                        <h6 style={{ cursor: "pointer" }} className={classNameInit[2][0]} onClick={() => {  hanleClickFilter(2)}}>Giao thất bại</h6>
                        <h6 style={{ cursor: "pointer" }} className={classNameInit[3][0]}  onClick={() => {hanleClickFilter(3) }}>Giao thành công</h6></>)
    }
    function hanleClickFilter(orderInClassName) {
        
        //https://www.w3schools.com/howto/howto_js_remove_class.asp
        let navbarSelected = classNameInit[orderInClassName]
        setUrl(navbarSelected[1])
        classNameInit[orderInClassName][0] += "active"
        NavbarFilter();
    }

  

    return (
        <div style={{ display: "flex" }}>
            <div className="card col-9" style={{ height: "800px", maxWidth: "900px" }} >
                <div className="nav">
                    {
                        <NavbarFilter />
                    }
                </div>

                <div class="table-responsive text-nowrap">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Mã đơn hàng</th>
                                <th>Phương thức thanh toán</th>
                                <th>Người mua</th>
                                <th>Tình trạng</th>
                            </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                            {
                               bills.length != 0 ? bills.map((element) => {
                                    return <Bill_Item
                                        onclick={handleClick}
                                        id={element._id}
                                        paymentMethod={element.paymentMethod}
                                        userGmail={element.gmail}
                                        isDelivery={element.isDelivery}
                                        isSucessful={element.isSucessful}
                                        orderId={element.orderId}
                                        createDate={element.createdAt}
                                    />
                                }) : "Hiện chưa có đơn hàng nào"
                            }

                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card col-5" style={{ height: "800px", width: "auto" }} >
                <h5 class="card-header">Chi tiết hóa đơn</h5>
                <div class="table-responsive text-nowrap">
                    {
                        <Bill_detail key={selectedBill.id === undefined ? "" : selectedBill.id} item={selectedBill} />
                    }
                </div>
            </div>
        </div>

    )
}
