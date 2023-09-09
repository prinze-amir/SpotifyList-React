import React from 'react'

function Footer(props) {
    const {showList, newList} = props

    const focusSearch = () => {
        const searchField = document.getElementById('searchInput')
        searchField.focus()
        searchField.click()

        console.log("focus man" + searchField.value)
    }
  return (
    <div className='footer'>
        <ul className='nav'>
            <li><a onClick={showList} href="#myPlaylists">Show Playlist</a></li>
            <li><a onClick={newList} href="#newList">+ New Playlist</a></li>
            <li><a onClick={focusSearch} href="#!serch">Search</a></li>
        </ul>
    </div>
  )
}

export default Footer