import { Layout, Row, Timeline,Typography,Col, Button } from 'antd';

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../store/historySlice';

/**
* @author
* @function History
**/

export const History = (props) => {
    var history =  useSelector(state => state.history.history);
    const {Title,Text} = Typography
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    //history.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
   useEffect(() =>{
    dispatch(getHistory());
   },[])
    
    return(
  
    <>
    <Layout style={{height:"100vh"}}>
    <Layout.Header>
     
     
     <Button type="primary" onClick={() =>{navigate('/')}} >Home</Button>

  </Layout.Header>
    <Title>History</Title>
    <Row algin="Center" justify="center" >
        <Col span={10}  >
    <Timeline >
       
        {
            history.map(hist => <Timeline.Item><Text strong>{hist.name}</Text> : <Text>{new Date(hist.timestamp).toLocaleString('en-GB', { timeZone: 'UTC' })}</Text></Timeline.Item>)
        }
      
    </Timeline>
    </Col>
    </Row>
    </Layout>
    </>
   
    )

 }