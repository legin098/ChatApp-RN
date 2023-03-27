import { useState } from "react";
import { Button } from "react-native";
import { MyInput } from "./MyInput";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import { View } from "./themed/Themed";


export const AddTodo = ({setTodos}) => {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    const { data } = await API.graphql(
      graphqlOperation(createTodo, {
        input: {
          name,
        },
      })
    );
    setName("");
    setTodos((prevTodos) => [...prevTodos, data.createTodo])
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
      <MyInput label={"Create Todo"} onChangeText={setName} value={name} />
      <Button title={"Add"} onPress={handleSubmit} />
    </View>
  );
};
