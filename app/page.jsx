import Feed from "@components/Feed"

const page = () => {
    return (
        <section className="w-full flex flex-col items-center">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center">AI Powered Prompts</span>
            </h1>
            <p className="desc text-center">
                Promptopia is an open source Ai prompting tool for modern world to descover, create and share creative prompts
            </p>

            {/* Feed */}
            <Feed />
        </section>
    )
}

export default page