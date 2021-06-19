'use strict'
const axios = require('axios');
const { Command, option } = require('commander');
const program = new Command();
program.version('0.0.1');

program
  .option('-c, --channel <ID>', 'YouTube channel to rip')
  .option('-u, --username <USERNAME>', `Youtube username to rip`)

program.parse(process.argv);
const options = program.opts();

const apiKey = "";

let playlistUrl = null;

if(options.channel){
    console.log(`Fetching via channel id ${options.channel}`);
    playlistUrl = `https://www.googleapis.com/youtube/v3/channels?id=${options.channel}&key=${apiKey}&part=contentDetails`;
}else if(options.username){
    console.log(`Fetching via username ${options.username}`);
    playlistUrl = `https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&q=${options.username}&type=channel&key=${apiKey}`
}

(async () => {
    try {

        if(options.username){
            const response = await axios.get(playlistUrl)
            // console.log(response.data);
            let channelID = response.data.items[0].id.channelId;
            playlistUrl = `https://www.googleapis.com/youtube/v3/channels?id=${channelID}&key=${apiKey}&part=contentDetails`;
        }

        const response = await axios.get(playlistUrl)
        // console.log(response.data.items[0].contentDetails.relatedPlaylists.uploads);
        let uploadsId = response.data.items[0].contentDetails.relatedPlaylists.uploads
        let videoUrl = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${uploadsId}&key=${apiKey}&part=snippet&maxResults=50`;
        
        
        let playlistVideos = await axios.get(videoUrl);
            // console.log(playlistVideos.data.items[0].snippet.channelTitle);
            let videoOwnerChannelTitle = playlistVideos.data.items[0].snippet.channelTitle;
            let videos = [];
        for (const video of playlistVideos.data.items) {
            video.snippet.url = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
            video.snippet.kind = 'youtube'
            videos.push(video.snippet)
        }

        console.log(`Fetch done, ${playlistVideos.data.items.length} videos found`);

        const fs = require('fs');
    
        let data = JSON.stringify(videos);
        fs.writeFileSync(`data/algolia-youtube-${videoOwnerChannelTitle}.json`, data);
        console.log(`File written to data/algolia-youtube-${videoOwnerChannelTitle}.json`);

    } catch (error) {
      console.log(error);
    }

    


})();




