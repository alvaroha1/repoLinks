import { GrMailOption, GrGithub } from "react-icons/gr";

export default function Footer() {
  const author = "Alvaro Hernandez Assens";
  const email = "alvarohernandezassens@gmail.com";
  const github_link = "https://github.com/alvaroha1/repoLinks";
  const year = "© 2022";
  return (
    <div className="flex">
      <ul className="flex items-center">
        <li className="p-4">
          <h6>{author}</h6>
        </li>
        <li className="p-4">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`mailto:${email}`}
            title="Opens in a new window"
          >
            <GrMailOption />
          </a>
        </li>
        <li className="p-4">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`${github_link}`}
            title="Opens in a new window"
          >
            <GrGithub />
          </a>
        </li>

        <li className="p-4">
            {year} (
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://creativecommons.org/licenses/by-sa/3.0/"
              title="Opens in a new window"
            >
              cc-by-sa
            </a>
            )
        </li>
      </ul>
    </div>
  );
}