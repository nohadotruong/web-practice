import React from "react";
import Button from "@atlaskit/button";
import styled, { css } from "styled-components";
import CheckIcon from "@atlaskit/icon/glyph/check";

const ButtonStyle = styled(Button).attrs((props) => ({
  "data-completed": props.isCompleted,
}))`
  margin-top: 5px;
  text-align: center;

  &,
  &:hover {
    &[data-completed='true'] {
      text-decoration: line-through;
    }

    &:hover {
      .check-icon {
        display: inline-block;
      }
  }

  .check-icon {
    display: none;

    &:hover {
      background-color: #e2e2e2'
      border-radius: 3px;
    }
  }
`;

export default function Todo({ todo, onCheckBtnClick }) {
  return (
    <ButtonStyle
      isCompleted={todo.isCompleted}
      shouldFitContainer
      iconAfter={
        !todo.isCompleted && (
          <span
            className="check-icon"
            onClick={() => onCheckBtnClick(todo.id)}
          >
            <CheckIcon primaryColor="#4ff4f" />
          </span>
        )
      }
    >
      {todo.name}
    </ButtonStyle>
  );
}
