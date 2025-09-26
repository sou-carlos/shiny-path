import "./styles.scss";

interface HeaderProps {
  isMenuMinimized?: boolean;
}

export function Header({ isMenuMinimized = false }: HeaderProps) {
  return (
    <header className={isMenuMinimized ? 'menu-minimized' : ''}>
      <h1>Shiny Path</h1>
    </header>
  );
}
