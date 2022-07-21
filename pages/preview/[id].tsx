import React, {useEffect} from 'react'
import Head from "next/head";
import { useRouter } from "next/router";
import Link from 'next/link'

function Preview() {
  const { id } = useRouter().query;
  console.log(id)
  useEffect(() => {
    if (id) {
      const metadata = localStorage.getItem(id);
      console.log(metadata, "metadata from page")
    }

  }, [])
  

  return (
    <div>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@YOUR_TWITTER_USERNAME" />
        <meta name="twitter:title" content="TITLE_FOR_YOUR_PAGE" />
        <meta name="twitter:description" content="DESCRIPTION_FOR_YOUR_PAGE" />
        <meta name="twitter:image" content="URL_FOR_YOUR_IMAGE" />
      </Head>
      
      Preview
      <Link href={`/`}>
            <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go Back</button>
            </Link>  
    </div>
  )
}

export default Preview