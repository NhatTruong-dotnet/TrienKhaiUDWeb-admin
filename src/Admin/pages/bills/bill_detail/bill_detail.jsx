import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import DynamicModal from '../../../../Common/DynamicModal/DynamicModal';
export default function Bill_detail(props) {
  const [orderList, setOrderList] = useState([]);
  const [total, setTotal] = useState(0);
  const [reRender, setReRender] = useState(false)

  
  useEffect(async () => {
    let orderListById = await axios.get("https://serverbookstore.herokuapp.com/api/order/" + props.item.userGmail + "/" + props.item.orderId).then((data) => {
      data.data.orderList.map((element) => {
        setTotal(element.price * element.amount)
      })
    });

    let byId = await axios.get("https://serverbookstore.herokuapp.com/api/order/" + props.item.userGmail + "/" + props.item.orderId)
    setOrderList(byId.data.orderList)
  }, [reRender])

  async function deliverySuccessful(orderId) {
    let successFullBody = {
      isSucessful: true
    }
    
    await axios.put("https://serverbookstore.herokuapp.com/api/bills/detail/updated-delivery/" + orderId, successFullBody)
    setReRender(!reRender)
  }
  async function deliveryFailed(orderId) {
    let faliedlBody = {
      isSucessful: false
    }

    await axios.put("https://serverbookstore.herokuapp.com/api/bills/detail/updated-delivery/" + orderId, faliedlBody)
    setReRender(!reRender)

  }
  return (

    <div style={{ padding: 20 }}>

      <Row gutter={24} style={{ marginTop: 32 }}>
        <Col span={6}>
          <h4>{props.item.userGmail}</h4>
          <div>Mã hóa đơn # : {props.item.id}</div>
          <div>Ngày đặt hàng : {props.item.createDate}</div>
          <div>Ngày nhận hàng :</div>
        </Col>

      </Row>

      <Row style={{ marginTop: 20 }}>
        <Table dataSource={orderList}
          pagination={false}
        >
          <Table.Column title="Tên sách" width={'50px'} dataIndex='bookName' />
          <Table.Column title="Số lượng" dataIndex='amount' />
          <Table.Column title="Giá" dataIndex='price' />
          {/* https://github.com/react-component/table/issues/46 */}
          <Table.Column title="Tổng cộng" render={(record) => record.price * record.amount} />
        </Table>
      </Row>

      <Row style={{ marginTop: 48 }}>
        <Col span={8} offset={16}>
          <table>
            <tr>
              <th>Tổng tiền :</th>
              <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</td>
            </tr>
            <tr>
              <th>Phí vận chuyển :</th>
              <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(15000)}</td>
            </tr>
            <tr>
              <th>Tổng thanh toán :</th>
              <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total + 15000)}</td>
            </tr>
          </table>
        </Col>

      </Row>
      {
        ( !reRender) && <Row>
          &nbsp;
          <button type="button" class="btn btn-success" onClick={async() => await deliverySuccessful(props.item.orderId)}>Giao hàng thành công</button>
          &nbsp; &nbsp;
          <button type="button" class="btn btn-danger" onClick={async() => await deliveryFailed(props.item.orderId)}>Giao hàng thất bại</button>
        </Row>
      }
      <Row style={{ marginTop: 48, textAlign: 'center' }}>
        notes
      </Row>
    </div>
  )
}
