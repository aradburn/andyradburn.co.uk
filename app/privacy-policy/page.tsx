import "../base-styles.css";
export default function PrivacyPolicyPage() {
    return (
        <div
            className="mx-auto w-sm sm:w-xl md:w-3xl lg:w-5xl xl:w-7xl max-w-full min-h-[60vh] min-h-full px-8 py-8 sm:py-20 flex flex-col overflow-hidden bg-gradient-to-b from-black/20 to-black/66">
            <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
            <p>
                This website uses privacy-first, cookieless analytics via a
                self-hosted OpenPanel instance.
            </p>
            <p>
                It does not use advertising frameworks, and does not sell your data.
            </p>
        </div>
    );
}
