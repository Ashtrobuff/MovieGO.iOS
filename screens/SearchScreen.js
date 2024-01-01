import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback } from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline'
import {useNavigation} from '@react-navigation/native';
import { useState } from 'react';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import Loading from './Loading';
import { debounce } from 'lodash'
import { image185, image342, searchMovies } from '../api/moviedb';
var{width,height}=Dimensions.get('window');

let movieName='movie_name'
export default function SearchScreen() {
    const [results,setresults]=useState([])
    const navigation = useNavigation();
    const [loading,setloading]=useState(false)
    const handleSearch=value=>{
            if(value && value.length>2){
                    setloading(true)
                    searchMovies({
                        query: value,
                        include_adult: false,
                        language: 'en-US',
                        page: '1'
                    }).then(data=>{
                        setloading(false)
                        if(data && data.results) setresults(data.results)
                
                       
                    })
            }
            else{
                setloading(false);
                setresults([])
            }
    }
    const handleTextDebounce=useCallback(debounce(handleSearch,400,[]))
  return (
  <SafeAreaView className="flex-1 bg-neutral-800">
    <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-400 rounded-full">
        <TextInput placeholder='Search Movie' placeholderTextColor={'lightgray'}
        className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide" onChangeText={handleTextDebounce}></TextInput>
        <TouchableOpacity onPress={()=>{navigation.navigate("Home")}} className="rounded-full p-3 m-1 bg-neutral-500">
        <XMarkIcon size='25' color='white'/>
    </TouchableOpacity>
    </View>

    {loading?(<Loading/>): results.length>0?( <ScrollView showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingHorizontal:15}} 
    className="space-y-3">
        <Text className="text-white font-semibold ml-1">Results({results.length})</Text>
        <View className="flex-row justify-between flex-wrap">
            {results.map((item,index)=>{
                return (
                    <TouchableWithoutFeedback key={index} onPress={()=>navigation.push("Movie",item)}>
                        <View className="space-y-2 mb-4">
                        <Image className="rounded-3xl"  source={{uri:image185(item.poster_path)}}
                        style={{width:width*0.44 ,height:height*0.3}}/>
                        <Text className="text-neutral-400 ml-1">
                            {item?.title.length>22? item?.title.slice(0,22)+"...":item?.title}
                        </Text>
                        </View>
                           
                    </TouchableWithoutFeedback>
                   
                )
                    
                
            })}
        </View>
    </ScrollView>):(<View className="flex-row justify-center">
        <Image source={require('../assets/images/movieTime.png')} className="h-96 w-96"></Image>
    </View>)
    }
   
   
  </SafeAreaView>
  )
}