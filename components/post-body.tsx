import React from "react";
import { StructuredText, Image } from "react-datocms";
import VideoPlayer from "./VideoPlayer";

interface ExternalVideoDetails {
  url:  string;
  height: number;
  provider: string;
  providerUid: string;
  thumbnailUrl: string;
  title: string;
  width: number;
}

interface ExternalVideoProps {
  id: number;
  details : ExternalVideoDetails;
 }

interface InternalVideo{
  duration: number;
  streamingUrl: string;
  thumbnailUrl: string;
}

interface InternalVideoContent{
  title: string;
  video: InternalVideo;
 }

interface InternalVideoProps {
  id: string;
  autoplay: boolean;
  loop: boolean;
  thumbTimeSeconds: number;
  content: InternalVideoContent;
}

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto mb-10">
      <div className="prose prose-lg prose-blue">
        <StructuredText
          data={content}
          renderBlock={({ record }) => {
            if (record.__typename === "ImageBlockRecord") {
              let image = record.image as any;
              return (
                <figure>
                  <Image data={image.responsiveImage} />
                </figure>)
            }
            if (record.__typename === "ExternalVideoRecord") {
              let videoProps = record as unknown as ExternalVideoProps;
              return(
                <div className="mx-auto mb-10  aspect-w-16 aspect-h-9">
                  <figure className="mx-auto my-0 aspect-w-16 aspect-h-9">
                  {videoProps.details.provider === 'youtube' ? (
                    <iframe 
                      className="mx-auto" 
                      src={`//www.youtube.com/embed/${videoProps.details.providerUid}`} 
                      frameBorder="0" 
                      allowFullScreen />                   
                  ) : (
                    <iframe 
                      className="mx-auto" 
                      src={`//player.vimeo.com/video/${videoProps.details.providerUid}?title=0&byline=0&portrait=0`}
                      frameBorder="0" 
                      allowFullScreen />
                  )}
                  </figure>
                </div>  
              )
            }
            if (record.__typename === "VideoRecord") {
              let videoProps = record as unknown as InternalVideoProps;
              return (
                <div> 
                  <figure className="my-0">
                    <div className="mx-auto  aspect-w-16 aspect-h-9">
                      <VideoPlayer
                        controls
                        autoPlay={videoProps.autoplay}
                        loop={videoProps.loop}
                        src={videoProps.content.video.streamingUrl}
                        poster={`${videoProps.content.video.thumbnailUrl}?time=${
                          videoProps.thumbTimeSeconds !== null
                            ? videoProps.thumbTimeSeconds
                            : videoProps.content.video.duration / 2
                        }`}
                      />
                    </div>
                    {videoProps.content.title && <figcaption>{videoProps.content.title}</figcaption>}
                  </figure>
                </div>
              )
            }

            return (
              <>
                <p>Don't know how to render a block!</p>
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
