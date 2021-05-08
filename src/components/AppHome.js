import React, { useState, useEffect } from 'react'
import axios from 'axios'


import SearchBar from './SearchBar'
import MovieResults from './MovieResults'
import Nominees from './Nominees'

import { 
    FaTimes,
} from 'react-icons/fa';

export default function AppHome()
{

    const [query, setQuery] = useState("")
    const [loadingresults, setLoadingResults] = useState(false)
    const [results, setResults] = useState([])

    const [nominees, setNominees] = useState([])

    const [currentpage, setCurrentPage] = useState(1)
    const [pagestoshow, setPagesToShow] = useState([1])

    const [showbanner, setShowBanner] = useState(false)

    const [fromlink, setFromLink] = useState(false)

    useEffect(async () => {

        try {
            const search = window.location.search;
            const params = new URLSearchParams(search);
            const sharedNomineeIDS = params.get('nominees').split('_')

            sharedNomineeIDS.map(async (sharedNomID) => {
                const url = `http://www.omdbapi.com/?i=${sharedNomID}&type=movie&apikey=97d1cff9`

                await axios.get(url)
                .then((res) => {
                    setNominees((oldNoms) => [...oldNoms, res.data])
                })
            })
            setFromLink(true)
        }
        catch {
            try{    
                setNominees(JSON.parse(localStorage.getItem("nominees")))
            }
            catch{
                setNominees([])
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("nominees", JSON.stringify(nominees))

        if(nominees.length === 5)
        {
            setShowBanner(true)
        } else setShowBanner(false)
    }, [nominees])

    const searchMovies = async (pageNo) => {
        const url = `http://www.omdbapi.com/?s=${query}&page=${pageNo}&type=movie&apikey=97d1cff9`

        await axios.get(url)
        .then(async (res) => {
            console.log(res.data)
            setResults(res.data.Search)
            
            setCurrentPage(pageNo)
            calculateNewPages(pageNo, Math.ceil(res.data.totalResults / 10))
        })
    }

    const calculateNewPages = async (newPage, maxPages) => {    
        var newPagesToShow = []

        if(maxPages > 5)
        {
            if(newPage === 1)
            {
                newPagesToShow = [1, 2, 3, 4, maxPages]
            }
            else if(newPage === maxPages)
            {
                newPagesToShow = [1, maxPages - 3, maxPages - 2, maxPages - 1, maxPages]
            }
            else 
            {
                newPagesToShow.push(newPage - 1, newPage, newPage + 1)

                if(newPagesToShow[0] === 1)
                {
                    newPagesToShow.push(newPage + 2, maxPages)
                }
                else if(newPagesToShow[2] == maxPages)
                {
                    newPagesToShow.unshift(1, newPage - 2)
                }
                else
                {
                    newPagesToShow.unshift(1)
                    newPagesToShow.push(maxPages)
                }
            }
        }
        else 
        {
            for(let i = 0; i < maxPages; i++)
            {
                newPagesToShow.push(i + 1)
            }
        }
        setPagesToShow(newPagesToShow)
    }

    const handleSearchMovies = () => {
        searchMovies(1)
    }

    return(
        <div
            style={{
                minHeight: '100vh',
                minWidth: '100vh',
                backgroundColor: 'rgba(240, 240, 240, 1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                { showbanner && !fromlink && (
                    <div
                        style={{
                            width: '100vmax',
                            textAlign: 'center',
                            fontSize: 32,
                            maxHeight: 350,
                            backgroundColor: 'rgba(150, 255, 150, 0.75)',
                            padding: '50px 0px' 
                        }}
                    >
                        <button 
                            style={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                                border: 'none',
                            }}
                            onClick={() => setShowBanner(false)}
                        >
                            <FaTimes size={25} />
                        </button>

                        You have nominated your 5 movies for the shoppies!
                    </div>
                )}

                <span
                    style={{
                        marginBottom: 30,
                        fontSize: 30,
                        marginTop: 50,
                    }}
                >
                    The Shoppies
                </span>

                <SearchBar
                    query={query}
                    setQuery={setQuery}
                    handleSearchMovies={handleSearchMovies}
                />

                <div
                    style={{
                        display: 'flex',
                        marginTop: 30,
                        marginBottom: 50,
                    }}
                >
                    <MovieResults
                        query={query}
                        loadingresults={loadingresults}
                        results={results}
                        searchMovies={searchMovies}
                        nominees={nominees}
                        setNominees={setNominees}
                        currentpage={currentpage}
                        pagestoshow={pagestoshow}
                        setFromLink={setFromLink}
                    />

                    <Nominees
                        nominees={nominees}
                        setNominees={setNominees}
                        fromlink={fromlink}
                    />
                </div>
            </div>
        </div>
    )
}