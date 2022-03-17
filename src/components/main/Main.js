const titles = ["DAILY", "WEEKLY", "DUNGEONS", "RAIDS", "SEASON"];

const TitleText = ({ children }) => (
  <h1 className="text-6xl xl:text-9xl text-white">{children}</h1>
);

export const Main = () => (
  <div className="p-5">
    {titles.map((title) => (
      <TitleText key={title}>{title}</TitleText>
    ))}
  </div>
);
