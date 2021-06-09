import { StructuredText, Image } from "react-datocms";
import { number, string } from "yup";

interface EmbeddedVideoDetails {
  url:  string;
  height: number;
  provider: string;
  providerUid: string;
  thumbnailUrl: string;
  title: string;
  width: number;
}

interface EmbeddedVideoProps {
  id: number;
  details : EmbeddedVideoDetails;
 }

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-lg prose-blue">
        <StructuredText
          data={content}
          renderBlock={({ record }) => {
            if (record.__typename === "ImageBlockRecord") {
              let image = record.image as any;
              return <Image data={image.responsiveImage} />;
            }
            if (record.__typename === "YoutubeEmbedRecord") {
              let videoProps = record as unknown as EmbeddedVideoProps;
              let  src = `//www.youtube-nocookie.com/embed/#${videoProps.details.providerUid}?rel=0`;
              return (<iframe src={src} frameBorder="0" allowFullScreen></iframe>)
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
