import { View, Text,SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import {useRoute} from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { styles } from './theme';
import{HeartIcon}from 'react-native-heroicons/solid';
import { Dimensions } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { useState } from 'react';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MovieList from './MovieList';
import PersonScreen from './PersonScreen';
import Cast from './Cast';
import Loading from './Loading';
var{width,height}=Dimensions.get('window')
const ios=Platform.OS=='ios'
const topMargin=ios?'':'mt-3'
let movieName='Ant-man and the Wasp:Quantumania'
import { theme } from './theme';
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500, movieDetailEndpoint } from '../api/moviedb';
export default function MovieScreen() {
    const {params:item}=useRoute();
    const navigation=useNavigation()
    const[isFavourite,togglefavourite]=useState(false)
    const[cast,setCaste]=useState([])
    const[similarmovies,setsimilarmovies]=useState([])
    const [loading,setloading]=useState(false)
    const[moviedetaails,setmoviedetails]=useState("")
    const[movie,setMovie]=useState({})
    
    useEffect(()=>{//console.log('item.id',item.id)
            setloading(true);
            getmovieDetails(item.id);
            getmovieCredtits(item.id);
            getSimilarMovies(item.id);
          },[item])

const getmovieDetails=async id=>{
  const data=await fetchMovieDetails(id);
 // console.log('got movie details:',data);
 if(data){
  setMovie({...movie, ...data});
 }
   setloading(false)
}
const getmovieCredtits=async id=>{
  const data=await fetchMovieCredits(id);
 // console.log('got movie credits',data)
  if (data && data.cast) setCaste(data.cast);
  
}
const getSimilarMovies=async id=>{
  const data=await fetchSimilarMovies(id);
  console.log('got similar movies',data)
  if (data && data.results ) setsimilarmovies(data.results);
  
}
  return (
  <ScrollView contentContainerStyle={{paddingBottom:20}} className="flex-1 bg-neutral-900 pl-3">
    <View className="w-full">
    <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-8"+topMargin }>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.background} className="rounded-xl p-1 ml-4">
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" style={styles.background}></ChevronLeftIcon>
        </TouchableOpacity>
        <TouchableOpacity className="pr-4" onPress={()=>togglefavourite(!isFavourite)}>
            <HeartIcon size="35" color={isFavourite? theme.background:"white"}/>
        </TouchableOpacity>
        </SafeAreaView>

        {
        loading?(<Loading/>):(
        <View>
          <Image source={{uri:image500(movie?.poster_path)}} style={{width,height:height*0.55}} className=""/>
          <LinearGradient colors={['transparent','rgba(23,23,23,0.8)','rgba(23,23,23,1)']} style={{width,height:height*0.40}} start={{x:0.5 ,y:0}} end={{x:0.5,y:1}} 
          className="absolute bottom-0"/>

        </View>)
        }
        
        </View>
        {/*movie details*/}
        <View style={{marginTop:-(height*0.09)}} className="space-y-3">
          <Text className="text-white text-center text-3xl font-bold traking-wider">
            {movie?.title}
          </Text>

          <Text className="text-neutral-400  font-semibold text-base text-center">
                {movie?.status}• {movie?.release_date?.split('-')[0]||'N/A'}•{movie?.runtime} min
                </Text>
          
          
        
          {/*genres*/}

          <View className="flex-row justify-center mx-4 space-x-2">
            {movie?.genres?.map((genre,index)=>{
              let showdot=index+1!=movie.genres.length;
              return(
                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                  {genre?.name} {showdot? "•":null}
                </Text>
              )
            })} 
        </View>
         {/*description*/}
         <Text className="text-neutral-400 mx-4 tracking-wide">{movie?.overview}</Text>
        </View>

        <Cast  navigation={navigation} cast={cast}/>
        <MovieList title="similar movies" hideSeeAll={true} data={similarmovies}/>
        </ScrollView>
  )
}