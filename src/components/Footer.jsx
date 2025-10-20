const Footer = () => {
  return (
    <main>
        <div className="mt-32 py-4 px-25 flex md:flex-row flex-col gap-6 md:gap-0 justify-between shadow-inner items-center">
            <h1 className="text-2xl font-semibold">
                <img src="/src/assets/images/logo.png" className="h-[40px]"/>
            </h1>
            <div className="flex items-center gap-3">
                <a href="https://github.com/rohmanalka" target="_blank">
                    <i className="ri-github-fill ri-2x cursor-target"></i>
                    @2025 MyInternet
                </a>
            </div>
        </div>
    </main>
  )
}

export default Footer