import TodoList from "./components/TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

const AddButton = styled(Button)`
  margin: 3px;
`;

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [todoList, setTodoList] = useState([]); //array
  const [textInput, setTextInput] = useState(""); //string

  useEffect(() => {
    const storageTodoList = localStorage.getItem(
      TODO_APP_STORAGE_KEY
    );
    if (storageTodoList) {
      setTodoList(JSON.parse(storageTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      TODO_APP_STORAGE_KEY,
      JSON.stringify(todoList)
    );
  }, [todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback(
    (e) => {
      // them text input vao danh sach todolist
      setTodoList((prevTodoList) => [
        { id: v4(), name: textInput, isCompleted: false },
        ...prevTodoList,
      ]);

      setTextInput("");
    },
    [textInput, todoList]
  );

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: true }
          : todo
      )
    );
  }, []);

  return (
    <>
      <h3>Danh sách cần làm</h3>
      <Textfield
        none="add-todo"
        placeholder="Them viec can lam..."
        elemAfterInput={
          <AddButton
            isDisabled={!textInput}
            appearance="primary"
            onClick={onAddBtnClick}
          >
            Thêm
          </AddButton>
        }
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <TodoList
        todoList={todoList}
        onCheckBtnClick={onCheckBtnClick}
      ></TodoList>
    </>
  );
}

export default App;
