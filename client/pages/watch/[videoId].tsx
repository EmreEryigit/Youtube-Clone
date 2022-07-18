import { useRouter } from "next/router";


function WatchVideoPage () {
    const {query} = useRouter()

    return (
        <video src={`/api/videos/${query.videoId}`} width="800px"  height="auto" controls autoPlay id="video-player"/>
    )
}
export default WatchVideoPage