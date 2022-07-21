export const SiteTitle = ({ children }) => (
  <div className="flex gap-2 text-center text-white my-5 mx-auto w-max">
    <div>
      <p className="text-sm lg:text-xl">WHATS HAPPENING DESTINY</p>
      <hr className="w-0 my-1 mx-auto animate-animateHr" />
    </div>
    {children}
  </div>
);
