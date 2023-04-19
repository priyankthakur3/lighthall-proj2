import React from 'react';
import styled from '@xstyled/styled-components';

// const getBackgroundColor = (isDragging, isGroupedOver, authorColors) => {
//   if (isDragging) {
//     return authorColors.soft;
//   }

//   if (isGroupedOver) {
//     return '#EBECF0';
//   }

//   return '#FFFFFF';
// };

// const getBorderColor = (isDragging, authorColors) =>
//   isDragging ? authorColors.hard : 'transparent';

const imageSize = 40;

const CloneBadge = styled.div`
  background: #79f2c0;
  bottom: 4px;
  border: 2px solid #57d9a3;
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 10px;
  position: absolute;
  right: -${imageSize / 3}px;
  top: -${imageSize / 3}px;
  transform: rotate(40deg);
  height: ${imageSize}px;
  width: ${imageSize}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.a`
  border-radius: 5px;
  border: 2px solid transparent;
  border-color: red;
  background-color: red
  box-shadow: ${({ isDragging }) => (isDragging ? `2px 2px 1px #A5ADBA` : 'none')};
  box-sizing: border-box;
  padding: 8px;
  min-height: ${imageSize}px;
  margin-bottom: 8px;
  user-select: none;

  /* anchor overrides */
  color: #091e42;

  &:hover,
  &:active {
    color: #091e42;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: red;
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

const Avatar = styled.img`
  width: ${imageSize}px;
  height: ${imageSize}px;
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;
  /* flex parent */
  display: flex;
  flex-direction: column;
`;

const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }
  &::after {
    content: close-quote;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: 8px;
  align-items: center;
`;

const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;

function getStyle(provided, style) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
function PostItem(props) {
  const { quote, isDragging, isGroupedOver, provided, style, isClone, index } = props;

  return (
    <Container
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      isClone={isClone}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={quote.id}
      data-index={index}
    >
      {isClone ? <CloneBadge>Clone</CloneBadge> : null}
      <Content>
        {/* <BlockQuote>{quote.content}</BlockQuote>
        <Footer>
          <Author colors={quote.author.colors}>{quote.author.name}</Author>
          <QuoteId>
            id:
            {quote.id}
          </QuoteId>
        </Footer> */}
        <div>
            {quote.title}
        </div>
      </Content>
    </Container>
  );
}

export default React.memo(PostItem);
