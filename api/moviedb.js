import axios from 'axios'
import { apiKey } from '../constants'

//endpoints

const apiBaseUrl=`https://api.themoviedb.org/3`
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint=`${apiBaseUrl}/search/movie?api_key=${apiKey}`

//dynamic endpoint
export const movieDetailEndpoint=id=>`${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
export const movieCreditsEndpoint=id=>`${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
export const SimilarMovieEndpoint=id=>`${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`
export const image500=path=> path?`https://image.tmdb.org/t/p/w500/${path}` :null;
export const image342=path=> path?`https://image.tmdb.org/t/p/w342/${path}` :null;
export const image185=path=> path?`https://image.tmdb.org/t/p/w185/${path}` :null;
export const personDetailsEndpoint=id=>`${apiBaseUrl}/person/${id}?api_key=${apiKey}`
export const personMoviesEndpoint=id=>`${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`


const apiCall=async(endpoint,params)=>{
    const options={
        method:'GET',
        url:endpoint,
        params:params?params:{}
    }
    
    try{
        const response=await axios.request(options);
        return response.data;
    }catch(error){
            console.group('error:',error)
            return {}
    }
}
export const fetchTrendingMovies=()=>{
    return apiCall(trendingMoviesEndpoint);
}

export const fetchTopRatedMovies=()=>{
    return apiCall(topRatedMoviesEndpoint);
}
export const fetchUpcomingMovies=()=>{
    return apiCall(upcomingMoviesEndpoint);
}

export const fetchMovieDetails=(id)=>{
    return apiCall(movieDetailEndpoint(id));
}
export const fetchMovieCredits=id=>{
    return apiCall(movieCreditsEndpoint(id));
}
export const fetchSimilarMovies=id=>{
    return apiCall(SimilarMovieEndpoint(id));
}
export const fetchPersonDetails=id=>{
    return apiCall(personDetailsEndpoint(id));
}
export const fetchPersonMovies=id=>{
    return apiCall(personMoviesEndpoint(id));
}
export const searchMovies=params=>{
    return apiCall(searchMoviesEndpoint,params);
}