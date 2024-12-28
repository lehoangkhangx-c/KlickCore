
import type { PropsWithChildren } from 'react';
import React, { useRef, useState } from 'react';
import {
    Button, FlatList,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';


function HomePage(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [searchText, setSearchText] = useState('');
  const dataRef = useRef([
    // thêm hình ảnh và day vào đây
    { id: '1', code: '001', day1: 'Dây A', day2: 'Dây B', day3: 'Dây C', note: 'Ghi chú dây 001', image: require('../../assets/images/product/hinh_001.jpg'), color: 'red'},
    { id: '2', code: '002', day1: 'Dây X', day2: 'Dây Y', day3: 'Dây A', note: 'Ghi chú dây 002', image: require('../../assets/images/product/hinh_002.jpg'), color: 'blue'},
    { id: '3', code: '003', day1: 'Dây P', day2: 'Dây B', day3: 'Dây R', note: 'Ghi chú dây 003', image: require('../../assets/images/product/hinh_003.jpg'), color: 'yellow'},
    // thêm dữ liệu mẫu ở đây
  ])
  const [data, setData] = useState(dataRef.current);

  const handleSearch = () => {
    // if(!searchText) {}
    // Tìm kiếm theo Code hoặc Dây 1, Dây 2, Dây 3
    const filteredData = dataRef.current.filter(item =>
      item.code.includes(searchText) ||
      item.day1.includes(searchText) ||
      item.day2.includes(searchText) ||
      item.day3.includes(searchText)
    );
    setData(filteredData);
  };


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        <View>
          {/* Hình nền */}
          <ImageBackground
            source={require('../../assets/images/product/hinh_001.jpg')} // Đặt hình nền cho thẻ này
            style={{width:'100%', height:200}}
          >
            {/* <Text style={styles.text}>Đây là một thẻ với hình nền</Text> */}
        </ImageBackground>
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.container}>
            <Text style={styles.header}>Danh Sách Dây</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập thông tin tìm kiếm"
              value={searchText}
              onChangeText={setSearchText}
            />
            <Button title="Tìm Kiếm" onPress={handleSearch} />
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <Text style={{...styles.text, color: '#666'}}>{item.code}</Text>
                  <Text style={{...styles.text, color: '#666'}}>{item.day1}</Text>
                  <Text style={{...styles.text, color: '#666'}}>{item.day2}</Text>
                  <Text style={{...styles.text, color: '#666'}}>{item.day3}</Text>
                </View>
              )}
            />
            {/* danh sách hình ảnh */}
            <View style={{
              justifyContent:'center',
              alignItems:'center'
            }}>
              {searchText ? 
                data.map(image=>(
                  <>
                    <Image
                      source={image.image}  // Dùng đường dẫn local hình ảnh
                      style={styles.image}
                    />

                      <Text style={{color:'#ccc', fontSize: 16}}>---------------------------------------------</Text>
                      <Text style={{...styles.text}}>{image.note}</Text>
                  </>
              ))
              : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    // borderColor:'red', 
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
  image: {
    width: '80%',
    // height: 50,
    marginTop: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
});

export default HomePage;
