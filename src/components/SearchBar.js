import React, { useState } from 'react'

import { FaSearch } from 'react-icons/fa';


export default function SearchBar({
    query,
    setQuery,
    handleSearchMovies,
})
{

    return(
        <div
            style={{
                display: 'flex',
                padding: 30,
                border: '1px solid rgba(200, 200, 200, 1)',
                borderRadius: 5,
                backgroundColor: 'rgba(250, 250, 250, 1)',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    textAlign: 'center'
                }}
            >
                Search Movies By Title
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 5,
                    position: 'relative',
                }}
            >
                <button
                    style={{
                        display: 'flex',
                        borderRadius: 50,
                        alignItems: 'center',
                        position: 'absolute',
                        left: 5,
                        border: 'none',
                        padding: 5,
                        cursor: 'pointer',
                    }}
                    onClick={handleSearchMovies}
                >
                    <FaSearch/>
                </button>
                
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={(e) => {
                        if(e.keyCode === 13)
                        {
                            handleSearchMovies()
                        }
                    }}
                    style={{
                        minWidth: 350,
                        padding: '5px 5px 5px 40px',
                    }}
                />
            </div>
        </div>
    )
}