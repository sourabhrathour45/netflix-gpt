const VideoTitle = ({title,overview})=>{


    return(
        <>
        <div className="pt-[18%] pl-12 w-screen aspect-video absolute text-white bg-gradient-to-r from-black">
            <h1 className="text-6xl font-bold">{title}</h1>
            <p className="w-[40%] mt-4">{overview}</p>
            <button className="bg-white text-black px-9 py-2 text-2xl rounded-lg mt-8">▶️ Play</button>
            <button className="bg-[#6D6D6EB3] px-9 py-2 text-2xl rounded-lg ml-4">More Info</button>
        </div> 
        </>
    )
}


export default VideoTitle;