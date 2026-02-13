import "../base-styles.css";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";

export default function AboutPage() {
  return (
    <div className="mx-auto w-sm sm:w-xl md:w-3xl lg:w-5xl xl:w-7xl max-w-full min-h-[60vh] min-h-full py-8 sm:py-20 flex flex-col items-center justify-center justify-self-center overflow-hidden bg-gradient-to-b from-black/20 to-black/66">
      <h1 className="mb-6 text-3xl font-bold">About</h1>
      <p className="mb-4">
        Andy Radburn is a synthesizer player and composer living in Portsmouth,
        UK.
      </p>
      <hr className="my-6 border-text/30" />
      <p className="mb-4">Listen to Andy Radburn&apos;s music here:</p>
      <ul className="mb-6 list-disc pl-10">
        <li>
          <a href="https://www.youtube.com/@aradburn" className="inline-flex items-center gap-2 text-accent">
            Andy Radburn on YouTube
            <SocialIcon
              url="https://www.youtube.com/@aradburn"
              network="youtube"
              as="span"
              className="!h-10 !w-10 [&>svg]:!h-10 [&>svg]:!w-10"
              bgColor="transparent"
              fgColor="currentColor"
            />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/@Dubbal" className="inline-flex items-center gap-2 text-accent">
            Dubbal on YouTube
            <SocialIcon
              url="https://www.youtube.com/@Dubbal"
              network="youtube"
              as="span"
              className="!h-10 !w-10 [&>svg]:!h-10 [&>svg]:!w-10"
              bgColor="transparent"
              fgColor="currentColor"
            />
          </a>
        </li>
        {/*}
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
        */}
        <li>
          <a href="https://sonicarcana.bandcamp.com/" className="inline-flex items-center gap-2 text-accent">
            Sonic Arcana on BandCamp
            <SocialIcon
              url="https://sonicarcana.bandcamp.com/"
              as="span"
              className="!h-10 !w-10 [&>svg]:!h-10 [&>svg]:!w-10"
              bgColor="transparent"
              fgColor="currentColor"
            />
          </a>
        </li>
        <li>
          <a href="https://kevellis.bandcamp.com" className="inline-flex items-center gap-2 text-accent">
            Dubbal on BandCamp
            <SocialIcon
              url="https://kevellis.bandcamp.com"
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
