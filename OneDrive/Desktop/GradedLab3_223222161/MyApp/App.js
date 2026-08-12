import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  productCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    width: "48%",
    alignItems: "center",
    borderRadius: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: "contain",
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 16,
    color: "#e74c3c",
    fontWeight: "bold",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Derived state: filter products based on searchQuery
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Failed to load products.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product Catalog</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredProducts.length === 0 ? (
        <View style={styles.centerContent}>
          <Text>No products found.</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.productList}>
            {filteredProducts.map(product => (
              <View key={product.id} style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}




export default App;
