import React, { useState } from "react";
import { Col, Card, Space, Button, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { deleteBucketById } from "../store/bucketSlice";
import { deleteMultiplCards, moveCardFromTO } from "../store/cardSlice";
import { VideoCard } from "./VideoCard";
import { ItemTypes } from "../constants";
import { useDrop } from "react-dnd";
import { DeleteFilled } from "@ant-design/icons";

export const Bucket = (props) => {
  const { id, name, createCard, activeBucket, cards, playVideo } = props;
  const [selectedCards, setSelectedCards] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: (monitor) => {
        moveCard(monitor.id, monitor.buckId, id);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [id]
  );

  const moveCard = (id, from, to) => {
    dispatch(moveCardFromTO({ id, from, to }));
  };
  const handleSelectedCard = (id, isChecked) => {
    var _temp = selectedCards;
    if (isChecked) {
      _temp.push(id);
    } else {
      _temp = _temp.filter((ele) => ele != id);
    }
    setSelectedCards(_temp);
    var delBtn = _temp.length > 0 ? true : false;
    setShowDelete(delBtn);
    
  };

  return (
    <Col span={6}  ref={drop} >
      <Card
        justify="space-between"
        title={name}
        extra={
          <Space size="small">
            <Button
              size="small"
              type="primary"
              onClick={() => {
                createCard(true);
                activeBucket(id);
              }}
            >
              + Cards
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={() => dispatch(deleteBucketById({ id }))}
              danger
            >
              <DeleteFilled /> Delete
            </Button>
          </Space>
        }
      >
        {showDelete ? (
          <Button
            size="small"
            type="primary"
            onClick={() => {
              dispatch(deleteMultiplCards(selectedCards));
              setShowDelete(false);
            }}
            style={{ marginBottom: "5px" }}
            danger
          >
            <DeleteFilled />
            Delete
          </Button>
        ) : (
          ""
        )}
        {isOver ? "Over" : ""}
        {cards &&
          cards.map((card) => (
            <VideoCard
              key={card.id}
              card={card}
              playVideo={playVideo}
              handleSelectedCard={handleSelectedCard}
            />
          ))}
      </Card>
    </Col>
  );
};
