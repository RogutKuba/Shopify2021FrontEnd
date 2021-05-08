import React, { useState, useEffect } from 'react'

export default function MovieResults({
    query,
    loadingresults,
    results=[],
    searchMovies,
    nominees,
    setNominees,
    currentpage,
    pagestoshow,
    setFromLink,
})
{
    const handleNominate = (newNominee) => {
        if(nominees.length < 5)
        {
            setNominees((oldNoms) => [...oldNoms, newNominee])
            setFromLink(false)
        } else window.alert("You have reached the maximum number of nominations")
    }

    return(
        <div
            style={{
                display: 'flex',
                padding: 30,
                border: '1px solid rgba(200, 200, 200, 1)',
                borderRadius: 5,
                backgroundColor: 'rgba(250, 250, 250, 1)',
                flexDirection: 'column',
                minWidth: 525,
                justifyContent: query == '' ? 'center' : null,
            }}
        >
            { query == '' && results.length === 0 ? (
                    <span
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        Please Search For Movies To Nominate
                    </span>
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <span
                            style={{
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            Results for "{query}"
                        </span>

                        <div style={{ borderTop: '1px solid rgba(175, 175, 175, 0.5)', width: '85%', margin: '10px 0 10px 0' }} ></div>

                        {results.map((r, index) => {
                            return(
                                <div
                                    key={`${r.imdbID}${index}`}
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        marginTop: 15,
                                        paddingBottom: 15,
                                        borderBottom: index !== results.length - 1 ? "1px solid rgba(0, 0, 0, 0.25)" : null
                                    }}
                                >
                                    <img
                                        src={r.Poster}
                                        height={90}
                                        width={60}
                                        style={{
                                            borderRadius: 3,
                                            border: '1px solid rgba(0, 0, 0, 0.15)', //rgba(175, 175, 175, 0.5)
                                        }}
                                    >    
                                    </img>

                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            width: 400,
                                            textAlign: 'center',
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: 'flex',
                                                wordBreak: 'break-word',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {r.Title}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: 14,
                                                color: 'rgba(0, 0, 0, 0.75)'
                                            }}
                                        >
                                            {r.Year}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handleNominate(r)}
                                        disabled={nominees.findIndex((n) => n.imdbID === r.imdbID) !== -1}
                                    >
                                        { nominees.findIndex((n) => n.imdbID === r.imdbID) === -1 ? "Nominate" : "Nominated" }
                                    </button>
                                </div>
                            )
                        })}
                        { pagestoshow.length > 1 &&
                            <div
                                style={{
                                    display: 'flex',
                                    marginTop: 35,
                                    //borderTop: '1px solid rgba(0, 0, 0, 0.15)'
                                }}
                            >
                                {pagestoshow.map((page, index) => {
                                    return(
                                        <button
                                            key={`Page${page}${index}`}
                                            onClick={() => searchMovies(page)}
                                            style={{
                                                width: 50,
                                                borderRadius: 5,
                                                border: '1px solid #437FC7',
                                                backgroundColor: currentpage === page ? '#b3d5ff' : '#6DAFFE',
                                                padding: 5,
                                                marginLeft: index === 0 ? null : 15,
                                            }}
                                        >
                                            {page}
                                        </button>
                                    )
                                }) }
                            </div>
                        }
                    </div>
                )
            }
        </div>
    )
}