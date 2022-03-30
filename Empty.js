import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Input
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
// import Search from "./Search";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const FetchNews = ({navigation }) => {
  const [News, setNews] = useState([]);
  const [masterNews, setMasterNews] = useState([]);
  const [search, setSearch] = useState();

  

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0`)
        .then((res) => res.json())
        .then((response) => {
          setNews(response.hits);
          setMasterNews(response.hits);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);


      
    
  

  return (
    <View style={{ alignItems: "center" }}>
      {News.length === 0 ? (
        <ActivityIndicator
          style={{
            height: deviceHeight,
            width: deviceWidth,
            alignItems: "center",
            justifyContent: "center",
          }}
          size="large"
          color="black"
        />
      ) : (
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View
            style={{
              paddingTop: 30,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {/* <Search /> */}
            <TextInput
              style={{
                backgroundColor: "white",
                borderColor: "#C0C0C0",
                borderWidth: 1,
                width: 250,
                paddingVertical: 5,
                paddingHorizontal: 5,
                borderRadius:5
              }}
              type="text"
              value={search}
              placeholder="Search"
              underlineColorAndroid='transparent'
              onChangeText={text=> searchFilter(text)}
            />
            <Text style={{ fontSize: 40 }}>+</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {News.map((News, index) =>
              News.title ? (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate("WebView", {
                      url: News.url,
                    });
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                      backgroundColor: "white",
                      alignItems: "center",
                      borderRadius: 10,
                      elevation: 10,
                      width: deviceWidth - 30,
                      marginVertical: 7,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          marginVertical: 2,
                          textAlign: "justify",
                          fontWeight: "bold",
                        }}
                      >
                        {News.title}
                      </Text>
                      <Text
                        style={{
                          marginVertical: 2,
                          color: "#3DB2FF",
                          textAlign: "justify",
                        }}
                      >
                        {News.url}
                      </Text>
                      <Text style={{ marginVertical: 2, textAlign: "justify" }}>
                        {News.created_at}
                      </Text>
                      <Text
                        style={{
                          marginVertical: 2,
                          fontStyle: "italic",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        -{News.author}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default FetchNews;
