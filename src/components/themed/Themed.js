import { useColorScheme, View as DefaultView } from "react-native";
import Colors from "../../../constants/colors";

export function View(props) {
  const theme = useColorScheme();
  const { style, ...otherProps } = props;

  return (
    <DefaultView
      style={[
        { backgroundColor: Colors[theme].background, paddingHorizontal: 18 },
        style,
      ]}
      {...otherProps}
    />
  );
}
