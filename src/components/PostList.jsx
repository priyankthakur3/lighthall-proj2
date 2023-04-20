/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from '@xstyled/styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PostItem from './PostItem';
import { Typography } from '@mui/material';

export const getBackgroundColor = (isDraggingOver, isDraggingFrom) => {
  if (isDraggingOver) {
    return '#FFEBE6';
  }
  if (isDraggingFrom) {
    return '#E6FCFF';
  }
  return '#EBECF0';
};

const Wrapper = styled.div`
  background-color: ${(props) => getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: 8px;
  border: 8px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

const scrollContainerHeight = 350;

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  /*min-height: ${scrollContainerHeight}px;*/
  height : 100%;
  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  padding-bottom: 8px;
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
`;

/* stylelint-disable block-no-empty */
const Container = styled.div`
  height : 100%;
`;
/* stylelint-enable */

const InnerQuoteList = React.memo(function InnerQuoteList(props) {
  return props.quotes.map((quote, index) => (
    <Draggable key={quote.id} draggableId={quote.id} index={index}>
      {(dragProvided, dragSnapshot) => (
        <PostItem
          key={quote.id}
          quote={quote}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ));
});

function InnerList(props) {
  const { quotes, dropProvided } = props;
  const title = props.title ? <Typography>{props.title}</Typography> : null;

  return (
    <Container>
      {title}
      <DropZone ref={dropProvided.innerRef}>
        <InnerQuoteList quotes={quotes} />
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  );
}

export default function PostList(props) {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    listId = 'LIST',
    listType,
    style,
    quotes,
    title,
    useClone,
  } = props;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      renderClone={
        useClone
          ? (provided, snapshot, descriptor) => (
              <PostItem
                quote={quotes[descriptor.source.index]}
                provided={provided}
                isDragging={snapshot.isDragging}
                isClone
              />
            )
          : null
      }
    >
      {(dropProvided, dropSnapshot) => (
        <Wrapper
          style={style}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <ScrollContainer style={scrollContainerStyle}>
              <InnerList quotes={quotes} title={title} dropProvided={dropProvided} />
            </ScrollContainer>
          ) : (
            <InnerList quotes={quotes} title={title} dropProvided={dropProvided} />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
}
