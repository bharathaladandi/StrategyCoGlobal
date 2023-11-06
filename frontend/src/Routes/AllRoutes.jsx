import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MovieList } from '../Components/MovieList'
import { MovieDetails } from '../Components/MovieDetails'

export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<MovieList />}></Route>
            <Route path='/movies/:imdbID' element={<MovieDetails />}></Route>
        </Routes>
    </div>
  )
}
