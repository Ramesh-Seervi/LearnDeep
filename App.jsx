import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, FlatList } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const imageUrls = [
  { key: '1', uri: 'https://picsum.photos/200/300' },
  { key: '2', uri: 'https://picsum.photos/200/301' },
  { key: '3', uri: 'https://picsum.photos/200/302' },
  { key: '4', uri: 'https://picsum.photos/200/303' },
  { key: '5', uri: 'https://picsum.photos/200/304' },
  { key: '6', uri: 'https://picsum.photos/200/305' },
  { key: '7', uri: 'https://picsum.photos/200/306' },
  { key: '8', uri: 'https://picsum.photos/200/307' },
  { key: '9', uri: 'https://picsum.photos/200/308' },
  { key: '10', uri: 'https://picsum.photos/200/309' },
];

const App = () => {
  const [data, setData] = useState(imageUrls);

  const renderItem = ({ item, drag, isActive }) => (
    <View
      style={[
        styles.item,
        { 
          transform: [{ scale: isActive ? 1.1 : 1 }],
          elevation: isActive ? 10 : 2,
        },
      ]}
    >
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View
        style={styles.dragHandle}
        onTouchStart={drag}  // Trigger drag on touch start
      />
    </View>
  );

  const onDragEnd = ({ data }) => {
    console.log('New order of items:', data);
    setData(data);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.title}>Drag and Drop Images</Text>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onDragEnd={onDragEnd}
        numColumns={3}
      />
      <Text style={styles.orderTitle}>Current Order of Keys:</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Text style={styles.orderText}>{item.key}</Text>
        )}
        keyExtractor={(item) => item.key}
        horizontal
        style={styles.orderList}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    height: 100,
    width: 100,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  dragHandle: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    // This view covers the entire item, making it draggable from any point within the item
  },
  orderTitle: {
    fontSize: 18,
    marginTop: 20,
  },
  orderList: {
    marginTop: 10,
  },
  orderText: {
    fontSize: 16,
    marginHorizontal: 5,
  },
});

export default App;
