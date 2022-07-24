import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { Repository } from "../../types/Github";
import Table from "../../components/table";

interface Metadata {
  color: string;
  repoData: Repository;
}

function Preview() {
  const id = useRouter().query.id;
  const [metadata, setMetadata] = useState<Metadata>();
  useEffect(() => {
    if (typeof id === "string") {
      const data = localStorage.getItem(id);
      console.log(data);
      if (typeof data === "string") {
        setMetadata(JSON.parse(data));
      }
    }
    console.log(metadata);
  }, []);

  return (
    <div>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:site"
          content={`${metadata?.repoData.owner.login}`}
        />
        <meta name="twitter:title" content={`${metadata?.repoData.name}`} />
        <meta
          name="twitter:description"
          content={`${metadata?.repoData.description}`}
        />
        <meta name="twitter:image" content="URL_FOR_YOUR_IMAGE" />
      </Head>
      {/* style={{backgroundColor:`${metadata?.color}`, opacity: "0.2"}} */}
      <main className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 m-2 w-3/5">
            <div
              className="relative block p-8 overflow-hidden border border-gray-100 rounded-lg"
            >
              <span className="absolute inset-x-0 bottom-0 h-2" style={{backgroundColor:`${metadata?.color}`}}></span>

              <div className="justify-between sm:flex">
                <div>
                  <h5 className="text-xl font-bold text-gray-900">
                  {metadata?.repoData.name}
                  </h5>
                  <p className="mt-1 text-xs font-medium text-gray-600">
                    By {metadata?.repoData.owner.login}
                  </p>
                </div>

                <div className="flex-shrink-0 hidden ml-3 sm:block">
                  <img
                    className="object-cover w-16 h-16 rounded-lg shadow-sm"
                    src={`${metadata?.repoData.owner.avatar_url}`}
                    alt={`${metadata?.repoData.owner.login}`}
                  />
                </div>
              </div>

              <div className="mt-4 sm:pr-8">
                <p className="text-sm text-gray-500">
                {metadata?.repoData.description}
                </p>
              </div>

              <dl className="flex mt-6">
                <div className="flex flex-col-reverse p-4">
                  <dt className="text-sm font-medium text-gray-600">
                    Created
                  </dt>
                  <dd className="text-xs text-gray-500">{metadata?.repoData.created_at.slice(0,10)}</dd>
                </div>

                <div className="flex flex-col-reverse p-4">
                  <dt className="text-sm font-medium text-gray-600">
                    Updated
                  </dt>
                  <dd className="text-xs text-gray-500">{metadata?.repoData.updated_at.slice(0,10)}</dd>
              </div>
              
              <div className="flex flex-col-reverse p-4">
                  <dt className="text-sm font-medium text-gray-600">
                    Stars
                  </dt>
                  <dd className="text-xs text-gray-500">{metadata?.repoData.stargazers_count}</dd>
                </div>
              </dl>
            </div>
        </div>

        <div className="flex justify-center bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 m-2 w-3/5">
          <Link href={`/`}>
            <button className="w-3/5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Go Back
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Preview;
