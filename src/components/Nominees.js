import React, { useEffect, useState } from 'react'

export default function Nominees({
    nominees,
    setNominees,
    fromlink,
    setFromLink
})
{
    const [link, setLink] = useState(null)

    useEffect(() => {
        setLink(null)
    }, [nominees])

    const handleUnNominate = (index) => {

        const newNoms = [...nominees]

        newNoms.splice(index, 1)

        console.log('new noms', newNoms, index)

        setFromLink(false)

        setNominees(newNoms)
    }

    const createShareableLink = () => {
        const base = window.location.href.split('?nominees')[0]

        var movieIDs = nominees.map((n) => n.imdbID).join('_')

        setLink(`${base}?nominees=${movieIDs}`)
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
                marginLeft: 35,
                alignItems: 'center'
            }}
        >
            <span
                style={{
                    fontSize: 18,
                    fontWeight: "bold",
                }}
            >
                Your Nominees
            </span>

            <div style={{ borderTop: '1px solid rgba(175, 175, 175, 0.5)', width: '85%', margin: '10px 0 10px 0' }} ></div>

                        
            {!fromlink && (
                <button
                    style={{
                        marginTop: 15,
                        marginBottom : !link ? 15 : 10,
                    }}
                    onClick={createShareableLink}
                >
                    Click Here To Share Your Nominations
                </button>
            )}

            {link && 
                <a
                    style={{
                        display: 'flex',
                        marginBottom : 15,
                        wordBreak: 'break-word',
                        textAlign: 'center'
                        //width: '100%'
                    }}
                    href={link}
                >
                    {link}
                </a>
            }

            {nominees.length === 0 ? (
                <span>No Nominees</span>
            ) : (
                nominees.map((n, index) => {
                    return(
                        <div
                            key={n.imdbID}
                            style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                marginTop: 15,
                                paddingBottom: 15,
                                borderBottom: index !== nominees.length - 1 ? "1px solid rgba(0, 0, 0, 0.25)" : null
                            }}
                        >
                            <img
                                src={n.Poster}
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
                                    {n.Title}
                                </span>
                                <span
                                    style={{
                                        fontSize: 14,
                                        color: 'rgba(0, 0, 0, 0.75)'
                                    }}
                                >
                                    {n.Year}
                                </span>
                            </div>

                            <button
                                onClick={() => handleUnNominate(index)}
                            >
                                Remove
                            </button>
                        </div>
                    )
                })
            )}
        </div>
    )
}