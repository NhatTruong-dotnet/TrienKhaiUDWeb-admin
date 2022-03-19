import React from 'react'
import '../bill-module.css'
export default function Bill_Item(props) {
    console.log(props.style);
    let billStatus = ''
    let tableColor = ''
    if (!props.isDelivery) {
        billStatus = "Đang giao"
        tableColor = 'default'
    }
    else {
        if (props.isSucessful) {
            billStatus = 'Giao thành công'
            tableColor = 'success'

        }
        else {
            billStatus = 'Giao thất bại'
            tableColor = 'danger'

        }
    }

    return (
        <tr className={"table-" + tableColor +" "+props.style} onClick={() => {props.onclick(props)}} style={{cursor:"pointer",overflow:"hidden"}}>
            <td><i class="fab fa-sketch fa-lg text-warning me-3"></i> <strong>{props.id}</strong></td>
            <td>{props.paymentMethod}</td>
            <td>
                {/* <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                    <li
                                        data-bs-toggle="tooltip"
                                        data-popup="tooltip-custom"
                                        data-bs-placement="top"
                                        class="avatar avatar-xs pull-up"
                                        title="Lilian Fuller"
                                    >
                                        <img src="../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle" />
                                    </li>

                                </ul> */}
                {props.userGmail}
            </td>
            <td><span class="badge bg-label-primary me-1">{billStatus}</span></td>
           
        </tr>
    )
}
