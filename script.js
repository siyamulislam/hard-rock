
function btnSearch() {
    const key = document.getElementById("keyInput").value
    getMusic(key)
}

function getMusic(searchKey) {
    fetch("https://api.lyrics.ovh/suggest/" + searchKey)
        .then(res => res.json())
        .then(result => {
            lyrics = result.data
            lyrics = lyrics.slice(0, 10)
            closeLyric()
            document.getElementById("searchResult") .innerHTML=""
            for (let i = 0; i < lyrics.length; i++) {
                const lyric = lyrics[i];
                const titleName = lyric.title + " _ " + lyric.album.title
                document.getElementById("searchResult")
                    .innerHTML +=
                    `<div class="single-result row align-items-center my-2 p-2">
                            <div class="col-md-9">
                                <h4 class="lyrics-name">${titleName}</h4>
                                <p class="author lead">Album by <span>${lyric.artist.name}</span></p>
                                <audio class="audioPlay" controls><source src="${lyric.preview}" type="audio/mpeg"></audio>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button onclick="getLyric('${lyric.artist.name}','${lyric.title}','${titleName}')" class="btn btn-success">Get Lyrics</button>
                            </div>
                        </div>`
            }
        })
}
const getLyric = async (artist, title, songName) => { 
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        if (res.status == 404) { displayError('404 No lyrics found!'); return }
        const data = await res.json();
        displayLyrics(songName, data.lyrics);
    }
    catch (error) {
        displayError('Sorry! I failed to load lyrics, Please try again later!!!')
    }
}
const displayLyrics = (songName, lyrics) => {
    document.getElementById('error-message').innerText = ""
    document.getElementById('song-title').innerText = songName
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    closeLyric()
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}
function closeLyric() {
    document.getElementById('error-message').innerText = ""
    document.getElementById('song-lyrics').innerText = ""
    document.getElementById('song-title').innerText = ""
}