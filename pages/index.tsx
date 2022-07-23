import type { NextPage } from "next";
import Link from "next/link";
import { useState, useId, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { ChromePicker } from "react-color";
import Footer from "../components/footer";

const Home: NextPage = () => {
  const [user, setUser] = useState<string>("user");
  const [repo, setRepo] = useState<string>("repository");
  const [color, setColor] = useState<string>("#000000");
  const repoId = useId();
  const defaultURL = "https://api.github.com/repos/"
  const [repoData, setRepoData] = useState<any>([])

  const saveItem = () => {
    const item = {
      color,
    };
    localStorage.setItem(repoId, JSON.stringify(item));
  };

  const fetchData = async (url: string) => {
    try {
      const data = await fetch(url);
      const json = await data.json();
      console.log(json)
    } catch (error) {
      console.error(error);
    }
  };

  const handleButton = () => {
    fetchData(defaultURL + user + "/" + repo);
  }

  console.log(color, repoId);
  return (
    <div>
      <Head>
        <title>Repository Link Generator</title>
        <meta name="description" content="Repository Link Generator" />
      </Head>
      <header className="flex flex-col bg-gray-100">
      <h1 className="text-3xl p-8">Repository Link Generator</h1>

      </header>
      <main className="flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 m-2 w-3/5">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="user"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Introduce the name of the user 
              </label>
              <input
                type="text"
                name="user"
                id="user"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="user"
                required
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div>
            <label
                htmlFor="repo"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Introduce the name of the repository
              </label>
              <input
                type="text"
                name="repo"
                id="repo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="repository"
                required
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
              />
            </div>
            <div>
            <label
                htmlFor="url"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Current URL
              </label>
              <input
                type="url"
                name="url"
                id="url"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="URL"
                value={defaultURL + user + "/" + repo}
                disabled={true}
              />
            </div>
            <div className="flex justify-center">
            <button
              type="submit"
              onClick={()=> handleButton()}
              className="w-3/5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Fetch data from the repository
              </button>
              </div>
          </div>
        </div>
        <div className=" bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 m-2 w-3/5">
        <label
                htmlFor="color-picker"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Pick a color
          </label>
          <div className="flex justify-center">
          <ChromePicker
            color={color}
            onChange={(col) => setColor(col.hex)}
            disableAlpha={true}
            />
            </div>
        </div>
        <div className="flex justify-center bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 m-2 w-3/5">
  
          <Link href={`preview/${repoId}`}>
            <button onClick={saveItem} className="w-3/5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Go to preview URL
            </button>
          </Link>
        </div>
      </main>

      <footer className="flex flex-row justify-center bg-gray-100">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
