import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Pagination from "./Pgination";
// import Drawer from './Drawer'

const FetchNews = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [pagination, setPagination] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pagination}`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setFilteredDataSource(responseJson.hits);
          setMasterDataSource(responseJson.hits);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 10000);
    return () => clearInterval(interval);
  }, [pagination]);
  const keyboarddismiss = () => {
    Keyboard.dismiss();
  };

  const onPaginationChange = (count) => {
    setPagination(count);
  };
  //search function for title
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  //search function for author
  const searchFilterFunction2 = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.author
          ? item.author.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  //search function for url
  const searchFilterFunction3 = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.url ? item.url.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <>
        <Text style={styles.itemStyle}>{item.title.toUpperCase()}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("WebView", {
              url: item.url,
            });
          }}
        >
          <Text style={{ padding: 5, color: "#3DB2FF", textAlign: "justify" }}>
            {item.url}
          </Text>
        </TouchableOpacity>
        <Text style={{ padding: 5, textAlign: "justify" }}>
          {item.created_at}
        </Text>
        <Text style={styles.textAuthor}>{item.author}</Text>
      </>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={styles.ItemSeparatorView} />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => {
              searchFilterFunction(text);
              searchFilterFunction2(text);
              searchFilterFunction3(text);
            }}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
        </View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          showsVerticalScrollIndicator={false}
          onScroll={keyboarddismiss}
        />
        <Pagination onPaginationChange={onPaginationChange} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8E8A6",
    flex: 1,
    padding: 10,
  },
  inputbox: {
    paddingTop: 20,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#F2F5C8",
    elevation: 20,
    flexDirection: "row",
  },
  ItemSeparatorView: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#F2F5C8",
    paddingVertical: 5,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    elevation: 10,
  },
  itemStyle: {
    padding: 10,
    textAlign: "justify",
  },
  textAuthor: {
    padding: 5,
    marginVertical: 2,
    fontStyle: "italic",
    fontWeight: "bold",
    fontVariant: ["small-caps"],
    textAlign: "right",
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    borderColor: "#009689",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    borderRadius: 6,
    width: 320,
    paddingLeft: 10,
  },
});

export default FetchNews;
