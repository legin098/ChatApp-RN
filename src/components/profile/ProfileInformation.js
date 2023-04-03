import { useState } from "react";
import { TextInput } from "react-native";
import { useColorScheme, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../../constants/colors";
import {
  resetFirstName,
  resetLastName,
  resetStatus,
} from "../../features/user";
import {
  updateUserFirstName,
  updateUserLastName,
  updateUserStatus,
} from "../../utils/userOperations";
import { MyText } from "../MyText";

export const ProfileInformation = () => {
  const theme = useColorScheme();
  const user = useSelector((state) => state.user);

  return (
    <View style={{ paddingBottom: 44 }}>
      <MyText
        type="caption"
        style={{ fontWeight: "600", color: Colors[theme].text + "40" }}
      >
        INFORMATION
      </MyText>
      <InfoField
        label={"Fisrt Name"}
        canEdit
        value={user.firstName}
        theme={theme}
        handleUpdate={updateUserFirstName}
        handleRedux={resetFirstName}
      />
      <InfoField
        label={"Last Name"}
        canEdit
        value={user.lastName}
        theme={theme}
        handleUpdate={updateUserLastName}
        handleRedux={resetLastName}
      />
      <InfoField label={"Email"} value={user.email} theme={theme} />
      <InfoField
        label={"Status"}
        canEdit
        value={user.status}
        theme={theme}
        handleUpdate={updateUserStatus}
        handleRedux={resetStatus}
      />
    </View>
  );
};

function InfoField({
  label,
  value,
  theme,
  canEdit,
  handleUpdate,
  handleRedux,
}) {
  const { id } = useSelector((state) => state.user);
  const [localValue, setlocalValue] = useState(value);
  const dispatch = useDispatch();

  return (
    <View
      style={[
        styles.fieldContainer,
        { borderBottomColor: Colors[theme].text + 80 },
      ]}
    >
      <MyText
        type="caption"
        style={{
          fontWeight: "500",
          color: Colors[theme].text + "80",
          paddingRight: 10,
        }}
      >
        {label}
      </MyText>
      <TextInput
        placeholder={label}
        value={localValue}
        onChangeText={canEdit && setlocalValue}
        keyboardType={canEdit ? "web-search" : "default"}
        onSubmitEditing={(event) => {
          canEdit && handleUpdate(id, event.nativeEvent.text);
          canEdit && dispatch(handleRedux(event.nativeEvent.text));
        }}
        style={{
          fontWeight: "500",
          color: Colors[theme].text,
          flexShrink: 1,
          textAlign: "right",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 15,
    alignItems: "center",
  },
});
