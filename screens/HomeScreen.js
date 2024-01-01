import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react'
import {View,Text, TouchableOpacity, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native'
import { SparklesIcon as SparklesIconOutline, Bars3CenterLeft, Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from './theme';
import TrendingMovies from './TrendingMovies';
import { useState } from 'react';
import MovieList from './MovieList';
const ios= Platform.OS=='ios';
import {useNavigation} from '@react-navigation/native';
import Loading from './Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
const HomeScreen = () => {
  const [Trending,setTrending]=useState([]);
  const[upcoming,setupcoming]=useState([1,2,4]);
  const [toprated,settoprated]=useState([12,3,4])
  const navigation=useNavigation();
  const [loading,setloading]=useState(true);
   useEffect(()=>{
    getTrendingMovies(),
    getupcomingMovies(),
    getTopratedMovies()
   },[])
    const getTrendingMovies=async()=>{
      const data=await fetchTrendingMovies();
      console.log('got trending movies :',data);
      if (data && data.results) setTrending(data.results);
      setloading(false)
    }

    const  getupcomingMovies=async()=>{
      const data=await fetchUpcomingMovies();
      if (data && data.results) setupcoming(data.results);
      setloading(false)
    }
    const  getTopratedMovies=async()=>{
      const data=await fetchTopRatedMovies();
      if (data && data.results) settoprated(data.results);
      setloading(false)
    }
  return (
    <View className=" flex-1 bg-neutral-800">   
        <SafeAreaView className="-mb-2">
          <StatusBar style="light"/>
          <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white'/>
          <Text className="text-white text-3xl font-bold"><Text style={styles.text}>M</Text>ovies</Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" onPress={()=>navigation.navigate("Search")}/>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
        {loading?(<Loading/>):( <ScrollView showsVerticalScrollIndicator={false}
         contentContainerStyle={{paddingBottom:10}}>
            {/*Tredingmovies*/}
            {Trending.length>0 && <TrendingMovies data={Trending}/>}
          <MovieList title="Upcoming" data={upcoming} hideSeeAll={true}/>
          <MovieList title="TopRated" data={toprated} hideSeeAll={true}/>
        </ScrollView>)}
       
    </View>
 )
}

export default HomeScreen