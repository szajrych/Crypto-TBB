import { View, FlatList } from "react-native";

const ListComponent = ({ data, renderItem }) => {
  return (
    <FlatList
      style={{ height: 350, flexGrow: 0 }}
      contentContainerStyle={{
        padding: 20,
        marginBottom: 100,
        marginTop: -15,
      }}
      ListFooterComponent={<View style={{ height: 20 }} />}
      data={data}
      renderItem={renderItem}
    />
  );
};

export default ListComponent;
