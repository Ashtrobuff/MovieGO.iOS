import { View, Text, Platform, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './theme';
import { TouchableOpacity } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Image } from 'react-native';
import MovieList from './MovieList';
import Loading from './Loading';
import { useRoute } from '@react-navigation/native';
import { fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviedb';
var{width,height}= Dimensions.get('window')
const ios=Platform.OS=='ios';
const verticalMargin=ios? '': 'my-3';
export default function PersonScreen() {
    const{params:item}=useRoute();
    const navigation =useNavigation();
    const [isFavourite, togglefavourite]=useState(false);
    const [personmovies ,setpersonmovies]=useState([])
    const [loading,setloading]=useState(false)
    const[person,setperson]=useState({})

    useEffect(()=>{
        setloading(true);
       getpersonDetails(item.id)
       getpersonMovies(item.id)
    },[item])

const getpersonDetails=async id=>{
   const data= await fetchPersonDetails(id)
   if(data)
   setperson(data);
   setloading(false);

   
}
const getpersonMovies=async id=>{
  const data= await fetchPersonMovies(id)
  console.log('got person movies',data)
  if(data&& data.cast) setpersonmovies(data.cast);
  setloading(false);

  
}
  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{paddingBottom:20}}>
    <SafeAreaView className={"z-20 w-full flex-row justify-between items-center px-8"+verticalMargin}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.background} className="rounded-xl p-1 ml-4">
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" style={styles.background}></ChevronLeftIcon>
        </TouchableOpacity>
        <TouchableOpacity className="pr-4" onPress={()=>togglefavourite(!isFavourite)}>
            <HeartIcon size="35" color={isFavourite? 'red':'white'}/>
        </TouchableOpacity>
        </SafeAreaView>
        {loading?(<Loading/>):(  <View>
          <View className="flex-row justify-center" style={{shadowColor:'grey', shadowRadius:14,shadowOffset:{width:0,height:5},shadowOpacity:1}}>
            <View className='items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500'>
              <Image source={{uri:image342(person?.profile_path)}} style={{height:height*0.43, width:width*0.74}}/></View>
          </View>
         
          <View className="mt-6"><Text className="text-3xl text-white font-bold text-center"> {
            person?.name
          }</Text>
          <Text className="text-base text-neutral-500 text-center"> {
            person?.place_of_birth
          }</Text>
          </View>
          <View className="mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">{person?.gender==1?'Female':'Male'}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">{person?.birthday}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known For</Text>
              <Text className="text-neutral-300 text-sm">{person?.known_for_department}</Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">{person?.popularity?.toFixed(2)}</Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
            {person?.biography}
            </Text>
          </View>
        <MovieList title="Movies" hideSeeAll="true"data={personmovies}/> 
        </View>
        )
        }
      
  </ScrollView>
  )
}
