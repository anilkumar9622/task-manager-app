import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import styled from '@emotion/styled';
import useTheme from '../hooks/useTheme';

const Card = styled.div`

//   background: ${({ $mode }) => $mode === 'dark' ? '#1e1e2f' : '#ffffff'};
//   color: ${({ $mode }) => $mode === 'dark' ? '#e0e0e0' : '#111111'};
  background: #ffffff;
  color: #111111;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TaskCard = ({ item, index }) => {
    const {theme} = useTheme()
    return(
   
  <Draggable draggableId={String(item.id)} index={index}>
    {(provided) => (
      <Card
        $mode={theme}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div><strong></strong> {item.text}</div>
        {/* <div><strong>Due:</strong> {item.Due_Date}</div> */}
      </Card>
    )}
  </Draggable>
)};

export default TaskCard;
