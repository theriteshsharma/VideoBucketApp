import {React, useEffect,useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Button, Row,  Layout, Modal, Input, Space} from 'antd';
import {  addNewBucket, getBuckets, } from '../store/bucketSlice';
import  { addNewCard, getCards } from '../store/cardSlice';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Bucket } from '../components/Bucket';
import { addVideoToHistory, getHistory } from '../store/historySlice';

/**
 * @author
 * @function Home
 **/

export const Home = (props) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state);
    const buckets = data.user.buckets;
    const cards = data.cards.cards;
   
    const [playVideoId,setPlayVideoId] = useState();
    const [playVideoLink,setPlayVideoLink] = useState('');
    const [playVideoName,setPlayVideoName] = useState('');

    // Input Varaibles
    const [bucketName,setBucketName] = useState('');
    const [newCardName,setNewCardName] = useState('');
    const [newCardLink,setNewCardLink] = useState('');
    
    //Modal Handlers
    const [viewModal, setViewModal] = useState(false);
    const [createCardModal,toggleCreateCardModal] = useState(false);
    const [addBucketModal,setAddBucketModal] = useState(false);
    const [activeBucket,setActiveBucket] = useState();
    const navigate = useNavigate();

    useEffect(() =>{
      
     dispatch(getBuckets());
     dispatch(getCards());
     dispatch(getHistory());
    },[])
    
  const playVideo = (vid) =>{
  
    setPlayVideoName(vid.name);
    setPlayVideoLink(vid.link);
    setPlayVideoId(vid.id);
    setViewModal(true);
    dispatch(addVideoToHistory({cardId: vid.id,name:vid.name,link:vid.link,timestamp:Date()}))
  }

  const handleAddBucket  = ()=>{
      dispatch(addNewBucket({ name: bucketName}));
      setAddBucketModal(false);
      setBucketName('');
  }

  const handleAddCard = () =>{
    dispatch(addNewCard({
      buckId:activeBucket,
      name:newCardName,
      link:newCardLink
    }))
    toggleCreateCardModal(false )
  }


  const renderBuckets = (buckets, cards) => {
    let _cards = {};
    cards.forEach((item) => {
      if (!_cards[item.buckId]) _cards[item.buckId] = [];
      _cards[item.buckId].push(item);
    });

    let _buckets = buckets.map((item) => (
      <Bucket 
      key={item.id}
      name={item.name} 
      id={item.id} 
      createCard={toggleCreateCardModal} 
      activeBucket={setActiveBucket}  
      cards={_cards[item.id]}
      playVideo={playVideo}
      />
    ));
    return _buckets;
  };


  

  return (
      

    <div style={{height:"100%"}}>
        {/* Play Video Modal */}
        <Modal width="80%" title={playVideoName} visible={viewModal} footer={null} onCancel={() => {setViewModal(false)}}>
            <ReactPlayer url={playVideoLink} />
        </Modal>
        {/* Add Bucket Modal */}
        <Modal  title="Add Bucket" visible={addBucketModal} footer={null} onCancel={() => {setAddBucketModal(false)}}>
          <Space size="medium">
            <Input value={bucketName} onChange={(e) => {
                setBucketName(e.target.value)}} />
            <Button type="primary" onClick={handleAddBucket} >Create Bucket</Button>
          </Space>
        </Modal>

        {/* Create Card Modal */}
        <Modal  title="Add Bucket" visible={createCardModal} footer={null} onCancel={() => {toggleCreateCardModal(false)}}>
        <Space size="medium">
            <Input placeholder='Name' value={newCardName} onChange={(e) => {
                setNewCardName(e.target.value)}} />
            <Input placeholder='Link' value={newCardLink} onChange={(e) => {
                setNewCardLink(e.target.value)}} />
            <Button type="primary" onClick={handleAddCard}  >Create Card</Button>
            </Space>
        </Modal>

      <Layout>
      <Layout.Header>
        
        <Button type="primary" onClick={() => setAddBucketModal(true)} style={{marginRight:"10px"}}>+Bucket</Button>
        <Button type="primary" onClick={() =>{navigate('/history')}} >History</Button>

     </Layout.Header>
      <Layout.Content style={{padding:"40px 20px",height:"80vh"}}>
        
          <Row gutter={[16,16]} align="top"  >
            
              {buckets.length > 0 &&
                cards.length > 0 &&
                renderBuckets(buckets, cards)}
           
          </Row>
          
        </Layout.Content>
        <Layout.Footer>
          Video APP BY Ritesh Sharma
        </Layout.Footer>
      </Layout>
    </div>
  );
};
