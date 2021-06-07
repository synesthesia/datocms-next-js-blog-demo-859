import { StructuredText, Image } from "react-datocms";
import { useSession } from 'next-auth/client'
import { ISession } from "../lib/session";

export default function ProtectedBody({ content, allowedGroups }) {
  
  let allowedGroupNames:string[] = allowedGroups.map((x: { name: string; }) => x.name);
  console.log(allowedGroupNames)

  const [ session, loading ] = useSession()

  let showProtected =  false;
  
  if(session){
    console.log(session)
    let  mySession = (session as unknown ) as ISession;
    showProtected = mySession.groups.some(item => allowedGroupNames.includes(item))
  }

  if(!showProtected){
    return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-lg prose-blue">
        <p><em>If you were a member and logged in, you'd see some more stuff here!</em></p>
      </div>
    </div>
    )
  }
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