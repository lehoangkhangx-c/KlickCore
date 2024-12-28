import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string | null;
  portCount: number;
}

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: "",
    code: "",
    name: "",
    description: "",
    image: null,
    portCount: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleAddOrEditProduct = () => {
    if (!currentProduct.code || !currentProduct.name) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin sản phẩm.");
      return;
    }

    if (isEditing) {
      // Sửa sản phẩm
      setProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.id === currentProduct.id ? currentProduct : item
        )
      );
    } else {
      // Thêm sản phẩm mới
      setProducts((prevProducts) => [
        ...prevProducts,
        { ...currentProduct, id: Date.now().toString() },
      ]);
    }

    // Reset form
    setCurrentProduct({
      id: "",
      code: "",
      name: "",
      description: "",
      image: null,
      portCount: 0,
    });
    setIsEditing(false);
  };

  const handleDeleteProduct = (id: string) => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa sản phẩm này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () =>
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
          ),
      },
    ]);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setCurrentProduct({
          ...currentProduct,
          image: response.assets[0].uri || null,
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý thông tin sản phẩm</Text>

      {/* Form thêm/sửa sản phẩm */}
      <View style={styles.form}>
        <TextInput
          placeholder="Mã sản phẩm"
          value={currentProduct.code}
          onChangeText={(text) =>
            setCurrentProduct({ ...currentProduct, code: text })
          }
          style={styles.input}
        />
        <TextInput
          placeholder="Tên sản phẩm"
          value={currentProduct.name}
          onChangeText={(text) =>
            setCurrentProduct({ ...currentProduct, name: text })
          }
          style={styles.input}
        />
        <TextInput
          placeholder="Mô tả sản phẩm"
          value={currentProduct.description}
          onChangeText={(text) =>
            setCurrentProduct({ ...currentProduct, description: text })
          }
          style={styles.input}
          multiline
        />
        <TextInput
          placeholder="Số cổng kết nối"
          value={currentProduct.portCount.toString()}
          onChangeText={(text) =>
            setCurrentProduct({
              ...currentProduct,
              portCount: parseInt(text) || 0,
            })
          }
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleChooseImage}
          style={styles.imagePicker}
        >
          <Text style={styles.imagePickerText}>
            {currentProduct.image ? "Đổi ảnh" : "Chọn ảnh"}
          </Text>
        </TouchableOpacity>
        {currentProduct.image && (
          <Image source={{ uri: currentProduct.image }} style={styles.image} />
        )}
        <Button
          title={isEditing ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
          onPress={handleAddOrEditProduct}
        />
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.productImage} />
            )}
            <View style={styles.productInfo}>
              <Text style={styles.productText}>Mã: {item.code}</Text>
              <Text style={styles.productText}>Tên: {item.name}</Text>
              <Text style={styles.productText}>Mô tả: {item.description}</Text>
              <Text style={styles.productText}>
                Số cổng kết nối: {item.portCount}
              </Text>
            </View>
            <View style={styles.actions}>
              <Button
                title="Sửa"
                onPress={() => handleEditProduct(item)}
                color="#4CAF50"
              />
              <Button
                title="Xóa"
                onPress={() => handleDeleteProduct(item.id)}
                color="#F44336"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  form: { marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  imagePicker: { backgroundColor: "#2196F3", padding: 10, borderRadius: 5, alignItems: "center", marginBottom: 10 },
  imagePickerText: { color: "#fff", fontWeight: "bold" },
  image: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },
  productItem: { flexDirection: "row", backgroundColor: "#f9f9f9", padding: 10, marginBottom: 10, borderRadius: 5 },
  productImage: { width: 60, height: 60, marginRight: 10, borderRadius: 5 },
  productInfo: { flex: 1 },
  productText: { marginBottom: 5 },
  actions: { justifyContent: "space-between" },
});

export default ProductManager;
