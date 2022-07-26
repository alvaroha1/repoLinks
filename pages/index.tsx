import type { NextPage } from "next";
import Link from "next/link";
import { useState, useId } from "react";
import Head from "next/head";
import { ChromePicker } from "react-color";
import Footer from "../components/footer";
import Label from "../components/label";
import { Repository } from "../types/Github";
import dynamic from "next/dynamic";
import { IEmojiData } from "../types/Emoji";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const Home: NextPage = () => {
  const [user, setUser] = useState<string>("user");
  const [repo, setRepo] = useState<string>("repository");
  const [color, setColor] = useState<string>("#000000");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [repoData, setRepoData] = useState<Repository>();
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>();
  const repoId = useId();
  const defaultURL = "https://api.github.com/repos/";

  const onEmojiClick = (event: React.MouseEvent, emojiObject: IEmojiData) => {
    setChosenEmoji(emojiObject);
  };

  const saveItem = () => {
    const item = {
      color,
      repoData,
      url: defaultURL + user + "/" + repo,
      chosenEmoji
    };
    localStorage.setItem(repoId, JSON.stringify(item));
  };

  const fetchData = async (url: string) => {
    try {
      const data = await fetch(url);
      if (data.status === 200) {
        const json = await data.json();
        setRepoData(json);
        setDisabled(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleButton = () => {
    fetchData(defaultURL + user + "/" + repo);
  };

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
              <Label text="Introduce the name of the user" htmlFor="user" />
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
              <Label
                text="Introduce the name of the repository"
                htmlFor="repo"
              />
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
              <Label text="Current URL" htmlFor="url" />
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
                onClick={() => handleButton()}
                className="w-3/5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Fetch data from the repository
              </button>
            </div>
          </div>
        </div>
        <div className=" bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 m-2 w-3/5">
          <Label text="Pick a color" htmlFor="color-picker" />
          <div className="flex justify-center">
            <ChromePicker
              color={color}
              onChange={(col) => setColor(col.hex)}
              disableAlpha={true}
            />
          </div>
        </div>
        <div className=" bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 m-2 w-3/5">
          <Label text="Pick a emoji" htmlFor="emoji-picker" />
          <div className="flex justify-center flex-col items-center">
            {chosenEmoji ? (
              <span>Emoji Selected: {chosenEmoji.emoji}</span>
            ) : (
              <span>No emoji Selected</span>
            )}
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        </div>
        <div className="flex justify-center bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 m-2 w-3/5">
          <Link href={`preview/${repoId}`}>
            <button
              onClick={saveItem}
              disabled={disabled}
              className="w-3/5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-25"
            >
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
