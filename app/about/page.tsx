import Link from "next/link";

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
          <a href="#" className="text-accent">
            YouTube <i className="fab fa-youtube ml-1" />
          </a>
        </li>
        <li>
          <a href="#" className="text-accent">
            SoundCloud <i className="fab fa-soundcloud ml-1" />
          </a>
        </li>
        <li>
          <a href="#" className="text-accent">
            BandCamp <i className="fab fa-bandcamp ml-1" />
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
