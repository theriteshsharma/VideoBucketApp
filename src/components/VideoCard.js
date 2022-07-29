import React from "react";
import { ItemTypes } from "../constants";
import { useDrag } from "react-dnd";
import { Card, Checkbox, Button, Space, Typography } from "antd";
import { PlayCircleFilled } from "@ant-design/icons";

/**
 * @author
 * @function VideoCard
 **/

export const VideoCard = (props) => {
  const { Text } = Typography;
  const { card, handleSelectedCard, playVideo } = props;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id: card.id, buckId: card.buckId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <Card ref={drag} key={card.id} >
      <Space size="middle">
        <Checkbox
          style={{ padding: "5px" }}
          onChange={(e) => {
            handleSelectedCard(card.id, e.target.checked);
          }}
        />
        <Text strong>{card.name} </Text>
        <Button
          type="link"
          size="middle"
          onClick={() => {
            playVideo(card);
          }}
        >
          <PlayCircleFilled style={{ fontSize: "28px" }} />
        </Button>
      </Space>
    </Card>
  );
};
