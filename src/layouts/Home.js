import {React, useEffect,useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Button,Card, Col, Divider, Row, Space, Layout, Modal, Input} from 'antd';
import { addBucket, addNewBucket, getBuckets, deleteBucketById } from '../store/bucketSlice';
import  { getCards } from '../store/cardSlice';
import { Header } from '../components/Header';
import ReactPlayer from 'react-player';
/**
 * @author
 * @function Home
 **/

export const Home = (props) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state);
    const buckets = data.user.buckets;
    const cards = data.cards.cards;
    

    const [viewModal, setViewModal] = useState(false);
    const [playVideoLink,setPlayVideoLink] = useState('');
    const [playVideoName,setPlayVideoName] = useState('');

    const [addBucketModal,setAddBucketModal] = useState(false);

    const [bucketName,setBucketName] = useState('');
    useEffect(() =>{
      console.log(buckets)
     dispatch(getBuckets());
     dispatch(getCards());
    },[])
    
  const playVideo = (name, link) =>{
      setPlayVideoName(name);
    setPlayVideoLink(link);
    setViewModal(true);
  }

  const handleAddBucket  = ()=>{
      dispatch(addNewBucket({ name: bucketName}));
      setAddBucketModal(false);
      setBucketName('');
  }

  const handleDeleteBucketById = (id) =>{
        dispatch(deleteBucketById({id}));
  }
  const renderBuckets = (buckets, cards) => {
    let _cards = {};
    cards.forEach((item) => {
      if (!_cards[item.buckId]) _cards[item.buckId] = [];
      _cards[item.buckId].push(item);
    });

    let _buckets = buckets.map((item) => (
      <Col >
        <Card
          title={item.name}
          extra={
            <Space size="small">
              <Button size="small" type="primary">
                + Cards
              </Button>
              <Button size="small" type="primary" onClick={() => {handleDeleteBucketById(item.id)}} danger>
                Delete
              </Button>
            </Space>
          }
          style={{
            width: 300,
          }}
        >
          {_cards[item.id] &&
            _cards[item.id].map((card) => <Card>{card.name} <Button type="primary" size="small" onClick={()=>{playVideo(card.name,card.link)}}>{'>'}</Button></Card>)}
        </Card>
      </Col>
    ));
    return _buckets;
  };


  

  return (
      

    <div>
        {/* Play Video Modal */}
        <Modal width="80%" title={playVideoName} visible={viewModal} footer={null} onCancel={() => {setViewModal(false)}}>
            <ReactPlayer url={playVideoLink} />
        </Modal>
        {/* Add Bucket Modal */}
        <Modal  title="Add Bucket" visible={addBucketModal} footer={null} onCancel={() => {setAddBucketModal(false)}}>
            <Input value={bucketName} onChange={(e) => {
                setBucketName(e.target.value)}} />
            <Button type="primary" onClick={handleAddBucket} >Create Bucket</Button>
        </Modal>
      <Layout>
      <Layout.Header>
     
        <Button type="primary" onClick={() => setAddBucketModal(true)}>+Bucket</Button>
        <Button type="primary" >History</Button>

     </Layout.Header>
        <Layout.Content>
          <Row gutter={[16,16]} align="top" style={{margin:'40px 20px'}}>
            
              {buckets.length > 0 &&
                cards.length > 0 &&
                renderBuckets(buckets, cards)}
           
          </Row>
        </Layout.Content>
      </Layout>
    </div>
  );
};
