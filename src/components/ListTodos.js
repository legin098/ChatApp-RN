import { useEffect, useState } from "react";
import { Button, ScrollView, View as DefaultView } from "react-native";
import { AddTodo } from "./AddTodo";
import { MyText } from "./MyText";
import { API, graphqlOperation } from "aws-amplify";
import { deleteTodo, updateTodo } from "../graphql/mutations";
import { listTodos } from "../graphql/queries";
import { View } from "./themed/Themed";

export const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await API.graphql(graphqlOperation(listTodos));
      setTodos(data.listTodos.items);
    })();
  }, []);

  const handleDeleteTodo = async (id) => {
    await API.graphql(
      graphqlOperation(deleteTodo, {
        input: { id },
      })
    );
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = async (id, name) => {
    await API.graphql(
      graphqlOperation(updateTodo, {
        input: { id, name },
      })
    );
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, name } : todo))
    );
    console.log("Todo updated")
  };

  return (
    <View style={{flex: 1}}>
      <AddTodo setTodos={setTodos} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
        <MyText type="title">Todos</MyText>
        {todos.map((todo) => (
          <DefaultView
            key={todo.id}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MyText>{todo.name}</MyText>
            <DefaultView
              style={{
                flexDirection: "row",
              }}
            >
              <Button title={"Update"} onPress={() => handleUpdateTodo(todo.id)} />
              <Button
                title={"Delete"}
                color={"red"}
                onPress={() => handleDeleteTodo(todo.id)}
              />
            </DefaultView>
          </DefaultView>
        ))}
      </ScrollView>
    </View>
  );
};
