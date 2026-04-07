import ThemeSwitcher from "./ThemeSwitcher";

const Header = ({ theme, setTheme }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1>LRU Cache Visualizer</h1>
          <p>Learn Least Recently Used cache with animations</p>
        </div>
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
      </div>
    </header>
  );
};

export default Header;
