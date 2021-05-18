'use strict'
const axios = require('axios');
const apiKey = "";
const channelId = "UCUfO02gdMDXgOJWdv_jiLMg";

let playlistUrl = `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&key=${apiKey}&part=contentDetails`;



(async () => {
    try {
        const response = await axios.get(playlistUrl)
        console.log(response.data);
        console.log(response.data.items[0].contentDetails.relatedPlaylists.uploads);
        let uploadsId = response.data.items[0].contentDetails.relatedPlaylists.uploads
        let videoUrl = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${uploadsId}&key=${apiKey}&part=snippet&maxResults=50`;

        let playlistVideos = await axios.get(videoUrl);
        console.log(playlistVideos.data);
            let videos = [];
        for (const video of playlistVideos.data.items) {
            video.snippet.url = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
            video.snippet.kind = 'youtube'
            videos.push(video.snippet)
        }

        const fs = require('fs');
    
        let data = JSON.stringify(videos);
        fs.writeFileSync('algolia-youtube.json', data);

    } catch (error) {
      console.log(error);
    }

    


})();




