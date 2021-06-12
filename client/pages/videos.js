import YouTube from "react-youtube";

const Videos = ({ videos }) => {
  console.log(videos);

  return (
    <section className="videos">
      <h1>Les vidéos youtube</h1>
      <div>
        {videos.items.map((video) => {
          return <YouTube key={video.id.videoId} videoId={video.id.videoId} />;
        })}
      </div>
    </section>
  );
};

export const getStaticProps = async () => {
  const CHANNEL_ID = "UCzrtCQAmjlPvjm9x7hnluJw";

  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const YOTUBE_API_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&channelType=any&maxResults=10&order=date&type=video&videoCaption=videoCaptionUnspecified&videoDefinition=any&key=${YOUTUBE_API_KEY}`;

  const videos = await fetch(YOTUBE_API_URL)
    .then((res) => res.json())
    .catch();

  return {
    props: {
      videos,
    },
    revalidate: 60 * 15,
  };
};

export default Videos;
