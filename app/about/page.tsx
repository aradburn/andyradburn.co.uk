import Link from "next/link";
import { SocialIcon } from "react-social-icons";

export default function AboutPage() {
  return (
    <div className="max-w-full">
      <h1 className="mb-6 text-3xl font-bold">About</h1>
      <p className="mb-4">
        Andy Radburn is a synthesizer player and composer living in Portsmouth,
        UK.
      </p>
      <hr className="my-6 border-text/30" />
      <p className="mb-4">Listen to Andy Radburn&apos;s music here:</p>
      <ul className="mb-6 list-disc pl-10">
        <li>
          <a href="#" className="inline-flex items-center gap-2 text-accent">
            YouTube
            <SocialIcon
              url="https://youtube.com"
              network="youtube"
              as="span"
              className="!h-10 !w-10 [&>svg]:!h-10 [&>svg]:!w-10"
              bgColor="transparent"
              fgColor="currentColor"
            />
          </a>
        </li>
        <li>
          <a href="#" className="inline-flex items-center gap-2 text-accent">
            SoundCloud
            <SocialIcon
              url="https://soundcloud.com"
              network="soundcloud"
              as="span"
              className="!h-10 !w-10 [&>svg]:!h-10 [&>svg]:!w-10"
              bgColor="transparent"
              fgColor="currentColor"
            />
          </a>
        </li>
        <li>
          <a href="#" className="inline-flex items-center gap-2 text-accent">
            BandCamp
            <SocialIcon
              url="https://bandcamp.com"
              as="span"
              className="!h-10 !w-10 [&>svg]:!h-10 [&>svg]:!w-10"
              bgColor="transparent"
              fgColor="currentColor"
            />
          </a>
        </li>
      </ul>
      <hr className="my-6 border-text/30" />
      <p>
        <Link href="/privacy-policy/" className="text-accent">
          Privacy Policy
        </Link>
        {" / "}
        <Link href="/cookies/" className="text-accent">
          Cookies
        </Link>
      </p>
    </div>
  );
}
